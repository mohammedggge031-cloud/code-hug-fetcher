import { createContext, useContext, useEffect, useState, useRef, useCallback, ReactNode } from "react";
import type { User, Session } from "@supabase/supabase-js";
import { SUPABASE_TIMEOUT_MS, safeDataRequest, withPromiseTimeout } from "@/lib/safeRuntimeData";

type AppRole = "owner" | "admin" | "editor" | "seo_manager" | "social_manager" | "marketing_manager";

export type PermissionKey =
  | "can_manage_seo"
  | "can_manage_blog"
  | "can_manage_media"
  | "can_manage_scripts"
  | "can_manage_videos"
  | "can_manage_users";

export interface Permissions {
  can_manage_seo: boolean;
  can_manage_blog: boolean;
  can_manage_media: boolean;
  can_manage_scripts: boolean;
  can_manage_videos: boolean;
  can_manage_users: boolean;
  is_disabled: boolean;
}

const DEFAULT_PERMS: Permissions = {
  can_manage_seo: false,
  can_manage_blog: false,
  can_manage_media: false,
  can_manage_scripts: false,
  can_manage_videos: false,
  can_manage_users: false,
  is_disabled: false,
};

interface AuthContextType {
  user: User | null;
  session: Session | null;
  loading: boolean;
  role: AppRole | null;
  isOwner: boolean;
  isAdmin: boolean;
  isEditor: boolean;
  permissions: Permissions;
  can: (perm: PermissionKey) => boolean;
  signIn: (email: string, password: string) => Promise<{ error: Error | null }>;
  signOut: () => Promise<void>;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

let supabasePromise: Promise<typeof import("@/integrations/supabase/client")> | null = null;
const getSupabase = () => {
  if (!supabasePromise) supabasePromise = import("@/integrations/supabase/client");
  return supabasePromise;
};

const INACTIVITY_TIMEOUT_MS = 60 * 60 * 1000;
const AUTH_TIMEOUT_MS = SUPABASE_TIMEOUT_MS;

export const AuthProvider = ({ children }: { children: ReactNode }) => {
  const [user, setUser] = useState<User | null>(null);
  const [session, setSession] = useState<Session | null>(null);
  const [loading, setLoading] = useState(true);
  const [role, setRole] = useState<AppRole | null>(null);
  const [permissions, setPermissions] = useState<Permissions>(DEFAULT_PERMS);
  const initialized = useRef(false);
  const inactivityTimer = useRef<number | null>(null);
  const sessionRestoredRef = useRef(false);

  const fetchRoleAndPerms = useCallback(async (userId: string) => {
    const { supabase } = await getSupabase();

    const resolvedRole = await safeDataRequest<AppRole | null>({
      fallback: null,
      timeoutMs: AUTH_TIMEOUT_MS,
      markGlobalFallbackOnError: false,
      request: async (signal) => {
        const { data, error } = await supabase
          .from("user_roles").select("role").eq("user_id", userId)
          .abortSignal(signal).maybeSingle();
        if (error) throw error;
        return (data?.role as AppRole) || null;
      },
    });
    setRole(resolvedRole);

    const resolvedPerms = await safeDataRequest<Permissions>({
      fallback: DEFAULT_PERMS,
      timeoutMs: AUTH_TIMEOUT_MS,
      markGlobalFallbackOnError: false,
      request: async (signal) => {
        const { data, error } = await (supabase as any)
          .from("user_permissions").select("*").eq("user_id", userId)
          .abortSignal(signal).maybeSingle();
        if (error) throw error;
        return { ...DEFAULT_PERMS, ...(data ?? {}) } as Permissions;
      },
    });
    // Owner always has all perms regardless of row
    if (resolvedRole === "owner") {
      setPermissions({
        can_manage_seo: true,
        can_manage_blog: true,
        can_manage_media: true,
        can_manage_scripts: true,
        can_manage_videos: true,
        can_manage_users: true,
        is_disabled: false,
      });
    } else {
      setPermissions(resolvedPerms);
    }
    return resolvedRole;
  }, []);

  useEffect(() => {
    if (initialized.current) return;
    initialized.current = true;
    let active = true;
    let subscription: { unsubscribe: () => void } | null = null;

    const hardStop = window.setTimeout(() => {
      if (!active) return;
      setSession(null); setUser(null); setRole(null); setPermissions(DEFAULT_PERMS);
      setLoading(false);
    }, AUTH_TIMEOUT_MS);

    const initAuth = async () => {
      const { supabase } = await getSupabase();
      const { data: { subscription: nextSubscription } } = supabase.auth.onAuthStateChange((_event, nextSession) => {
        if (!sessionRestoredRef.current) return;
        setSession(nextSession);
        setUser(nextSession?.user ?? null);
        if (nextSession?.user) {
          fetchRoleAndPerms(nextSession.user.id).then(() => { if (active) setLoading(false); });
        } else {
          setRole(null); setPermissions(DEFAULT_PERMS);
          if (active) setLoading(false);
        }
      });
      subscription = nextSubscription;

      try {
        const { data: { session: currentSession } } = await withPromiseTimeout(
          supabase.auth.getSession(),
          { timeoutMs: AUTH_TIMEOUT_MS, markGlobalFallbackOnError: false },
        );
        if (!active) return;
        setSession(currentSession);
        setUser(currentSession?.user ?? null);
        if (currentSession?.user) await fetchRoleAndPerms(currentSession.user.id);
        else { setRole(null); setPermissions(DEFAULT_PERMS); }
      } catch {
        if (!active) return;
        setSession(null); setUser(null); setRole(null); setPermissions(DEFAULT_PERMS);
      } finally {
        sessionRestoredRef.current = true;
        if (active) setLoading(false);
        clearTimeout(hardStop);
      }
    };

    void initAuth();
    return () => { active = false; clearTimeout(hardStop); subscription?.unsubscribe(); };
  }, [fetchRoleAndPerms]);

  useEffect(() => {
    if (!user) return;
    const resetTimer = () => {
      if (inactivityTimer.current) window.clearTimeout(inactivityTimer.current);
      inactivityTimer.current = window.setTimeout(() => { void signOut(); }, INACTIVITY_TIMEOUT_MS);
    };
    const events: (keyof WindowEventMap)[] = ["mousedown", "keydown", "touchstart", "scroll"];
    events.forEach((e) => window.addEventListener(e, resetTimer, { passive: true }));
    resetTimer();
    return () => {
      if (inactivityTimer.current) window.clearTimeout(inactivityTimer.current);
      events.forEach((e) => window.removeEventListener(e, resetTimer));
    };
  }, [user]);

  const signIn = async (email: string, password: string) => {
    try {
      const { supabase } = await getSupabase();
      const { error } = await withPromiseTimeout(
        supabase.auth.signInWithPassword({ email, password }),
        { timeoutMs: AUTH_TIMEOUT_MS, markGlobalFallbackOnError: false },
      );
      return { error: error as Error | null };
    } catch { return { error: new Error("Request timed out. Please try again.") }; }
  };

  const signOut = async () => {
    const { supabase } = await getSupabase();
    await withPromiseTimeout(supabase.auth.signOut(), { timeoutMs: AUTH_TIMEOUT_MS, markGlobalFallbackOnError: false }).catch(() => undefined);
    setRole(null); setPermissions(DEFAULT_PERMS);
  };

  const isOwner = role === "owner";
  const can = (perm: PermissionKey) => {
    if (isOwner) return true;
    if (permissions.is_disabled) return false;
    return !!permissions[perm];
  };

  return (
    <AuthContext.Provider value={{
      user, session, loading, role,
      isOwner,
      isAdmin: role === "admin" || isOwner,
      isEditor: role === "editor",
      permissions, can,
      signIn, signOut,
    }}>
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => {
  const context = useContext(AuthContext);
  if (!context) throw new Error("useAuth must be used within AuthProvider");
  return context;
};

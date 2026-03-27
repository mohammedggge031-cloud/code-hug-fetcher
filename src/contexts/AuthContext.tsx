import { createContext, useContext, useEffect, useState, useRef, ReactNode } from "react";
import type { User, Session } from "@supabase/supabase-js";
import { SUPABASE_TIMEOUT_MS, safeDataRequest, withPromiseTimeout } from "@/lib/safeRuntimeData";

type AppRole = "admin" | "editor";

interface AuthContextType {
  user: User | null;
  session: Session | null;
  loading: boolean;
  role: AppRole | null;
  isAdmin: boolean;
  isEditor: boolean;
  signIn: (email: string, password: string) => Promise<{ error: Error | null }>;
  signOut: () => Promise<void>;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

// Lazy singleton – supabase client is only imported when auth is actually needed
let supabasePromise: ReturnType<typeof import("@/integrations/supabase/client")> | null = null;
const getSupabase = () => {
  if (!supabasePromise) {
    supabasePromise = import("@/integrations/supabase/client");
  }
  return supabasePromise;
};

export const AuthProvider = ({ children }: { children: ReactNode }) => {
  const [user, setUser] = useState<User | null>(null);
  const [session, setSession] = useState<Session | null>(null);
  const [loading, setLoading] = useState(true);
  const [role, setRole] = useState<AppRole | null>(null);
  const initialized = useRef(false);
  const AUTH_TIMEOUT_MS = SUPABASE_TIMEOUT_MS;

  const fetchRole = async (userId: string) => {
    const { supabase } = await getSupabase();
    const resolvedRole = await safeDataRequest<AppRole | null>({
      fallback: null,
      timeoutMs: AUTH_TIMEOUT_MS,
      markGlobalFallbackOnError: false,
      request: async (signal) => {
        const { data, error } = await supabase
          .from("user_roles")
          .select("role")
          .eq("user_id", userId)
          .abortSignal(signal)
          .maybeSingle();

        if (error) throw error;
        return (data?.role as AppRole) || null;
      },
    });

    setRole(resolvedRole);
  };

  useEffect(() => {
    if (initialized.current) return;
    initialized.current = true;

    let active = true;
    let subscription: { unsubscribe: () => void } | null = null;
    const hardStop = window.setTimeout(() => {
      if (!active) return;
      setSession(null);
      setUser(null);
      setRole(null);
      setLoading(false);
    }, AUTH_TIMEOUT_MS);

    const applySession = async (nextSession: Session | null) => {
      if (!active) return;

      setSession(nextSession);
      setUser(nextSession?.user ?? null);

      if (nextSession?.user) {
        await fetchRole(nextSession.user.id);
      } else {
        setRole(null);
      }

      if (active) setLoading(false);
    };

    const initAuth = async () => {
      const { supabase } = await getSupabase();

      const {
        data: { subscription: nextSubscription },
      } = supabase.auth.onAuthStateChange((_event, nextSession) => {
        void applySession(nextSession);
      });
      subscription = nextSubscription;

      try {
        const {
          data: { session: currentSession },
        } = await withPromiseTimeout(supabase.auth.getSession(), {
          timeoutMs: AUTH_TIMEOUT_MS,
          markGlobalFallbackOnError: false,
        });

        await applySession(currentSession);
      } catch {
        if (!active) return;
        setSession(null);
        setUser(null);
        setRole(null);
        setLoading(false);
      } finally {
        clearTimeout(hardStop);
      }
    };

    void initAuth();

    return () => {
      active = false;
      clearTimeout(hardStop);
      subscription?.unsubscribe();
    };
  }, []);

  const signIn = async (email: string, password: string) => {
    try {
      const { supabase } = await getSupabase();
      const { error } = await withPromiseTimeout(
        supabase.auth.signInWithPassword({ email, password }),
        { timeoutMs: AUTH_TIMEOUT_MS, markGlobalFallbackOnError: false },
      );
      return { error: error as Error | null };
    } catch {
      return { error: new Error("Request timed out. Please try again.") };
    }
  };

  const signOut = async () => {
    const { supabase } = await getSupabase();
    await withPromiseTimeout(supabase.auth.signOut(), {
      timeoutMs: AUTH_TIMEOUT_MS,
      markGlobalFallbackOnError: false,
    }).catch(() => undefined);
    setRole(null);
  };

  return (
    <AuthContext.Provider value={{
      user, session, loading, role,
      isAdmin: role === "admin",
      isEditor: role === "editor",
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

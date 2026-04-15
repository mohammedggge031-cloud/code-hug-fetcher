export const SUPABASE_TIMEOUT_MS = 4000;

let globalFallbackMode = false;
let fallbackResetTimer: ReturnType<typeof setTimeout> | null = null;
const FALLBACK_COOLDOWN_MS = 30_000; // Reset fallback mode after 30s

interface TimeoutOptions {
  timeoutMs?: number;
  markGlobalFallbackOnError?: boolean;
}

interface SafeDataRequestOptions<T> extends TimeoutOptions {
  fallback: T;
  request: (signal: AbortSignal) => Promise<T>;
  isEmpty?: (value: T) => boolean;
  skipWhenGlobalFallback?: boolean;
}

export const isGlobalFallbackMode = () => globalFallbackMode;

export const enableGlobalFallbackMode = () => {
  globalFallbackMode = true;
  // Auto-reset after cooldown so transient network issues don't permanently block data
  if (fallbackResetTimer) clearTimeout(fallbackResetTimer);
  fallbackResetTimer = setTimeout(() => {
    globalFallbackMode = false;
    fallbackResetTimer = null;
  }, FALLBACK_COOLDOWN_MS);
};

export async function withPromiseTimeout<T>(promise: Promise<T>, options: TimeoutOptions = {}): Promise<T> {
  const { timeoutMs = SUPABASE_TIMEOUT_MS, markGlobalFallbackOnError = false } = options;
  let timeoutId: ReturnType<typeof setTimeout> | null = null;

  const timeoutPromise = new Promise<never>((_, reject) => {
    timeoutId = setTimeout(() => reject(new Error("SUPABASE_TIMEOUT")), timeoutMs);
  });

  try {
    return (await Promise.race([promise, timeoutPromise])) as T;
  } catch (error) {
    if (markGlobalFallbackOnError) {
      enableGlobalFallbackMode();
    }
    throw error;
  } finally {
    if (timeoutId) clearTimeout(timeoutId);
  }
}

export async function withAbortTimeout<T>(
  request: (signal: AbortSignal) => Promise<T>,
  options: TimeoutOptions = {},
): Promise<T> {
  const { timeoutMs = SUPABASE_TIMEOUT_MS, markGlobalFallbackOnError = false } = options;
  const controller = new AbortController();
  const timeoutId = setTimeout(() => controller.abort(), timeoutMs);

  try {
    return await request(controller.signal);
  } catch (error) {
    if (markGlobalFallbackOnError) {
      enableGlobalFallbackMode();
    }
    throw error;
  } finally {
    clearTimeout(timeoutId);
  }
}

export async function safeDataRequest<T>(options: SafeDataRequestOptions<T>): Promise<T> {
  const {
    fallback,
    request,
    isEmpty,
    skipWhenGlobalFallback = true,
    timeoutMs = SUPABASE_TIMEOUT_MS,
    markGlobalFallbackOnError = true,
  } = options;

  if (skipWhenGlobalFallback && isGlobalFallbackMode()) {
    return fallback;
  }

  try {
    const value = await withAbortTimeout(request, { timeoutMs, markGlobalFallbackOnError });
    if (isEmpty?.(value)) {
      return fallback;
    }
    return value;
  } catch {
    return fallback;
  }
}

export async function fetchWithTimeout(
  input: RequestInfo | URL,
  init: RequestInit = {},
  options: TimeoutOptions = {},
): Promise<Response> {
  const { timeoutMs = SUPABASE_TIMEOUT_MS, markGlobalFallbackOnError = false } = options;
  const controller = new AbortController();
  const timeoutId = setTimeout(() => controller.abort(), timeoutMs);
  const externalSignal = init.signal;

  const onExternalAbort = () => controller.abort();
  if (externalSignal) {
    if (externalSignal.aborted) {
      controller.abort();
    } else {
      externalSignal.addEventListener("abort", onExternalAbort, { once: true });
    }
  }

  try {
    return await fetch(input, { ...init, signal: controller.signal });
  } catch (error) {
    if (markGlobalFallbackOnError) {
      enableGlobalFallbackMode();
    }
    throw error;
  } finally {
    clearTimeout(timeoutId);
    if (externalSignal) {
      externalSignal.removeEventListener("abort", onExternalAbort);
    }
  }
}

/**
 * Silent logger — prints in dev only, no-op in production.
 * Prevents noisy console.error/warn in user browsers while preserving
 * full diagnostics during development.
 *
 * Usage:
 *   import { logger } from "@/lib/logger";
 *   logger.error("Booking sync failed", err);
 */

const isDev = import.meta.env.DEV;
const isProd = import.meta.env.PROD;

type LogArgs = Parameters<typeof console.log>;

// Forward production errors to Sentry. Lazy-imported so dev bundles stay lean.
const reportToSentry = (args: LogArgs) => {
  if (!isProd) return;
  import("@sentry/react").then((Sentry) => {
    const first = args[0];
    if (first instanceof Error) {
      Sentry.captureException(first, { extra: { args: args.slice(1) } });
    } else {
      Sentry.captureMessage(
        typeof first === "string" ? first : JSON.stringify(first),
        { level: "error", extra: { args: args.slice(1) } },
      );
    }
  }).catch(() => { /* never block UI */ });
};

export const logger = {
  log: (...args: LogArgs) => {
    if (isDev) console.log(...args);
  },
  warn: (...args: LogArgs) => {
    if (isDev) console.warn(...args);
  },
  error: (...args: LogArgs) => {
    if (isDev) console.error(...args);
    reportToSentry(args);
  },
  info: (...args: LogArgs) => {
    if (isDev) console.info(...args);
  },
};

/**
 * Retry an async operation with exponential backoff.
 * Default: 3 attempts (initial + 2 retries), 500ms → 1000ms → 2000ms.
 *
 * Returns the resolved value, or throws the last error after exhausting retries.
 */
export async function retryWithBackoff<T>(
  operation: () => Promise<T>,
  options: { retries?: number; initialDelayMs?: number; label?: string } = {},
): Promise<T> {
  const { retries = 3, initialDelayMs = 500, label = "operation" } = options;
  let lastErr: unknown;

  for (let attempt = 0; attempt < retries; attempt++) {
    try {
      return await operation();
    } catch (err) {
      lastErr = err;
      if (attempt < retries - 1) {
        const delay = initialDelayMs * Math.pow(2, attempt);
        logger.warn(`[${label}] attempt ${attempt + 1}/${retries} failed, retrying in ${delay}ms`, err);
        await new Promise((r) => setTimeout(r, delay));
      }
    }
  }

  logger.error(`[${label}] all ${retries} attempts failed`, lastErr);
  throw lastErr;
}

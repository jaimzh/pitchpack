/**
 * Lightweight in-memory IP-based rate limiter.
 *
 * Uses a sliding window — each IP gets MAX_REQUESTS hits per WINDOW_MS.
 * Resets automatically when the window expires.
 *
 * NOTE: This is per-process memory, so in a multi-instance deployment you'd
 * swap this for Redis / Upstash. For a single-server or Vercel hobby tier
 * this is perfectly fine.
 */

const MAX_REQUESTS = Number(process.env.RATE_LIMIT_MAX ?? 10);
const WINDOW_MS = Number(process.env.RATE_LIMIT_WINDOW_MS ?? 24 * 60 * 60 * 1000); // 24 h

interface Entry {
  count: number;
  resetAt: number;
}

// Module-level map — persists across requests within the same server process
const store = new Map<string, Entry>();

export interface RateLimitResult {
  allowed: boolean;
  remaining: number;
  resetAt: number;
}

export function checkRateLimit(ip: string): RateLimitResult {
  const now = Date.now();
  const existing = store.get(ip);

  if (!existing || now >= existing.resetAt) {
    // Fresh window
    store.set(ip, { count: 1, resetAt: now + WINDOW_MS });
    return { allowed: true, remaining: MAX_REQUESTS - 1, resetAt: now + WINDOW_MS };
  }

  if (existing.count >= MAX_REQUESTS) {
    return { allowed: false, remaining: 0, resetAt: existing.resetAt };
  }

  existing.count += 1;
  return {
    allowed: true,
    remaining: MAX_REQUESTS - existing.count,
    resetAt: existing.resetAt,
  };
}

/** Expose the configured limit so the client can display it */
export const RATE_LIMIT_MAX = MAX_REQUESTS;

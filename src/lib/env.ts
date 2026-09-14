// Centralized environment variable access. Every value here has a safe
// default so the app runs with zero configuration — components should
// import `env` from this module instead of reading `process.env` directly.

function readPublicEnv(name: string, fallback: string): string {
  const value = process.env[name];
  return value && value.length > 0 ? value : fallback;
}

export const env = {
  /** Public site origin, used for absolute URLs in metadata. */
  siteUrl: readPublicEnv(
    "NEXT_PUBLIC_SITE_URL",
    "https://servora.hemandu.com",
  ),
  /**
   * The public Servora API Gateway origin. No feature in this app calls
   * it yet — this is plumbing for `src/lib/api/client.ts` so a feature
   * can start making real requests without inventing a base URL.
   */
  apiBaseUrl: readPublicEnv(
    "NEXT_PUBLIC_API_BASE_URL",
    "https://servora-api-gateway.onrender.com",
  ),
} as const;

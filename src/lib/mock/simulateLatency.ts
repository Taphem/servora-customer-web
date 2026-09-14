/**
 * Wraps a synchronous mock-data lookup in a small artificial delay so
 * loading states (skeletons, spinners) are exercised the same way they
 * will be once a real network call replaces the mock repository this
 * runs inside. Remove the delay along with the mock data it wraps — it
 * has no purpose once a real `fetch` provides its own latency.
 */
export function simulateLatency<T>(value: T, ms = 350): Promise<T> {
  return new Promise((resolve) => setTimeout(() => resolve(value), ms));
}

"use client";

import { useCallback, useEffect, useRef, useState } from "react";
import type { AsyncStatus } from "@/types/common";

/**
 * Runs `fetcher` on mount (and again whenever `deps` change) and tracks
 * loading/success/error — the one safe shape for "fetch on mount" used
 * across this app's discovery surfaces. Never calls a state setter
 * synchronously inside the effect body (only after the promise settles),
 * matching `AuthProvider`'s mount effect — calling setState synchronously
 * within an effect is flagged by this project's lint config and can
 * cause avoidable cascading renders. `retry()` is safe to call from an
 * event handler and does set "loading" synchronously, since it isn't
 * running inside an effect.
 */
export function useAsyncData<T>(fetcher: () => Promise<T>, initial: T, deps: readonly unknown[] = []) {
  const [status, setStatus] = useState<AsyncStatus>("loading");
  const [data, setData] = useState<T>(initial);
  const [retryToken, setRetryToken] = useState(0);

  const fetcherRef = useRef(fetcher);
  useEffect(() => {
    fetcherRef.current = fetcher;
  });

  useEffect(() => {
    let ignore = false;
    fetcherRef.current().then(
      (result) => {
        if (ignore) return;
        setData(result);
        setStatus("success");
      },
      () => {
        if (!ignore) setStatus("error");
      },
    );
    return () => {
      ignore = true;
    };
    // eslint-disable-next-line react-hooks/exhaustive-deps -- fetcher intentionally read via ref so callers don't need to memoize it; `deps` is the caller-declared trigger list
  }, [retryToken, ...deps]);

  const retry = useCallback(() => {
    setStatus("loading");
    setRetryToken((token) => token + 1);
  }, []);

  return { status, data, retry };
}

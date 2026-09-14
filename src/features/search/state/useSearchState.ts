"use client";

import { useCallback, useEffect, useMemo, useState, useTransition } from "react";
import { search } from "@/features/search/api/searchRepository";
import {
  DEFAULT_FILTERS,
  type SearchFilters,
  type SearchQuery,
  type SearchResultItem,
  type SortOption,
  type ViewMode,
} from "@/features/search/types";
import type { AsyncStatus } from "@/types/common";

export interface UseSearchStateOptions {
  /** Seeds the query from the URL on first render (e.g. `/search?q=plumber&category=plumbing`) — one-directional, read once. */
  initialQuery?: string;
  initialCategory?: string | null;
}

export interface UseSearchStateResult {
  query: SearchQuery;
  setSearchText: (value: string) => void;
  setCategory: (categorySlug: string | null) => void;
  setSort: (sort: SortOption) => void;
  setFilters: (filters: SearchFilters) => void;
  setViewMode: (mode: ViewMode) => void;
  status: AsyncStatus;
  items: SearchResultItem[];
  error: string | null;
  retry: () => void;
}

/**
 * Owns the full search query + results lifecycle in one place, so no
 * component scatters query/filter/sort/results state on its own. The
 * query shape (`SearchQuery`) is flat primitives on purpose — ready to
 * mirror into `/search?q=&category=` URL params later without changing
 * this hook's shape, though only the two fields above are actually read
 * from the URL today; full two-way sync is deliberately not built yet.
 */
export function useSearchState(options: UseSearchStateOptions = {}): UseSearchStateResult {
  const [searchText, setSearchText] = useState(options.initialQuery ?? "");
  const [category, setCategory] = useState<string | null>(options.initialCategory ?? null);
  const [sort, setSort] = useState<SortOption>("relevance");
  const [filters, setFilters] = useState<SearchFilters>(DEFAULT_FILTERS);
  const [viewMode, setViewMode] = useState<ViewMode>("list");

  const [status, setStatus] = useState<AsyncStatus>("idle");
  const [items, setItems] = useState<SearchResultItem[]>([]);
  const [error, setError] = useState<string | null>(null);
  const [isPending, startTransition] = useTransition();
  const [retryToken, setRetryToken] = useState(0);

  const query = useMemo<SearchQuery>(
    () => ({ query: searchText, category, sort, filters, viewMode }),
    [searchText, category, sort, filters, viewMode],
  );

  // Re-runs whenever anything that changes *results* changes (not
  // viewMode — switching list/map shouldn't re-fetch). Uses React 19's
  // async transitions so `isPending` tracks the in-flight request without
  // this effect ever calling a state setter synchronously in its body —
  // every setState here happens after the `await`, in the same pattern
  // used by AuthProvider's session check (see src/lib/auth/AuthProvider.tsx).
  useEffect(() => {
    let ignore = false;
    startTransition(async () => {
      try {
        const results = await search({ query: searchText, category, sort, filters, viewMode });
        if (ignore) return;
        setItems(results);
        setStatus("success");
        setError(null);
      } catch {
        if (ignore) return;
        setItems([]);
        setStatus("error");
        setError("Couldn't load results. Please try again.");
      }
    });
    return () => {
      ignore = true;
    };
    // eslint-disable-next-line react-hooks/exhaustive-deps -- viewMode intentionally excluded; retryToken forces a re-run without changing the query
  }, [searchText, category, sort, filters, retryToken]);

  const retry = useCallback(() => setRetryToken((token) => token + 1), []);

  return {
    query,
    setSearchText,
    setCategory,
    setSort,
    setFilters,
    setViewMode,
    status: isPending ? "loading" : status,
    items,
    error,
    retry,
  };
}

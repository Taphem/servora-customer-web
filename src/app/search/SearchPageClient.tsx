"use client";

import { useEffect, useState } from "react";
import { Container } from "@/components/ui/Container";
import { SearchBar } from "@/components/marketplace/SearchBar";
import { DiscoveryLayout } from "@/features/discovery/components/DiscoveryLayout";
import { FiltersPanel } from "@/features/search/components/FiltersPanel";
import { SortControl } from "@/features/search/components/SortControl";
import { ViewToggle } from "@/features/search/components/ViewToggle";
import { SearchResultsGrid } from "@/features/search/components/SearchResultsGrid";
import { MapPanelPlaceholder } from "@/features/search/components/MapPanelPlaceholder";
import { useSearchState } from "@/features/search/state/useSearchState";
import { listCategories } from "@/features/services/api/servicesRepository";
import type { Category } from "@/features/services/types";

interface SearchPageClientProps {
  initialQuery: string;
  initialCategory: string | null;
}

export function SearchPageClient({ initialQuery, initialCategory }: SearchPageClientProps) {
  const [categories, setCategories] = useState<Category[]>([]);

  const {
    query,
    setSearchText,
    setCategory,
    setSort,
    setFilters,
    setViewMode,
    status,
    items,
    retry,
  } = useSearchState({ initialQuery, initialCategory });

  useEffect(() => {
    let ignore = false;
    void listCategories().then((result) => {
      if (!ignore) setCategories(result);
    });
    return () => {
      ignore = true;
    };
  }, []);

  const resultsLabel =
    status === "success"
      ? `${items.length} result${items.length === 1 ? "" : "s"}`
      : status === "loading"
        ? "Searching…"
        : "";

  return (
    <Container className="py-8 sm:py-10">
      <div className="flex flex-col gap-2">
        <h1 className="text-h2 font-display text-text-primary">
          Search services and providers
        </h1>
        <p className="text-body text-text-secondary">
          Find and compare services and providers near you.
        </p>
      </div>

      <div className="mt-6">
        <SearchBar value={query.query} onChange={setSearchText} />
      </div>

      <div className="mt-6 flex flex-wrap items-center justify-between gap-3">
        <p className="text-small font-medium text-text-secondary" aria-live="polite">
          {resultsLabel}
        </p>
        <div className="flex items-center gap-2">
          <SortControl sort={query.sort} onChange={setSort} />
          <ViewToggle viewMode={query.viewMode} onChange={setViewMode} />
        </div>
      </div>

      <div className="mt-6">
        <DiscoveryLayout
          list={
            <div className="flex flex-col gap-6 lg:flex-row lg:items-start">
              <aside className="lg:w-64 lg:shrink-0">
                <FiltersPanel
                  categories={categories}
                  category={query.category}
                  onCategoryChange={setCategory}
                  filters={query.filters}
                  onFiltersChange={setFilters}
                />
              </aside>
              <div className="min-w-0 flex-1">
                <SearchResultsGrid status={status} items={items} onRetry={retry} />
              </div>
            </div>
          }
          map={query.viewMode === "map" ? <MapPanelPlaceholder /> : undefined}
        />
      </div>
    </Container>
  );
}

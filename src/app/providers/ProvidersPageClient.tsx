"use client";

import { useState } from "react";
import { Users } from "lucide-react";
import { Container } from "@/components/ui/Container";
import { Badge } from "@/components/ui/Badge";
import { Select } from "@/components/ui/Select";
import { SearchBar } from "@/components/marketplace/SearchBar";
import { ProviderCard } from "@/components/marketplace/ProviderCard";
import { ProviderCardSkeleton } from "@/components/marketplace/CardSkeletons";
import { AsyncCardGrid } from "@/components/marketplace/AsyncCardGrid";
import { listProviders } from "@/features/providers/api/providersRepository";
import { listCategories } from "@/features/services/api/servicesRepository";
import { useAsyncData } from "@/hooks/useAsyncData";
import { useLocation } from "@/lib/location/LocationProvider";

const MIN_RATING_OPTIONS = [4.5, 4, 3.5];

export function ProvidersPageClient() {
  const [query, setQuery] = useState("");
  const [categorySlug, setCategorySlug] = useState<string | null>(null);
  const [minRating, setMinRating] = useState<number | null>(null);

  const { data: categories } = useAsyncData(listCategories, []);
  const { status, data: providers, retry } = useAsyncData(
    () => listProviders({ query, categorySlug: categorySlug ?? undefined, minRating: minRating ?? undefined }),
    [],
    [query, categorySlug, minRating],
  );

  const { status: locationStatus, location } = useLocation();

  return (
    <Container className="py-10 sm:py-12">
      <div className="flex flex-col gap-3">
        <Badge variant="brand">Providers</Badge>
        <h1 className="text-h2 font-display text-text-primary">Discover local providers</h1>
        <p className="max-w-xl text-body text-text-secondary">
          {locationStatus === "resolved" && location
            ? `Browsing providers near ${location.displayAddress}.`
            : "Set your location to see providers near you, or browse all providers below."}
        </p>
      </div>

      <div className="mt-6">
        <SearchBar
          value={query}
          onChange={setQuery}
          placeholder="Search providers by name or category"
        />
      </div>

      <div className="mt-4 flex flex-wrap gap-3 sm:max-w-md">
        <Select
          label="Category"
          hideLabel
          value={categorySlug ?? ""}
          onChange={(event) => setCategorySlug(event.target.value || null)}
          className="flex-1"
        >
          <option value="">All categories</option>
          {categories.map((category) => (
            <option key={category.slug} value={category.slug}>
              {category.name}
            </option>
          ))}
        </Select>
        <Select
          label="Minimum rating"
          hideLabel
          value={minRating ?? ""}
          onChange={(event) => setMinRating(event.target.value ? Number(event.target.value) : null)}
          className="flex-1"
        >
          <option value="">Any rating</option>
          {MIN_RATING_OPTIONS.map((rating) => (
            <option key={rating} value={rating}>
              {rating.toFixed(1)}+ stars
            </option>
          ))}
        </Select>
      </div>

      <div className="mt-8">
        <AsyncCardGrid
          status={status}
          items={providers}
          getKey={(provider) => provider.id}
          renderItem={(provider) => <ProviderCard provider={provider} />}
          renderSkeleton={() => <ProviderCardSkeleton />}
          skeletonCount={6}
          emptyIcon={<Users size={28} aria-hidden />}
          emptyTitle="No providers found"
          emptyDescription="Try a different search term, category, or rating filter."
          errorDescription="Couldn't load providers. Please try again."
          onRetry={retry}
        />
      </div>
    </Container>
  );
}

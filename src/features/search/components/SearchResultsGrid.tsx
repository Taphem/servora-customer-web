"use client";

import { SearchX } from "lucide-react";
import { AsyncCardGrid } from "@/components/marketplace/AsyncCardGrid";
import { ServiceCard } from "@/components/marketplace/ServiceCard";
import { ProviderCard } from "@/components/marketplace/ProviderCard";
import { ServiceCardSkeleton } from "@/components/marketplace/CardSkeletons";
import type { SearchResultItem } from "@/features/search/types";
import type { AsyncStatus } from "@/types/common";

interface SearchResultsGridProps {
  status: AsyncStatus;
  items: SearchResultItem[];
  onRetry: () => void;
}

function resultKey(item: SearchResultItem): string {
  return item.kind === "service" ? `service-${item.service.id}` : `provider-${item.provider.id}`;
}

export function SearchResultsGrid({ status, items, onRetry }: SearchResultsGridProps) {
  return (
    <AsyncCardGrid
      status={status}
      items={items}
      getKey={resultKey}
      renderItem={(item) =>
        item.kind === "service" ? (
          <ServiceCard service={item.service} />
        ) : (
          <ProviderCard provider={item.provider} />
        )
      }
      renderSkeleton={() => <ServiceCardSkeleton />}
      skeletonCount={6}
      className="sm:grid-cols-2 lg:grid-cols-2"
      emptyIcon={<SearchX size={28} aria-hidden />}
      emptyTitle="No results found"
      emptyDescription="Try a different search term, category, or fewer filters."
      errorDescription="Couldn't load search results. Please try again."
      onRetry={onRetry}
    />
  );
}

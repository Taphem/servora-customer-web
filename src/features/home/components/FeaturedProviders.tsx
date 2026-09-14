"use client";

import { Users } from "lucide-react";
import { AsyncCardGrid } from "@/components/marketplace/AsyncCardGrid";
import { ProviderCard } from "@/components/marketplace/ProviderCard";
import { ProviderCardSkeleton } from "@/components/marketplace/CardSkeletons";
import { listFeaturedProviders } from "@/features/providers/api/providersRepository";
import { useAsyncData } from "@/hooks/useAsyncData";

export function FeaturedProviders() {
  const { status, data: providers, retry } = useAsyncData(
    () => listFeaturedProviders(4),
    [],
  );

  return (
    <section aria-labelledby="featured-providers-heading">
      <h2 id="featured-providers-heading" className="text-h3 font-display text-text-primary">
        Featured providers
      </h2>
      <p className="mt-1 text-small text-text-secondary">Highly rated professionals on Servora</p>

      <div className="mt-5">
        <AsyncCardGrid
          status={status}
          items={providers}
          getKey={(provider) => provider.id}
          renderItem={(provider) => <ProviderCard provider={provider} />}
          renderSkeleton={() => <ProviderCardSkeleton />}
          skeletonCount={4}
          className="sm:grid-cols-2 lg:grid-cols-4"
          emptyIcon={<Users size={28} aria-hidden />}
          emptyTitle="No featured providers yet"
          errorDescription="Couldn't load featured providers. Please try again."
          onRetry={retry}
        />
      </div>
    </section>
  );
}

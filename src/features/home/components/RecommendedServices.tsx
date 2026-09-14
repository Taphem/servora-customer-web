"use client";

import { Sparkles } from "lucide-react";
import { AsyncCardGrid } from "@/components/marketplace/AsyncCardGrid";
import { ServiceCard } from "@/components/marketplace/ServiceCard";
import { ServiceCardSkeleton } from "@/components/marketplace/CardSkeletons";
import { listRecommendedServices } from "@/features/services/api/servicesRepository";
import { useAsyncData } from "@/hooks/useAsyncData";

export function RecommendedServices() {
  const { status, data: services, retry } = useAsyncData(
    () => listRecommendedServices(6),
    [],
  );

  return (
    <section aria-labelledby="recommended-services-heading">
      <h2 id="recommended-services-heading" className="text-h3 font-display text-text-primary">
        Recommended services
      </h2>
      <p className="mt-1 text-small text-text-secondary">
        Popular with customers — not yet personalized to your location
      </p>

      <div className="mt-5">
        <AsyncCardGrid
          status={status}
          items={services}
          getKey={(service) => service.id}
          renderItem={(service) => <ServiceCard service={service} />}
          renderSkeleton={() => <ServiceCardSkeleton />}
          skeletonCount={6}
          emptyIcon={<Sparkles size={28} aria-hidden />}
          emptyTitle="No recommended services yet"
          errorDescription="Couldn't load recommended services. Please try again."
          onRetry={retry}
        />
      </div>
    </section>
  );
}

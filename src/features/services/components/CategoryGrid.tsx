"use client";

import { LayoutGrid } from "lucide-react";
import { AsyncCardGrid } from "@/components/marketplace/AsyncCardGrid";
import { CategoryCard } from "@/components/marketplace/CategoryCard";
import { CategoryCardSkeleton } from "@/components/marketplace/CardSkeletons";
import { listCategories } from "@/features/services/api/servicesRepository";
import { useAsyncData } from "@/hooks/useAsyncData";
import { ROUTES } from "@/constants/routes";

interface CategoryGridProps {
  title: string;
  description?: string;
  headingId: string;
}

/** Shared between Home's "Popular categories" rail and /services' full category browser. */
export function CategoryGrid({ title, description, headingId }: CategoryGridProps) {
  const { status, data: categories, retry } = useAsyncData(listCategories, []);

  return (
    <section aria-labelledby={headingId}>
      <h2 id={headingId} className="text-h3 font-display text-text-primary">
        {title}
      </h2>
      {description ? <p className="mt-1 text-small text-text-secondary">{description}</p> : null}

      <div className="mt-5">
        <AsyncCardGrid
          status={status}
          items={categories}
          getKey={(category) => category.slug}
          renderItem={(category) => (
            <CategoryCard category={category} href={`${ROUTES.search}?category=${category.slug}`} />
          )}
          renderSkeleton={() => <CategoryCardSkeleton />}
          skeletonCount={8}
          className="sm:grid-cols-3 lg:grid-cols-4"
          emptyIcon={<LayoutGrid size={28} aria-hidden />}
          emptyTitle="No categories to show yet"
          errorDescription="Couldn't load categories. Please try again."
          onRetry={retry}
        />
      </div>
    </section>
  );
}

"use client";

import type { Category } from "@/features/services/types";
import type { SearchFilters } from "@/features/search/types";
import { Select } from "@/components/ui/Select";

const MAX_PRICE_OPTIONS = [50, 100, 200, 500];
const MIN_RATING_OPTIONS = [4.5, 4, 3.5];
const MAX_DISTANCE_OPTIONS = [5, 10, 25, 50];

interface FiltersPanelProps {
  categories: Category[];
  category: string | null;
  onCategoryChange: (categorySlug: string | null) => void;
  filters: SearchFilters;
  onFiltersChange: (filters: SearchFilters) => void;
}

export function FiltersPanel({
  categories,
  category,
  onCategoryChange,
  filters,
  onFiltersChange,
}: FiltersPanelProps) {
  return (
    <div className="flex flex-col gap-4">
      <Select
        label="Category"
        value={category ?? ""}
        onChange={(event) => onCategoryChange(event.target.value || null)}
      >
        <option value="">All categories</option>
        {categories.map((item) => (
          <option key={item.slug} value={item.slug}>
            {item.name}
          </option>
        ))}
      </Select>

      <Select
        label="Max price"
        value={filters.maxPrice ?? ""}
        onChange={(event) =>
          onFiltersChange({
            ...filters,
            maxPrice: event.target.value ? Number(event.target.value) : null,
          })
        }
      >
        <option value="">Any price</option>
        {MAX_PRICE_OPTIONS.map((price) => (
          <option key={price} value={price}>
            Under ${price}
          </option>
        ))}
      </Select>

      <Select
        label="Minimum rating"
        value={filters.minRating ?? ""}
        onChange={(event) =>
          onFiltersChange({
            ...filters,
            minRating: event.target.value ? Number(event.target.value) : null,
          })
        }
      >
        <option value="">Any rating</option>
        {MIN_RATING_OPTIONS.map((rating) => (
          <option key={rating} value={rating}>
            {rating.toFixed(1)}+ stars
          </option>
        ))}
      </Select>

      <Select
        label="Max distance"
        hint="Applies once your location is set — distance isn't available for every result yet."
        value={filters.maxDistanceKm ?? ""}
        onChange={(event) =>
          onFiltersChange({
            ...filters,
            maxDistanceKm: event.target.value ? Number(event.target.value) : null,
          })
        }
      >
        <option value="">Any distance</option>
        {MAX_DISTANCE_OPTIONS.map((distance) => (
          <option key={distance} value={distance}>
            Within {distance} km
          </option>
        ))}
      </Select>

      <Select label="Availability" hint="Coming soon." disabled defaultValue="">
        <option value="">Any availability</option>
      </Select>
    </div>
  );
}

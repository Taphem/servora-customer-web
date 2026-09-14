"use client";

import { Select } from "@/components/ui/Select";
import type { SortOption } from "@/features/search/types";

const SORT_LABELS: Record<SortOption, string> = {
  relevance: "Relevance",
  rating: "Highest rated",
  priceLow: "Price: low to high",
  priceHigh: "Price: high to low",
  distance: "Distance",
};

interface SortControlProps {
  sort: SortOption;
  onChange: (sort: SortOption) => void;
}

export function SortControl({ sort, onChange }: SortControlProps) {
  return (
    <Select
      label="Sort by"
      hideLabel
      value={sort}
      onChange={(event) => onChange(event.target.value as SortOption)}
      className="h-10 w-auto min-w-40"
    >
      {(Object.keys(SORT_LABELS) as SortOption[]).map((option) => (
        <option key={option} value={option}>
          {SORT_LABELS[option]}
        </option>
      ))}
    </Select>
  );
}

"use client";

import type { FormEvent } from "react";
import { Search } from "lucide-react";
import { Input } from "@/components/ui/Input";
import { Button } from "@/components/ui/Button";
import { LocationButton } from "@/components/layout/LocationButton";
import { cn } from "@/lib/utils";

interface SearchBarProps {
  value: string;
  onChange: (value: string) => void;
  onSubmit?: (value: string) => void;
  placeholder?: string;
  showLocation?: boolean;
  size?: "md" | "lg";
  className?: string;
}

/**
 * The one search input used on both the home hero and /search — kept
 * controlled so a caller can either drive it live (search-as-you-type on
 * /search) or only read it on submit (home, which just navigates to
 * /search?q=... — see HeroSearch).
 */
export function SearchBar({
  value,
  onChange,
  onSubmit,
  placeholder = "What service do you need?",
  showLocation = true,
  size = "md",
  className,
}: SearchBarProps) {
  const handleSubmit = (event: FormEvent) => {
    event.preventDefault();
    onSubmit?.(value);
  };

  return (
    <form
      onSubmit={handleSubmit}
      className={cn(
        "flex flex-col gap-2 rounded-(--radius-lg) border border-border-default bg-surface-raised p-2 shadow-sm sm:flex-row sm:items-center",
        size === "lg" && "sm:p-2.5",
        className,
      )}
    >
      <div className="flex flex-1 items-center gap-2 px-2">
        <Search size={18} className="shrink-0 text-text-tertiary" aria-hidden />
        <Input
          label="Search services or providers"
          hideLabel
          value={value}
          onChange={(event) => onChange(event.target.value)}
          placeholder={placeholder}
          className="h-11 border-none bg-transparent px-0 shadow-none focus-visible:outline-none"
        />
      </div>

      {showLocation ? (
        <>
          <div className="hidden h-6 w-px bg-border-default sm:block" aria-hidden />
          <LocationButton className="justify-start sm:justify-center" />
        </>
      ) : null}

      <Button type="submit" variant="primary" size={size === "lg" ? "lg" : "md"} className="w-full sm:w-auto">
        Search
      </Button>
    </form>
  );
}

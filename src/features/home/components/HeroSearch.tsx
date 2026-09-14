"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { Badge } from "@/components/ui/Badge";
import { SearchBar } from "@/components/marketplace/SearchBar";
import { ROUTES } from "@/constants/routes";

export function HeroSearch() {
  const router = useRouter();
  const [query, setQuery] = useState("");

  const handleSubmit = (value: string) => {
    const params = new URLSearchParams();
    if (value.trim()) params.set("q", value.trim());
    const suffix = params.toString();
    router.push(suffix ? `${ROUTES.search}?${suffix}` : ROUTES.search);
  };

  return (
    <div className="flex flex-col items-center gap-5 py-4 text-center">
      <Badge variant="brand">Servora marketplace</Badge>
      <h1 className="max-w-2xl text-h1 font-display text-text-primary">
        Find the right service, right when you need it.
      </h1>
      <p className="max-w-xl text-body text-text-secondary">
        Search trusted local professionals, compare ratings and prices, and
        book with confidence.
      </p>
      <div className="mt-2 w-full max-w-2xl">
        <SearchBar value={query} onChange={setQuery} onSubmit={handleSubmit} size="lg" />
      </div>
      <p className="text-small text-text-tertiary">
        Try &ldquo;plumber&rdquo;, &ldquo;house cleaning&rdquo;, or &ldquo;haircut&rdquo;
      </p>
    </div>
  );
}

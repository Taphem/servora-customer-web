"use client";

import { MapPin, BadgeCheck } from "lucide-react";
import type { Provider } from "@/features/providers/types";
import { iconForCategory } from "@/features/services/categoryIcons";
import { PlaceholderThumbnail } from "@/components/marketplace/PlaceholderThumbnail";
import { RatingStars } from "@/components/marketplace/RatingStars";
import { Card } from "@/components/ui/Card";
import { Badge } from "@/components/ui/Badge";
import { Button } from "@/components/ui/Button";
import { useToast } from "@/components/ui/Toast";

interface ProviderCardProps {
  provider: Provider;
}

/**
 * Provider profile pages are a later phase — the CTA is an honest "not
 * available yet" action rather than a link to a route that doesn't
 * exist. `verified` only ever reflects the mock record's own field, never
 * implied beyond what the data actually says (see providers.mock.ts).
 */
export function ProviderCard({ provider }: ProviderCardProps) {
  const { showToast } = useToast();
  const Icon = iconForCategory(provider.categorySlug);

  return (
    <Card className="flex flex-col gap-4">
      <div className="flex items-start gap-4">
        <PlaceholderThumbnail seed={provider.imageSeed} icon={Icon} className="h-16 w-16 shrink-0" />
        <div className="min-w-0">
          <Badge variant="neutral" className="mb-1.5">
            {provider.categoryName}
          </Badge>
          <div className="flex items-center gap-1.5">
            <p className="truncate text-h4 text-text-primary">{provider.businessName}</p>
            {provider.verified ? (
              <span title="Verified by Servora">
                <BadgeCheck size={16} className="shrink-0 text-primary" aria-label="Verified by Servora" />
              </span>
            ) : null}
          </div>
        </div>
      </div>

      <RatingStars rating={provider.rating} reviewCount={provider.reviewCount} />

      <div className="flex items-center gap-1.5 text-small text-text-tertiary">
        <MapPin size={14} className="shrink-0" aria-hidden />
        <span className="truncate">
          {provider.distanceKm !== null
            ? `${provider.distanceKm.toFixed(1)} km away · ${provider.serviceArea}`
            : provider.serviceArea}
        </span>
      </div>

      <div className="mt-auto pt-1">
        <Button
          size="sm"
          variant="secondary"
          className="w-full"
          onClick={() => showToast("Provider profiles aren't available yet.", "info")}
        >
          View profile
        </Button>
      </div>
    </Card>
  );
}

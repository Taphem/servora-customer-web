"use client";

import { MapPin } from "lucide-react";
import type { Service } from "@/features/services/types";
import { iconForCategory } from "@/features/services/categoryIcons";
import { PlaceholderThumbnail } from "@/components/marketplace/PlaceholderThumbnail";
import { RatingStars } from "@/components/marketplace/RatingStars";
import { Card } from "@/components/ui/Card";
import { Badge } from "@/components/ui/Badge";
import { Button } from "@/components/ui/Button";
import { useToast } from "@/components/ui/Toast";

const PRICE_UNIT_LABEL: Record<Service["priceUnit"], string> = {
  visit: "/visit",
  hour: "/hr",
  sqft: "/sqft",
};

interface ServiceCardProps {
  service: Service;
}

/**
 * There's no service detail page yet (a later phase) — the CTA is an
 * honest "not available yet" action rather than a link to a route that
 * doesn't exist, matching how this app avoids dead links elsewhere
 * (see /profile's Log in/Sign up buttons).
 */
export function ServiceCard({ service }: ServiceCardProps) {
  const { showToast } = useToast();
  const Icon = iconForCategory(service.categorySlug);

  return (
    <Card className="flex flex-col gap-4">
      <div className="flex items-start gap-4">
        <PlaceholderThumbnail seed={service.imageSeed} icon={Icon} className="h-16 w-16 shrink-0" />
        <div className="min-w-0">
          <Badge variant="neutral" className="mb-1.5">
            {service.categoryName}
          </Badge>
          <p className="truncate text-h4 text-text-primary">{service.name}</p>
          <p className="truncate text-small text-text-secondary">{service.providerName}</p>
        </div>
      </div>

      <RatingStars rating={service.rating} reviewCount={service.reviewCount} />

      {service.distanceKm !== null ? (
        <div className="flex items-center gap-1.5 text-small text-text-tertiary">
          <MapPin size={14} className="shrink-0" aria-hidden />
          {service.distanceKm.toFixed(1)} km away
        </div>
      ) : null}

      <div className="mt-auto flex items-center justify-between gap-3 pt-1">
        <p className="text-body font-medium text-text-primary">
          From ${service.priceFrom}
          <span className="text-text-tertiary">{PRICE_UNIT_LABEL[service.priceUnit]}</span>
        </p>
        <Button
          size="sm"
          variant="secondary"
          onClick={() => showToast("Service details aren't available yet.", "info")}
        >
          View details
        </Button>
      </div>
    </Card>
  );
}

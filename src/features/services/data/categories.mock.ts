import {
  Sparkles,
  Wrench,
  Zap,
  Scissors,
  Cog,
  PaintRoller,
  Truck,
  Car,
} from "lucide-react";
import type { Category } from "@/features/services/types";

/**
 * TEMPORARY MOCK DATA — hardcoded UI data standing in for a real category
 * catalog. No `servora-services`-style backend contract exists for this
 * app to call yet (see README). Consumed only through
 * `features/services/api/servicesRepository.ts`, never imported directly
 * by page/UI components, so swapping this for a real endpoint later is a
 * one-file change.
 */
export const MOCK_CATEGORIES: Category[] = [
  {
    slug: "home-cleaning",
    name: "Home Cleaning",
    icon: Sparkles,
    description: "Standard, deep, and move-out cleans",
  },
  {
    slug: "plumbing",
    name: "Plumbing",
    icon: Wrench,
    description: "Leaks, drains, fixtures & repairs",
  },
  {
    slug: "electrical",
    name: "Electrical",
    icon: Zap,
    description: "Wiring, panels, and installations",
  },
  {
    slug: "beauty",
    name: "Beauty",
    icon: Scissors,
    description: "Hair, nails, and skincare",
  },
  {
    slug: "appliance-repair",
    name: "Appliance Repair",
    icon: Cog,
    description: "Fridges, washers, and ovens",
  },
  {
    slug: "painting",
    name: "Painting",
    icon: PaintRoller,
    description: "Interior and exterior painting",
  },
  {
    slug: "moving",
    name: "Moving",
    icon: Truck,
    description: "Local and long-distance movers",
  },
  {
    slug: "car-services",
    name: "Car Services",
    icon: Car,
    description: "Maintenance, repair, and detailing",
  },
];

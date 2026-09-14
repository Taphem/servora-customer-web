import { describe, expect, it } from "vitest";
import { screen, fireEvent, waitFor } from "@testing-library/react";
import { renderWithProviders } from "@/test/test-utils";
import { ServiceCard } from "./ServiceCard";
import type { Service } from "@/features/services/types";

const service: Service = {
  id: "s1",
  slug: "standard-home-cleaning",
  name: "Standard Home Cleaning",
  categorySlug: "home-cleaning",
  categoryName: "Home Cleaning",
  providerId: "p1",
  providerName: "Sparkle Home Cleaners",
  rating: 4.8,
  reviewCount: 214,
  priceFrom: 89,
  priceUnit: "visit",
  distanceKm: null,
  imageSeed: "standard-home-cleaning",
};

describe("ServiceCard", () => {
  it("renders the service's core marketplace details", () => {
    renderWithProviders(<ServiceCard service={service} />);

    expect(screen.getByText("Standard Home Cleaning")).toBeInTheDocument();
    expect(screen.getByText("Sparkle Home Cleaners")).toBeInTheDocument();
    expect(screen.getByText("Home Cleaning")).toBeInTheDocument();
    expect(screen.getByText(/From \$89/)).toBeInTheDocument();
    expect(screen.getByText(/214 reviews/)).toBeInTheDocument();
  });

  it("does not render a distance line when distance is unknown", () => {
    renderWithProviders(<ServiceCard service={service} />);
    expect(screen.queryByText(/km away/)).not.toBeInTheDocument();
  });

  it("renders a real distance when it is known", () => {
    renderWithProviders(<ServiceCard service={{ ...service, distanceKm: 3.2 }} />);
    expect(screen.getByText("3.2 km away")).toBeInTheDocument();
  });

  it("shows an honest 'not available yet' toast on the CTA instead of a dead link", async () => {
    renderWithProviders(<ServiceCard service={service} />);
    fireEvent.click(screen.getByRole("button", { name: "View details" }));
    await waitFor(() => {
      expect(screen.getByText("Service details aren't available yet.")).toBeInTheDocument();
    });
  });
});

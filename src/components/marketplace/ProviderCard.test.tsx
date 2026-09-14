import { describe, expect, it } from "vitest";
import { screen, fireEvent, waitFor } from "@testing-library/react";
import { renderWithProviders } from "@/test/test-utils";
import { ProviderCard } from "./ProviderCard";
import type { Provider } from "@/features/providers/types";

const provider: Provider = {
  id: "p1",
  slug: "sparkle-home-cleaners",
  businessName: "Sparkle Home Cleaners",
  categorySlug: "home-cleaning",
  categoryName: "Home Cleaning",
  rating: 4.8,
  reviewCount: 214,
  serviceArea: "Serves Downtown & surrounding areas",
  distanceKm: null,
  verified: true,
  imageSeed: "sparkle-home-cleaners",
};

describe("ProviderCard", () => {
  it("renders the provider's core marketplace details", () => {
    renderWithProviders(<ProviderCard provider={provider} />);

    expect(screen.getByText("Sparkle Home Cleaners")).toBeInTheDocument();
    expect(screen.getByText("Home Cleaning")).toBeInTheDocument();
    expect(screen.getByText(/214 reviews/)).toBeInTheDocument();
    expect(screen.getByText("Serves Downtown & surrounding areas")).toBeInTheDocument();
  });

  it("shows a verified indicator when the record is verified", () => {
    renderWithProviders(<ProviderCard provider={provider} />);
    expect(screen.getByLabelText("Verified by Servora")).toBeInTheDocument();
  });

  it("shows no verified indicator when the record is not verified", () => {
    renderWithProviders(<ProviderCard provider={{ ...provider, verified: false }} />);
    expect(screen.queryByLabelText("Verified by Servora")).not.toBeInTheDocument();
  });

  it("shows an honest 'not available yet' toast on the CTA instead of a dead link", async () => {
    renderWithProviders(<ProviderCard provider={provider} />);
    fireEvent.click(screen.getByRole("button", { name: "View profile" }));
    await waitFor(() => {
      expect(screen.getByText("Provider profiles aren't available yet.")).toBeInTheDocument();
    });
  });
});

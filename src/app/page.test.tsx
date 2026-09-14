import { describe, expect, it, vi } from "vitest";
import { screen, waitFor } from "@testing-library/react";
import { renderWithProviders } from "@/test/test-utils";
import HomePage from "./page";

vi.mock("next/navigation", () => ({
  useRouter: () => ({ push: vi.fn() }),
  usePathname: () => "/",
}));

describe("HomePage", () => {
  it("renders the hero, category, and marketplace sections", async () => {
    renderWithProviders(<HomePage />);

    expect(
      screen.getByRole("heading", { name: /find the right service/i, level: 1 }),
    ).toBeInTheDocument();
    expect(screen.getByPlaceholderText("What service do you need?")).toBeInTheDocument();

    expect(screen.getByRole("heading", { name: "Popular categories" })).toBeInTheDocument();
    expect(screen.getByRole("heading", { name: "Recommended services" })).toBeInTheDocument();
    expect(screen.getByRole("heading", { name: "Featured providers" })).toBeInTheDocument();

    await waitFor(
      () => {
        expect(screen.getAllByText("Home Cleaning").length).toBeGreaterThan(0);
      },
      { timeout: 3000 },
    );

    await waitFor(
      () => {
        expect(screen.getAllByRole("button", { name: "View details" }).length).toBeGreaterThan(0);
      },
      { timeout: 3000 },
    );

    await waitFor(
      () => {
        expect(screen.getAllByRole("button", { name: "View profile" }).length).toBeGreaterThan(0);
      },
      { timeout: 3000 },
    );
  });
});

import { describe, expect, it } from "vitest";
import { screen, waitFor, fireEvent } from "@testing-library/react";
import { renderWithProviders } from "@/test/test-utils";
import { SearchPageClient } from "./SearchPageClient";

describe("SearchPageClient", () => {
  it("renders the search page and shows results once the initial search resolves", async () => {
    renderWithProviders(<SearchPageClient initialQuery="" initialCategory={null} />);

    expect(
      screen.getByRole("heading", { name: "Search services and providers" }),
    ).toBeInTheDocument();

    await waitFor(
      () => {
        expect(screen.getByText(/\d+ results?/)).toBeInTheDocument();
      },
      { timeout: 3000 },
    );
  });

  it("seeds the search box from the initial query and returns matching results", async () => {
    renderWithProviders(<SearchPageClient initialQuery="plumb" initialCategory={null} />);

    expect(screen.getByDisplayValue("plumb")).toBeInTheDocument();

    await waitFor(
      () => {
        expect(screen.getAllByText("Quick Flow Plumbing").length).toBeGreaterThan(0);
      },
      { timeout: 3000 },
    );
  });

  it("updates results as the user types a new search query", async () => {
    renderWithProviders(<SearchPageClient initialQuery="" initialCategory={null} />);

    await waitFor(() => expect(screen.getByText(/\d+ results?/)).toBeInTheDocument(), {
      timeout: 3000,
    });

    fireEvent.change(screen.getByPlaceholderText("What service do you need?"), {
      target: { value: "haircut" },
    });

    await waitFor(
      () => {
        expect(screen.getByText("Haircut & Styling")).toBeInTheDocument();
      },
      { timeout: 3000 },
    );
    expect(screen.queryByText("Quick Flow Plumbing")).not.toBeInTheDocument();
  });

  it("filters results when a category is selected", async () => {
    renderWithProviders(<SearchPageClient initialQuery="" initialCategory={null} />);

    await waitFor(() => expect(screen.getByText(/\d+ results?/)).toBeInTheDocument(), {
      timeout: 3000,
    });

    fireEvent.change(screen.getByLabelText("Category"), { target: { value: "beauty" } });

    await waitFor(
      () => {
        expect(screen.getAllByText("Glow Up Beauty Studio").length).toBeGreaterThan(0);
      },
      { timeout: 3000 },
    );
    expect(screen.queryByText("Quick Flow Plumbing")).not.toBeInTheDocument();
  });

  it("shows an empty state for a query that matches nothing", async () => {
    renderWithProviders(
      <SearchPageClient initialQuery="zzz-nonexistent-zzz" initialCategory={null} />,
    );

    await waitFor(
      () => {
        expect(screen.getByText("No results found")).toBeInTheDocument();
      },
      { timeout: 3000 },
    );
  });
});

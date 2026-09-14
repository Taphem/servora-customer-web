import { describe, expect, it } from "vitest";
import { render, screen } from "@testing-library/react";
import { Sparkles } from "lucide-react";
import { CategoryCard } from "./CategoryCard";
import type { Category } from "@/features/services/types";

const category: Category = {
  slug: "home-cleaning",
  name: "Home Cleaning",
  icon: Sparkles,
  description: "Standard, deep, and move-out cleans",
};

describe("CategoryCard", () => {
  it("renders the category name and description, linking to the given href", () => {
    render(<CategoryCard category={category} href="/search?category=home-cleaning" />);

    expect(screen.getByText("Home Cleaning")).toBeInTheDocument();
    expect(screen.getByText("Standard, deep, and move-out cleans")).toBeInTheDocument();
    expect(screen.getByRole("link")).toHaveAttribute("href", "/search?category=home-cleaning");
  });
});

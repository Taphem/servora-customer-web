import { describe, expect, it, vi } from "vitest";
import { render, screen } from "@testing-library/react";
import { BottomTabBar } from "./BottomTabBar";

let pathname = "/";
vi.mock("next/navigation", () => ({
  usePathname: () => pathname,
}));

describe("BottomTabBar", () => {
  it("renders every primary destination with a working link", () => {
    pathname = "/";
    render(<BottomTabBar />);

    expect(screen.getByRole("link", { name: /home/i })).toHaveAttribute("href", "/");
    expect(screen.getByRole("link", { name: /search/i })).toHaveAttribute("href", "/search");
    expect(screen.getByRole("link", { name: /bookings/i })).toHaveAttribute("href", "/bookings");
    expect(screen.getByRole("link", { name: /favorites/i })).toHaveAttribute("href", "/favorites");
    expect(screen.getByRole("link", { name: /profile/i })).toHaveAttribute("href", "/profile");
  });

  it("marks the active tab for the current route", () => {
    pathname = "/favorites";
    render(<BottomTabBar />);

    expect(screen.getByRole("link", { name: /favorites/i })).toHaveAttribute("aria-current", "page");
    expect(screen.getByRole("link", { name: /home/i })).not.toHaveAttribute("aria-current");
  });
});

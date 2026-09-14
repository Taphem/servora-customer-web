import { describe, expect, it, vi } from "vitest";
import { render, screen } from "@testing-library/react";
import { NavLink } from "./NavLink";

let pathname = "/";
vi.mock("next/navigation", () => ({
  usePathname: () => pathname,
}));

describe("NavLink", () => {
  it("marks the link as the current page when the pathname matches", () => {
    pathname = "/services";
    render(<NavLink href="/services" label="Services" />);
    expect(screen.getByRole("link", { name: "Services" })).toHaveAttribute(
      "aria-current",
      "page",
    );
  });

  it("does not mark unrelated links as current", () => {
    pathname = "/providers";
    render(<NavLink href="/services" label="Services" />);
    expect(
      screen.getByRole("link", { name: "Services" }),
    ).not.toHaveAttribute("aria-current");
  });
});

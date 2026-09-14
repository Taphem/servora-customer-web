import { describe, expect, it } from "vitest";
import { cn } from "./utils";

describe("cn", () => {
  it("merges class names and drops falsy values", () => {
    expect(cn("a", false, undefined, "b")).toBe("a b");
  });

  it("resolves conflicting Tailwind utilities, last one wins", () => {
    expect(cn("text-sm", "text-lg")).toBe("text-lg");
  });

  it("recognizes the app's custom text-scale tokens as font-size utilities", () => {
    expect(cn("text-h2", "text-text-primary")).toBe("text-h2 text-text-primary");
    expect(cn("text-h2", "text-h3")).toBe("text-h3");
  });
});

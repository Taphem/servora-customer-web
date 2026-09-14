import { clsx, type ClassValue } from "clsx";
import { extendTailwindMerge } from "tailwind-merge";

// Extends tailwind-merge with this app's named type-scale tokens
// (text-h1, text-body, …) — without this, tailwind-merge doesn't
// recognize them as font-size utilities and drops one whenever a
// text-color class appears alongside it in the same cn() call.
const customTwMerge = extendTailwindMerge({
  extend: {
    classGroups: {
      "font-size": [
        {
          text: [
            "display",
            "h1",
            "h2",
            "h3",
            "h4",
            "body",
            "small",
            "label",
            "caption",
          ],
        },
      ],
    },
  },
});

export function cn(...inputs: ClassValue[]) {
  return customTwMerge(clsx(inputs));
}

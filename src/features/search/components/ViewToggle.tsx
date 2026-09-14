"use client";

import { List, Map as MapIcon } from "lucide-react";
import { cn } from "@/lib/utils";
import type { ViewMode } from "@/features/search/types";

interface ViewToggleProps {
  viewMode: ViewMode;
  onChange: (mode: ViewMode) => void;
}

const OPTIONS: { mode: ViewMode; label: string; icon: typeof List }[] = [
  { mode: "list", label: "List", icon: List },
  { mode: "map", label: "Map", icon: MapIcon },
];

export function ViewToggle({ viewMode, onChange }: ViewToggleProps) {
  return (
    <div
      role="group"
      aria-label="Results view"
      className="inline-flex items-center rounded-(--radius-md) border border-border-default bg-surface-raised p-1"
    >
      {OPTIONS.map(({ mode, label, icon: Icon }) => {
        const isActive = viewMode === mode;
        return (
          <button
            key={mode}
            type="button"
            aria-pressed={isActive}
            onClick={() => onChange(mode)}
            className={cn(
              "flex items-center gap-1.5 rounded-(--radius-sm) px-3 py-1.5 text-small font-medium transition-colors duration-(--duration-hover)",
              isActive
                ? "bg-primary-soft text-text-brand"
                : "text-text-secondary hover:text-text-primary",
            )}
          >
            <Icon size={15} aria-hidden />
            {label}
          </button>
        );
      })}
    </div>
  );
}

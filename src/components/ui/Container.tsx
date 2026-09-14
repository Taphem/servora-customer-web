import type { HTMLAttributes } from "react";
import { cn } from "@/lib/utils";

export function Container({ className, ...rest }: HTMLAttributes<HTMLDivElement>) {
  return <div className={cn("container-servora", className)} {...rest} />;
}

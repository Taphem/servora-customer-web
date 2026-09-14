import type { ReactNode } from "react";
import { Container } from "@/components/ui/Container";
import { Badge } from "@/components/ui/Badge";

interface PlaceholderPageProps {
  icon: ReactNode;
  eyebrow: string;
  title: string;
  description: string;
  children?: ReactNode;
}

/**
 * The shared shell every foundation-milestone route renders through, so
 * navigating between them proves out routing/layout consistently instead
 * of each page hand-rolling its own header markup.
 */
export function PlaceholderPage({
  icon,
  eyebrow,
  title,
  description,
  children,
}: PlaceholderPageProps) {
  return (
    <Container className="py-12 sm:py-16">
      <div className="flex max-w-2xl flex-col gap-4">
        <div className="flex h-12 w-12 items-center justify-center rounded-(--radius-lg) bg-primary-soft text-primary">
          {icon}
        </div>
        <Badge variant="brand">{eyebrow}</Badge>
        <h1 className="text-h1 font-display text-text-primary">{title}</h1>
        <p className="text-body text-text-secondary">{description}</p>
      </div>
      {children ? <div className="mt-10">{children}</div> : null}
    </Container>
  );
}

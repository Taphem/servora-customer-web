import Link from "next/link";
import type { Category } from "@/features/services/types";

interface CategoryCardProps {
  category: Category;
  href: string;
}

export function CategoryCard({ category, href }: CategoryCardProps) {
  const Icon = category.icon;

  return (
    <Link
      href={href}
      className="group flex flex-col gap-3 rounded-(--radius-lg) border border-border-default bg-surface-raised p-5 transition-shadow duration-(--duration-hover) hover:border-border-strong hover:shadow-sm"
    >
      <div className="flex h-11 w-11 items-center justify-center rounded-(--radius-md) bg-primary-soft text-primary">
        <Icon size={20} aria-hidden />
      </div>
      <div>
        <p className="text-h4 text-text-primary">{category.name}</p>
        <p className="mt-0.5 text-small text-text-secondary">{category.description}</p>
      </div>
    </Link>
  );
}

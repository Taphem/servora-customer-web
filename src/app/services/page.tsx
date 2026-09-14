import { Container } from "@/components/ui/Container";
import { Badge } from "@/components/ui/Badge";
import { SearchEntry } from "@/components/layout/SearchEntry";
import { CategoryGrid } from "@/features/services/components/CategoryGrid";

export default function ServicesPage() {
  return (
    <Container className="py-10 sm:py-12">
      <div className="flex flex-col gap-3">
        <Badge variant="brand">Services</Badge>
        <h1 className="text-h2 font-display text-text-primary">Browse services by category</h1>
        <p className="max-w-xl text-body text-text-secondary">
          Pick a category to find services near you, or search directly.
        </p>
      </div>

      <div className="mt-6 max-w-md">
        <SearchEntry />
      </div>

      <div className="mt-10">
        <CategoryGrid headingId="all-categories-heading" title="All categories" />
      </div>
    </Container>
  );
}

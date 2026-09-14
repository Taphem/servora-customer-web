import { Container } from "@/components/ui/Container";
import { HeroSearch } from "@/features/home/components/HeroSearch";
import { CategoryGrid } from "@/features/services/components/CategoryGrid";
import { RecommendedServices } from "@/features/home/components/RecommendedServices";
import { FeaturedProviders } from "@/features/home/components/FeaturedProviders";

export default function HomePage() {
  return (
    <Container className="flex flex-col gap-14 py-10 sm:gap-16 sm:py-12">
      <HeroSearch />
      <CategoryGrid
        headingId="popular-categories-heading"
        title="Popular categories"
        description="Browse services by category"
      />
      <RecommendedServices />
      <FeaturedProviders />
    </Container>
  );
}

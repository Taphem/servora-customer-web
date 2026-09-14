import { Heart } from "lucide-react";
import { PlaceholderPage } from "@/components/layout/PlaceholderPage";
import { EmptyState } from "@/components/ui/EmptyState";

export default function FavoritesPage() {
  return (
    <PlaceholderPage
      icon={<Heart size={22} aria-hidden />}
      eyebrow="Favorites"
      title="Your favorites"
      description="Saving services and providers isn't implemented yet — this route exists so navigation and layout can be verified ahead of that feature."
    >
      <EmptyState
        icon={<Heart size={28} aria-hidden />}
        title="No favorites yet"
        description="Services and providers you save will appear here."
      />
    </PlaceholderPage>
  );
}

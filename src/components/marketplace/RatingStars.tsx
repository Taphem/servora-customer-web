import { Star } from "lucide-react";
import { cn } from "@/lib/utils";

interface RatingStarsProps {
  rating: number;
  reviewCount: number;
  className?: string;
}

export function RatingStars({ rating, reviewCount, className }: RatingStarsProps) {
  return (
    <div
      className={cn("flex items-center gap-1 text-small text-text-secondary", className)}
      aria-label={`Rated ${rating.toFixed(1)} out of 5, from ${reviewCount} review${reviewCount === 1 ? "" : "s"}`}
    >
      <Star size={14} className="shrink-0 fill-accent-400 text-accent-400" aria-hidden />
      <span className="font-medium text-text-primary">{rating.toFixed(1)}</span>
      <span aria-hidden>·</span>
      <span>
        {reviewCount} review{reviewCount === 1 ? "" : "s"}
      </span>
    </div>
  );
}

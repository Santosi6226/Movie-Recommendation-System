import { Star } from "lucide-react";
import { useState } from "react";
import { cn } from "@/lib/utils";

interface StarRatingProps {
  rating: number;
  onRate?: (rating: number) => void;
  size?: "sm" | "md" | "lg";
  readonly?: boolean;
}

const sizes = {
  sm: "w-4 h-4",
  md: "w-5 h-5",
  lg: "w-6 h-6",
};

export function StarRating({
  rating,
  onRate,
  size = "md",
  readonly = false,
}: StarRatingProps) {
  const [hoverRating, setHoverRating] = useState(0);
  const displayRating = hoverRating || rating;

  return (
    <div
      className="flex gap-0.5"
      onMouseLeave={() => !readonly && setHoverRating(0)}
    >
      {[1, 2, 3, 4, 5].map((star) => (
        <button
          key={star}
          type="button"
          disabled={readonly}
          className={cn(
            "transition-all duration-150",
            !readonly && "hover:scale-110 cursor-pointer",
            readonly && "cursor-default"
          )}
          onMouseEnter={() => !readonly && setHoverRating(star)}
          onClick={() => onRate?.(star)}
        >
          <Star
            className={cn(
              sizes[size],
              "transition-colors duration-150",
              star <= displayRating
                ? "fill-star-gold text-star-gold"
                : "fill-transparent text-star-empty"
            )}
          />
        </button>
      ))}
    </div>
  );
}

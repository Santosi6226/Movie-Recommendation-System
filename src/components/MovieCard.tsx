import { Movie } from "@/data/movies";
import { StarRating } from "./StarRating";
import { cn } from "@/lib/utils";

interface MovieCardProps {
  movie: Movie;
  userRating: number;
  onRate: (rating: number) => void;
  className?: string;
  style?: React.CSSProperties;
  yourRatingText: string;
}

export function MovieCard({
  movie,
  userRating,
  onRate,
  className,
  style,
  yourRatingText,
}: MovieCardProps) {
  return (
    <div
      className={cn(
        "group relative rounded-lg overflow-hidden gradient-card border border-border/50",
        "hover:border-primary/50 hover:glow-primary transition-all duration-300",
        "opacity-0 animate-fade-in",
        className
      )}
      style={style}
    >
      {/* Poster */}
      <div className="aspect-[2/3] overflow-hidden">
        <img
          src={movie.poster}
          alt={movie.title}
          className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-card via-card/20 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
      </div>

      {/* Content */}
      <div className="p-4 space-y-3">
        <div>
          <h3 className="font-semibold text-foreground truncate group-hover:text-primary transition-colors">
            {movie.title}
          </h3>
          <p className="text-sm text-muted-foreground">{movie.year}</p>
        </div>

        {/* Genres */}
        <div className="flex flex-wrap gap-1.5">
          {movie.genres.slice(0, 2).map((genre) => (
            <span
              key={genre}
              className="px-2 py-0.5 text-xs rounded-full bg-muted text-muted-foreground"
            >
              {genre}
            </span>
          ))}
          {movie.genres.length > 2 && (
            <span className="px-2 py-0.5 text-xs rounded-full bg-muted text-muted-foreground">
              +{movie.genres.length - 2}
            </span>
          )}
        </div>

        {/* Rating Section */}
        <div className="pt-2 border-t border-border/50">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-1.5">
              <span className="text-xs text-muted-foreground">IMDb</span>
              <span className="text-sm font-medium text-primary">
                {movie.rating.toFixed(1)}
              </span>
            </div>
          </div>

          {/* User Rating */}
          <div className="mt-2">
            <p className="text-xs text-muted-foreground mb-1">{yourRatingText}</p>
            <StarRating rating={userRating} onRate={onRate} size="sm" />
          </div>
        </div>
      </div>
    </div>
  );
}

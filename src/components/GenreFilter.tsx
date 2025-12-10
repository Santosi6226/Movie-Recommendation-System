import { genres, Genre } from "@/data/movies";
import { cn } from "@/lib/utils";

interface GenreFilterProps {
  selectedGenres: Genre[];
  onToggle: (genre: Genre) => void;
  onClear: () => void;
}

export function GenreFilter({ selectedGenres, onToggle, onClear }: GenreFilterProps) {
  return (
    <div className="space-y-3">
      <div className="flex items-center justify-between">
        <h3 className="text-sm font-medium text-foreground">Filter by Genre</h3>
        {selectedGenres.length > 0 && (
          <button
            onClick={onClear}
            className="text-xs text-secondary hover:text-secondary/80 transition-colors"
          >
            Clear all
          </button>
        )}
      </div>
      <div className="flex flex-wrap gap-2">
        {genres.map((genre) => {
          const isSelected = selectedGenres.includes(genre);
          return (
            <button
              key={genre}
              onClick={() => onToggle(genre)}
              className={cn(
                "px-3 py-1.5 text-sm rounded-full transition-all duration-200",
                isSelected
                  ? "bg-secondary text-secondary-foreground glow-secondary"
                  : "bg-muted text-muted-foreground hover:bg-muted/80 hover:text-foreground"
              )}
            >
              {genre}
            </button>
          );
        })}
      </div>
    </div>
  );
}

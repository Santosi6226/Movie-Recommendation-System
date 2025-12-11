import { cn } from "@/lib/utils";
import { Film } from "lucide-react";

const movieLanguages = [
  "Hindi",
  "Tamil",
  "Telugu",
  "Kannada",
  "Malayalam",
  "Marathi",
] as const;

export type MovieLanguage = (typeof movieLanguages)[number];

interface LanguageFilterProps {
  selectedLanguages: MovieLanguage[];
  onToggle: (language: MovieLanguage) => void;
  onClear: () => void;
  filterByLanguageText: string;
  clearAllText: string;
}

export function LanguageFilter({
  selectedLanguages,
  onToggle,
  onClear,
  filterByLanguageText,
  clearAllText,
}: LanguageFilterProps) {
  return (
    <div className="gradient-card rounded-xl p-5 border border-border/50">
      <div className="flex items-center gap-2 mb-4">
        <Film className="h-5 w-5 text-primary" />
        <h3 className="font-semibold text-foreground">{filterByLanguageText}</h3>
      </div>

      <div className="flex flex-wrap gap-2">
        {movieLanguages.map((language) => (
          <button
            key={language}
            onClick={() => onToggle(language)}
            className={cn(
              "px-3 py-1.5 text-sm rounded-full transition-all duration-200",
              "border hover:scale-105",
              selectedLanguages.includes(language)
                ? "bg-primary text-primary-foreground border-primary"
                : "bg-muted/50 text-muted-foreground border-border hover:border-primary/50 hover:text-foreground"
            )}
          >
            {language}
          </button>
        ))}
      </div>

      {selectedLanguages.length > 0 && (
        <button
          onClick={onClear}
          className="mt-4 text-sm text-primary hover:text-primary/80 transition-colors"
        >
          {clearAllText}
        </button>
      )}
    </div>
  );
}

export { movieLanguages };

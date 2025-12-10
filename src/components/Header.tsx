import { Film, RotateCcw } from "lucide-react";
import { Button } from "./ui/button";
import { LanguageSelector } from "./LanguageSelector";
import { LanguageCode } from "@/lib/i18n";

interface HeaderProps {
  ratedCount: number;
  onClearRatings: () => void;
  appName: string;
  tagline: string;
  moviesRatedText: string;
  movieRatedText: string;
  resetText: string;
  currentLanguage: LanguageCode;
  onLanguageChange: (lang: LanguageCode) => void;
}

export function Header({
  ratedCount,
  onClearRatings,
  appName,
  tagline,
  moviesRatedText,
  movieRatedText,
  resetText,
  currentLanguage,
  onLanguageChange,
}: HeaderProps) {
  return (
    <header className="border-b border-border/50 bg-card/50 backdrop-blur-sm sticky top-0 z-50">
      <div className="container mx-auto px-4 py-4">
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-3">
            <div className="p-2 rounded-lg bg-primary/10">
              <Film className="w-6 h-6 text-primary" />
            </div>
            <div>
              <h1 className="text-xl font-bold text-foreground">{appName}</h1>
              <p className="text-xs text-muted-foreground">{tagline}</p>
            </div>
          </div>

          <div className="flex items-center gap-3">
            <LanguageSelector
              currentLanguage={currentLanguage}
              onLanguageChange={onLanguageChange}
            />

            {ratedCount > 0 && (
              <div className="hidden sm:flex items-center gap-2 px-3 py-1.5 rounded-full bg-muted">
                <span className="text-sm text-muted-foreground">
                  {ratedCount} {ratedCount !== 1 ? moviesRatedText : movieRatedText}
                </span>
              </div>
            )}

            {ratedCount > 0 && (
              <Button
                variant="ghost"
                size="sm"
                onClick={onClearRatings}
                className="text-muted-foreground hover:text-destructive"
              >
                <RotateCcw className="w-4 h-4 mr-1.5" />
                {resetText}
              </Button>
            )}
          </div>
        </div>
      </div>
    </header>
  );
}

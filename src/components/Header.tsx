import { Film, RotateCcw } from "lucide-react";
import { Button } from "./ui/button";

interface HeaderProps {
  ratedCount: number;
  onClearRatings: () => void;
}

export function Header({ ratedCount, onClearRatings }: HeaderProps) {
  return (
    <header className="border-b border-border/50 bg-card/50 backdrop-blur-sm sticky top-0 z-50">
      <div className="container mx-auto px-4 py-4">
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-3">
            <div className="p-2 rounded-lg bg-primary/10">
              <Film className="w-6 h-6 text-primary" />
            </div>
            <div>
              <h1 className="text-xl font-bold text-foreground">CineMatch</h1>
              <p className="text-xs text-muted-foreground">
                Movie Recommendations
              </p>
            </div>
          </div>

          <div className="flex items-center gap-4">
            {ratedCount > 0 && (
              <div className="hidden sm:flex items-center gap-2 px-3 py-1.5 rounded-full bg-muted">
                <span className="text-sm text-muted-foreground">
                  {ratedCount} movie{ratedCount !== 1 ? "s" : ""} rated
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
                Reset
              </Button>
            )}
          </div>
        </div>
      </div>
    </header>
  );
}

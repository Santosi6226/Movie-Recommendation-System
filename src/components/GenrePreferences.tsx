import { getGenrePreferences } from "@/lib/recommendations";
import { UserRatings } from "@/hooks/useRatings";
import { TrendingUp } from "lucide-react";

interface GenrePreferencesProps {
  ratings: UserRatings;
}

export function GenrePreferences({ ratings }: GenrePreferencesProps) {
  const preferences = getGenrePreferences(ratings);
  
  if (preferences.length === 0) return null;

  const topPreferences = preferences.slice(0, 5);
  const maxScore = Math.max(...topPreferences.map((p) => p.score));

  return (
    <div className="p-4 rounded-lg gradient-card border border-border/50">
      <div className="flex items-center gap-2 mb-4">
        <TrendingUp className="w-4 h-4 text-secondary" />
        <h3 className="text-sm font-medium text-foreground">Your Taste Profile</h3>
      </div>

      <div className="space-y-3">
        {topPreferences.map((pref) => (
          <div key={pref.genre} className="space-y-1">
            <div className="flex items-center justify-between text-sm">
              <span className="text-muted-foreground">{pref.genre}</span>
              <span className="text-primary font-medium">
                {pref.score.toFixed(1)}
              </span>
            </div>
            <div className="h-1.5 bg-muted rounded-full overflow-hidden">
              <div
                className="h-full bg-gradient-to-r from-secondary to-primary rounded-full transition-all duration-500"
                style={{ width: `${(pref.score / maxScore) * 100}%` }}
              />
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}

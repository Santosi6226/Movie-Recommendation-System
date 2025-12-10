import { Movie } from "@/data/movies";
import { MovieCard } from "./MovieCard";
import { Sparkles } from "lucide-react";

interface RecommendationSectionProps {
  recommendations: Movie[];
  getRating: (movieId: number) => number;
  onRate: (movieId: number, rating: number) => void;
  hasRatings: boolean;
  recommendedForYouText: string;
  popularMoviesText: string;
  basedOnRatingsText: string;
  rateToGetRecommendationsText: string;
  yourRatingText: string;
}

export function RecommendationSection({
  recommendations,
  getRating,
  onRate,
  hasRatings,
  recommendedForYouText,
  popularMoviesText,
  basedOnRatingsText,
  rateToGetRecommendationsText,
  yourRatingText,
}: RecommendationSectionProps) {
  if (recommendations.length === 0) return null;

  return (
    <section className="space-y-6">
      <div className="flex items-center gap-3">
        <div className="p-2 rounded-lg bg-primary/10">
          <Sparkles className="w-5 h-5 text-primary" />
        </div>
        <div>
          <h2 className="text-xl font-semibold text-foreground">
            {hasRatings ? recommendedForYouText : popularMoviesText}
          </h2>
          <p className="text-sm text-muted-foreground">
            {hasRatings ? basedOnRatingsText : rateToGetRecommendationsText}
          </p>
        </div>
      </div>

      <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-6 gap-4">
        {recommendations.map((movie, index) => (
          <MovieCard
            key={movie.id}
            movie={movie}
            userRating={getRating(movie.id)}
            onRate={(rating) => onRate(movie.id, rating)}
            style={{ animationDelay: `${index * 50}ms` }}
            yourRatingText={yourRatingText}
          />
        ))}
      </div>
    </section>
  );
}

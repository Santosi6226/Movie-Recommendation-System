import { useState, useMemo } from "react";
import { movies, Genre } from "@/data/movies";
import { useRatings } from "@/hooks/useRatings";
import { getRecommendations } from "@/lib/recommendations";
import { Header } from "@/components/Header";
import { GenreFilter } from "@/components/GenreFilter";
import { MovieCard } from "@/components/MovieCard";
import { RecommendationSection } from "@/components/RecommendationSection";
import { GenrePreferences } from "@/components/GenrePreferences";
import { useToast } from "@/hooks/use-toast";

const Index = () => {
  const { ratings, rateMovie, getRating, clearRatings } = useRatings();
  const [selectedGenres, setSelectedGenres] = useState<Genre[]>([]);
  const { toast } = useToast();

  const ratedCount = Object.keys(ratings).length;
  const hasRatings = ratedCount > 0;

  const recommendations = useMemo(
    () => getRecommendations(ratings, 6),
    [ratings]
  );

  const filteredMovies = useMemo(() => {
    if (selectedGenres.length === 0) return movies;
    return movies.filter((movie) =>
      selectedGenres.some((genre) => movie.genres.includes(genre))
    );
  }, [selectedGenres]);

  const handleToggleGenre = (genre: Genre) => {
    setSelectedGenres((prev) =>
      prev.includes(genre)
        ? prev.filter((g) => g !== genre)
        : [...prev, genre]
    );
  };

  const handleClearGenres = () => {
    setSelectedGenres([]);
  };

  const handleRate = (movieId: number, rating: number) => {
    const movie = movies.find((m) => m.id === movieId);
    rateMovie(movieId, rating);
    toast({
      title: `Rated ${movie?.title}`,
      description: `You gave it ${rating} star${rating !== 1 ? "s" : ""}`,
    });
  };

  const handleClearRatings = () => {
    clearRatings();
    toast({
      title: "Ratings cleared",
      description: "All your ratings have been reset",
    });
  };

  return (
    <div className="min-h-screen gradient-cinema">
      <Header ratedCount={ratedCount} onClearRatings={handleClearRatings} />

      <main className="container mx-auto px-4 py-8 space-y-10">
        {/* Recommendations Section */}
        <RecommendationSection
          recommendations={recommendations}
          getRating={getRating}
          onRate={handleRate}
          hasRatings={hasRatings}
        />

        {/* Main Content Grid */}
        <div className="grid lg:grid-cols-[280px_1fr] gap-8">
          {/* Sidebar */}
          <aside className="space-y-6">
            <GenreFilter
              selectedGenres={selectedGenres}
              onToggle={handleToggleGenre}
              onClear={handleClearGenres}
            />

            {hasRatings && <GenrePreferences ratings={ratings} />}
          </aside>

          {/* Movie Grid */}
          <section className="space-y-6">
            <div className="flex items-center justify-between">
              <h2 className="text-xl font-semibold text-foreground">
                {selectedGenres.length > 0 ? "Filtered Movies" : "All Movies"}
              </h2>
              <span className="text-sm text-muted-foreground">
                {filteredMovies.length} movie{filteredMovies.length !== 1 ? "s" : ""}
              </span>
            </div>

            <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 xl:grid-cols-5 gap-4">
              {filteredMovies.map((movie, index) => (
                <MovieCard
                  key={movie.id}
                  movie={movie}
                  userRating={getRating(movie.id)}
                  onRate={(rating) => handleRate(movie.id, rating)}
                  style={{ animationDelay: `${index * 30}ms` }}
                />
              ))}
            </div>

            {filteredMovies.length === 0 && (
              <div className="text-center py-12">
                <p className="text-muted-foreground">
                  No movies match your filter. Try selecting different genres.
                </p>
              </div>
            )}
          </section>
        </div>
      </main>

      {/* Footer */}
      <footer className="border-t border-border/50 py-6 mt-12">
        <div className="container mx-auto px-4 text-center">
          <p className="text-sm text-muted-foreground">
            Rate movies to discover personalized recommendations
          </p>
        </div>
      </footer>
    </div>
  );
};

export default Index;

import { useState, useMemo } from "react";
import { movies, Genre } from "@/data/movies";
import { useRatings } from "@/hooks/useRatings";
import { useLanguage } from "@/hooks/useLanguage";
import { getRecommendations } from "@/lib/recommendations";
import { Header } from "@/components/Header";
import { GenreFilter } from "@/components/GenreFilter";
import { MovieCard } from "@/components/MovieCard";
import { RecommendationSection } from "@/components/RecommendationSection";
import { GenrePreferences } from "@/components/GenrePreferences";
import { useToast } from "@/hooks/use-toast";

const Index = () => {
  const { ratings, rateMovie, getRating, clearRatings } = useRatings();
  const { language, setLanguage, t } = useLanguage();
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
      title: `${t("rated")} ${movie?.title}`,
      description: `${t("youGaveIt")} ${rating} ${rating !== 1 ? t("stars") : t("star")}`,
    });
  };

  const handleClearRatings = () => {
    clearRatings();
    toast({
      title: t("ratingsCleared"),
      description: t("allRatingsReset"),
    });
  };

  return (
    <div className="min-h-screen gradient-cinema">
      <Header
        ratedCount={ratedCount}
        onClearRatings={handleClearRatings}
        appName={t("appName")}
        tagline={t("tagline")}
        moviesRatedText={t("moviesRated")}
        movieRatedText={t("movieRated")}
        resetText={t("reset")}
        currentLanguage={language}
        onLanguageChange={setLanguage}
      />

      <main className="container mx-auto px-4 py-8 space-y-10">
        {/* Recommendations Section */}
        <RecommendationSection
          recommendations={recommendations}
          getRating={getRating}
          onRate={handleRate}
          hasRatings={hasRatings}
          recommendedForYouText={t("recommendedForYou")}
          popularMoviesText={t("popularMovies")}
          basedOnRatingsText={t("basedOnRatings")}
          rateToGetRecommendationsText={t("rateToGetRecommendations")}
          yourRatingText={t("yourRating")}
        />

        {/* Main Content Grid */}
        <div className="grid lg:grid-cols-[280px_1fr] gap-8">
          {/* Sidebar */}
          <aside className="space-y-6">
            <GenreFilter
              selectedGenres={selectedGenres}
              onToggle={handleToggleGenre}
              onClear={handleClearGenres}
              filterByGenreText={t("filterByGenre")}
              clearAllText={t("clearAll")}
            />

            {hasRatings && (
              <GenrePreferences
                ratings={ratings}
                yourTasteProfileText={t("yourTasteProfile")}
              />
            )}
          </aside>

          {/* Movie Grid */}
          <section className="space-y-6">
            <div className="flex items-center justify-between">
              <h2 className="text-xl font-semibold text-foreground">
                {selectedGenres.length > 0 ? t("filteredMovies") : t("allMovies")}
              </h2>
              <span className="text-sm text-muted-foreground">
                {filteredMovies.length} {filteredMovies.length !== 1 ? t("movies") : t("movie")}
              </span>
            </div>

            <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 gap-4">
              {filteredMovies.map((movie, index) => (
                <MovieCard
                  key={movie.id}
                  movie={movie}
                  userRating={getRating(movie.id)}
                  onRate={(rating) => handleRate(movie.id, rating)}
                  style={{ animationDelay: `${index * 30}ms` }}
                  yourRatingText={t("yourRating")}
                />
              ))}
            </div>

            {filteredMovies.length === 0 && (
              <div className="text-center py-12">
                <p className="text-muted-foreground">{t("noMoviesMatch")}</p>
              </div>
            )}
          </section>
        </div>
      </main>

      {/* Footer */}
      <footer className="border-t border-border/50 py-6 mt-12">
        <div className="container mx-auto px-4 text-center">
          <p className="text-sm text-muted-foreground">
            {t("rateMoviesToDiscover")}
          </p>
        </div>
      </footer>
    </div>
  );
};

export default Index;

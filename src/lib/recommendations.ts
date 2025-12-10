import { Movie, movies, Genre } from "@/data/movies";
import { UserRatings } from "@/hooks/useRatings";

interface GenreScore {
  genre: Genre;
  score: number;
  count: number;
}

export function getGenrePreferences(ratings: UserRatings): GenreScore[] {
  const genreScores: Record<string, { total: number; count: number }> = {};

  Object.entries(ratings).forEach(([movieIdStr, rating]) => {
    const movieId = parseInt(movieIdStr);
    const movie = movies.find((m) => m.id === movieId);
    if (!movie) return;

    movie.genres.forEach((genre) => {
      if (!genreScores[genre]) {
        genreScores[genre] = { total: 0, count: 0 };
      }
      genreScores[genre].total += rating;
      genreScores[genre].count += 1;
    });
  });

  return Object.entries(genreScores)
    .map(([genre, { total, count }]) => ({
      genre: genre as Genre,
      score: total / count,
      count,
    }))
    .sort((a, b) => b.score - a.score);
}

export function getRecommendations(
  ratings: UserRatings,
  count: number = 6
): Movie[] {
  const ratedMovieIds = new Set(Object.keys(ratings).map(Number));
  const unratedMovies = movies.filter((m) => !ratedMovieIds.has(m.id));

  if (Object.keys(ratings).length === 0) {
    // No ratings yet, return top-rated movies
    return [...unratedMovies].sort((a, b) => b.rating - a.rating).slice(0, count);
  }

  const genrePrefs = getGenrePreferences(ratings);
  const genreWeights: Record<string, number> = {};
  
  genrePrefs.forEach((pref, index) => {
    // Weight based on average rating and position
    genreWeights[pref.genre] = pref.score * (1 - index * 0.1);
  });

  // Score each unrated movie based on genre match
  const scoredMovies = unratedMovies.map((movie) => {
    let score = 0;
    let matchedGenres = 0;

    movie.genres.forEach((genre) => {
      if (genreWeights[genre]) {
        score += genreWeights[genre];
        matchedGenres++;
      }
    });

    // Normalize by number of matched genres and boost by movie's own rating
    const normalizedScore = matchedGenres > 0 
      ? (score / matchedGenres) * 0.7 + movie.rating * 0.3
      : movie.rating;

    return { movie, score: normalizedScore };
  });

  return scoredMovies
    .sort((a, b) => b.score - a.score)
    .slice(0, count)
    .map((item) => item.movie);
}

export function getSimilarMovies(movie: Movie, count: number = 4): Movie[] {
  const otherMovies = movies.filter((m) => m.id !== movie.id);

  const scoredMovies = otherMovies.map((other) => {
    const sharedGenres = movie.genres.filter((g) => other.genres.includes(g));
    const similarity = sharedGenres.length / Math.max(movie.genres.length, other.genres.length);
    return { movie: other, score: similarity };
  });

  return scoredMovies
    .filter((item) => item.score > 0)
    .sort((a, b) => b.score - a.score)
    .slice(0, count)
    .map((item) => item.movie);
}

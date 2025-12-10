import { useState, useEffect, useCallback } from "react";

export interface UserRatings {
  [movieId: number]: number;
}

const STORAGE_KEY = "movie-ratings";

export function useRatings() {
  const [ratings, setRatings] = useState<UserRatings>({});

  useEffect(() => {
    const stored = localStorage.getItem(STORAGE_KEY);
    if (stored) {
      try {
        setRatings(JSON.parse(stored));
      } catch {
        setRatings({});
      }
    }
  }, []);

  const rateMovie = useCallback((movieId: number, rating: number) => {
    setRatings((prev) => {
      const updated = { ...prev, [movieId]: rating };
      localStorage.setItem(STORAGE_KEY, JSON.stringify(updated));
      return updated;
    });
  }, []);

  const getRating = useCallback(
    (movieId: number) => ratings[movieId] || 0,
    [ratings]
  );

  const clearRatings = useCallback(() => {
    setRatings({});
    localStorage.removeItem(STORAGE_KEY);
  }, []);

  return { ratings, rateMovie, getRating, clearRatings };
}

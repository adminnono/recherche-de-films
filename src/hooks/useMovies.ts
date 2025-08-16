import { useState, useCallback } from 'react';
import { Movie, MovieSearchResponse } from '../types/movie';

const API_KEY = 'ed82f4c18f2964e75117c2dc65e2161d';
const BASE_URL = 'https://api.themoviedb.org/3';

export const useMovies = () => {
  const [movies, setMovies] = useState<Movie[]>([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const searchMovies = useCallback(async (query: string) => {
    if (!query.trim()) {
      setMovies([]);
      return;
    }

    setLoading(true);
    setError(null);

    try {
      const response = await fetch(
        `${BASE_URL}/search/movie?api_key=${API_KEY}&query=${encodeURIComponent(query)}&language=fr-FR`
      );

      if (!response.ok) {
        throw new Error('Erreur lors de la recherche des films');
      }

      const data: MovieSearchResponse = await response.json();
      setMovies(data.results);
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Une erreur est survenue');
      setMovies([]);
    } finally {
      setLoading(false);
    }
  }, []);

  return {
    movies,
    loading,
    error,
    searchMovies,
  };
};
import { useState, useCallback } from 'react';

export interface MovieDetails {
  id: number;
  title: string;
  poster_path: string | null;
  backdrop_path: string | null;
  overview: string;
  release_date: string;
  vote_average: number;
  vote_count: number;
  runtime: number | null;
  genres: { id: number; name: string }[];
  production_companies: { id: number; name: string; logo_path: string | null }[];
  original_language: string;
  original_title: string;
  popularity: number;
  budget: number;
  revenue: number;
  status: string;
  tagline: string;
}

const API_KEY = 'ed82f4c18f2964e75117c2dc65e2161d';
const BASE_URL = 'https://api.themoviedb.org/3';

export const useMovieDetails = () => {
  const [movieDetails, setMovieDetails] = useState<MovieDetails | null>(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const fetchMovieDetails = useCallback(async (movieId: number) => {
    setLoading(true);
    setError(null);

    try {
      const response = await fetch(
        `${BASE_URL}/movie/${movieId}?api_key=${API_KEY}&language=fr-FR`
      );

      if (!response.ok) {
        throw new Error('Erreur lors du chargement des détails du film');
      }

      const data: MovieDetails = await response.json();
      setMovieDetails(data);
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Une erreur est survenue');
      setMovieDetails(null);
    } finally {
      setLoading(false);
    }
  }, []);

  const clearMovieDetails = useCallback(() => {
    setMovieDetails(null);
    setError(null);
  }, []);

  return {
    movieDetails,
    loading,
    error,
    fetchMovieDetails,
    clearMovieDetails,
  };
};
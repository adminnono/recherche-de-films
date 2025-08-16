import { useState, useCallback, useEffect } from 'react';
import { Movie } from '../types/movie';

const FAVORITES_KEY = 'movie-favorites';

export const useFavorites = () => {
  const [favorites, setFavorites] = useState<Movie[]>([]);

  // Charger les favoris depuis le localStorage au démarrage
  useEffect(() => {
    const savedFavorites = localStorage.getItem(FAVORITES_KEY);
    if (savedFavorites) {
      try {
        setFavorites(JSON.parse(savedFavorites));
      } catch (error) {
        console.error('Erreur lors du chargement des favoris:', error);
      }
    }
  }, []);

  // Sauvegarder les favoris dans le localStorage
  useEffect(() => {
    localStorage.setItem(FAVORITES_KEY, JSON.stringify(favorites));
  }, [favorites]);

  const addToFavorites = useCallback((movie: Movie) => {
    setFavorites((prev) => [...prev, movie]);
  }, []);

  const removeFromFavorites = useCallback((movieId: number) => {
    setFavorites((prev) => prev.filter((movie) => movie.id !== movieId));
  }, []);

  const isFavorite = useCallback(
    (movieId: number) => {
      return favorites.some((movie) => movie.id === movieId);
    },
    [favorites]
  );

  const toggleFavorite = useCallback(
    (movie: Movie) => {
      if (isFavorite(movie.id)) {
        removeFromFavorites(movie.id);
      } else {
        addToFavorites(movie);
      }
    },
    [isFavorite, addToFavorites, removeFromFavorites]
  );

  return {
    favorites,
    addToFavorites,
    removeFromFavorites,
    isFavorite,
    toggleFavorite,
  };
};
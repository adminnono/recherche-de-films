import React from 'react';
import { Heart, Film } from 'lucide-react';
import { Movie } from '../types/movie';
import { MovieCard } from './MovieCard';

interface FavoritesListProps {
  favorites: Movie[];
  onToggleFavorite: (movie: Movie) => void;
  onMovieClick: (movie: Movie) => void;
}

export const FavoritesList: React.FC<FavoritesListProps> = ({
  favorites,
  onToggleFavorite,
  onMovieClick,
}) => {
  if (favorites.length === 0) {
    return (
      <div className="text-center py-12">
        <div className="inline-flex items-center justify-center w-16 h-16 bg-white/10 rounded-full mb-4">
          <Heart className="w-8 h-8 text-gray-400" />
        </div>
        <h3 className="text-xl font-semibold text-white mb-2">
          Aucun film favoris
        </h3>
        <p className="text-gray-300">
          Recherchez des films et ajoutez-les à vos coups de cœur !
        </p>
      </div>
    );
  }

  return (
    <div className="space-y-6">
      <div className="flex items-center space-x-2 text-white">
        <Film className="w-6 h-6 text-red-500" />
        <h2 className="text-2xl font-bold">
          Mes coups de cœur ({favorites.length})
        </h2>
      </div>
      
      <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 gap-6">
        {favorites.map((movie) => (
          <MovieCard
            key={movie.id}
            movie={movie}
            isFavorite={true}
            onToggleFavorite={onToggleFavorite}
            onMovieClick={onMovieClick}
          />
        ))}
      </div>
    </div>
  );
};
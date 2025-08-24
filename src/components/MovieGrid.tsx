import React from "react";
import { Film, Search as SearchIcon } from "lucide-react";
import { Movie } from "../types/movie";
import { MovieCard } from "./MovieCard";

interface MovieGridProps {
  movies: Movie[];
  searchQuery: string;
  loading: boolean;
  error: string | null;
  isFavorite: (movieId: number) => boolean;
  onToggleFavorite: (movie: Movie) => void;
  onMovieClick: (movie: Movie) => void;
}

export const MovieGrid: React.FC<MovieGridProps> = ({
  movies,
  searchQuery,
  loading,
  error,
  isFavorite,
  onToggleFavorite,
  onMovieClick,
}) => {
  if (error) {
    return (
      <div className="text-center py-12">
        <div className="inline-flex items-center justify-center w-16 h-16 bg-red-500/20 rounded-full mb-4">
          <Film className="w-8 h-8 text-red-400" />
        </div>
        <h3 className="text-xl font-semibold text-white mb-2">
          Erreur de recherche
        </h3>
        <p className="text-gray-300">{error}</p>
      </div>
    );
  }

  if (!searchQuery && !loading) {
    return (
      <div className="text-center py-12">
        <div className="inline-flex items-center justify-center w-16 h-16 bg-white/10 rounded-full mb-4">
          <SearchIcon className="w-8 h-8 text-gray-400" />
        </div>
        <h3 className="text-xl font-semibold text-white mb-2">
          Découvrez vos films préférés
        </h3>
        <p className="text-gray-300">
          Utilisez la barre de recherche pour trouver des films incroyables
        </p>
      </div>
    );
  }

  if (loading) {
    return (
      <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 gap-6">
        {Array.from({ length: 10 }).map((_, index) => (
          <div
            key={index}
            className="bg-white/10 backdrop-blur-md rounded-2xl overflow-hidden border border-white/20 animate-pulse"
          >
            <div className="aspect-[2/3] bg-gray-600"></div>
            <div className="p-4 space-y-2">
              <div className="h-6 bg-gray-600 rounded"></div>
              <div className="h-4 bg-gray-600 rounded w-2/3"></div>
            </div>
          </div>
        ))}
      </div>
    );
  }

  if (movies.length === 0 && searchQuery) {
    return (
      <div className="text-center py-12">
        <div className="inline-flex items-center justify-center w-16 h-16 bg-white/10 rounded-full mb-4">
          <SearchIcon className="w-8 h-8 text-gray-400" />
        </div>
        <h3 className="text-xl font-semibold text-white mb-2">
          Aucun résultat trouvé
        </h3>
        <p className="text-gray-300">
          Essayez avec des mots-clés différents pour "{searchQuery}"
        </p>
      </div>
    );
  }

  return (
    <div className="space-y-6">
      {searchQuery && (
        <div className="flex items-center space-x-2 text-white">
          <SearchIcon className="w-6 h-6 text-blue-500" />
          <h2 className="text-2xl font-bold">
            Résultats pour "{searchQuery}" ({movies.length} films)
          </h2>
        </div>
      )}

      <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 gap-6">
        {movies.map((movie) => (
          <MovieCard
            key={movie.id}
            movie={movie}
            isFavorite={isFavorite(movie.id)}
            onToggleFavorite={onToggleFavorite}
            onMovieClick={onMovieClick}
          />
        ))}
      </div>
    </div>
  );
};

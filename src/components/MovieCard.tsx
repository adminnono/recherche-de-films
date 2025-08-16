import React from 'react';
import { Heart, Star, Calendar } from 'lucide-react';
import { Movie } from '../types/movie';

interface MovieCardProps {
  movie: Movie;
  isFavorite: boolean;
  onToggleFavorite: (movie: Movie) => void;
  onMovieClick: (movie: Movie) => void;
}

export const MovieCard: React.FC<MovieCardProps> = ({
  movie,
  isFavorite,
  onToggleFavorite,
  onMovieClick,
}) => {
  const posterUrl = movie.poster_path
    ? `https://image.tmdb.org/t/p/w500${movie.poster_path}`
    : '/placeholder-movie.jpg';

  const releaseYear = movie.release_date
    ? new Date(movie.release_date).getFullYear()
    : 'N/A';

  const rating = movie.vote_average ? movie.vote_average.toFixed(1) : '0.0';

  return (
    <div 
      className="group relative bg-white/10 backdrop-blur-md rounded-2xl overflow-hidden border border-white/20 hover:border-white/40 transition-all duration-300 hover:scale-105 hover:shadow-2xl cursor-pointer"
      onClick={() => onMovieClick(movie)}
    >
      {/* Image du film */}
      <div className="relative aspect-[2/3] overflow-hidden">
        <img
          src={posterUrl}
          alt={movie.title}
          className="w-full h-full object-cover transition-transform duration-300 group-hover:scale-110"
          onError={(e) => {
            const target = e.target as HTMLImageElement;
            target.src = 'https://via.placeholder.com/500x750/374151/9CA3AF?text=Film';
          }}
        />
        
        {/* Overlay avec informations */}
        <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300">
          <div className="absolute bottom-4 left-4 right-4">
            <p className="text-white text-sm leading-relaxed line-clamp-3">
              {movie.overview || 'Aucun résumé disponible.'}
            </p>
          </div>
        </div>

        {/* Bouton favori */}
        <button
          onClick={() => onToggleFavorite(movie)}
          onClick={(e) => {
            e.stopPropagation();
            onToggleFavorite(movie);
          }}
          className="absolute top-3 right-3 p-2 rounded-full bg-black/50 backdrop-blur-sm hover:bg-black/70 transition-all duration-200 group-hover:scale-110"
          aria-label={isFavorite ? 'Retirer des favoris' : 'Ajouter aux favoris'}
        >
          <Heart
            className={`w-5 h-5 transition-all duration-200 ${
              isFavorite
                ? 'text-red-500 fill-red-500'
                : 'text-white hover:text-red-400'
            }`}
          />
        </button>

        {/* Note */}
        {movie.vote_average > 0 && (
          <div className="absolute top-3 left-3 flex items-center space-x-1 bg-black/50 backdrop-blur-sm rounded-full px-2 py-1">
            <Star className="w-3 h-3 text-yellow-400 fill-yellow-400" />
            <span className="text-white text-xs font-medium">{rating}</span>
          </div>
        )}
      </div>

      {/* Informations du film */}
      <div className="p-4">
        <h3 className="text-white font-semibold text-lg mb-2 line-clamp-2 group-hover:text-blue-300 transition-colors duration-200">
          {movie.title}
        </h3>
        
        <div className="flex items-center justify-between text-gray-300 text-sm">
          <div className="flex items-center space-x-1">
            <Calendar className="w-4 h-4" />
            <span>{releaseYear}</span>
          </div>
          
          {movie.vote_count > 0 && (
            <span className="text-xs">
              {movie.vote_count} votes
            </span>
          )}
        </div>
      </div>
    </div>
  );
};
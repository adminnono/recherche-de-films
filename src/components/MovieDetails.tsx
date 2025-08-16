import React from 'react';
import { 
  ArrowLeft, 
  Star, 
  Calendar, 
  Clock, 
  Globe, 
  DollarSign,
  Heart,
  Play
} from 'lucide-react';
import { MovieDetails as MovieDetailsType } from '../hooks/useMovieDetails';

interface MovieDetailsProps {
  movie: MovieDetailsType;
  isFavorite: boolean;
  onToggleFavorite: () => void;
  onBack: () => void;
  loading: boolean;
}

export const MovieDetails: React.FC<MovieDetailsProps> = ({
  movie,
  isFavorite,
  onToggleFavorite,
  onBack,
  loading,
}) => {
  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="text-center">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-400 mx-auto mb-4"></div>
          <p className="text-white">Chargement des détails...</p>
        </div>
      </div>
    );
  }

  const posterUrl = movie.poster_path
    ? `https://image.tmdb.org/t/p/w500${movie.poster_path}`
    : null;

  const backdropUrl = movie.backdrop_path
    ? `https://image.tmdb.org/t/p/w1280${movie.backdrop_path}`
    : null;

  const releaseYear = movie.release_date
    ? new Date(movie.release_date).getFullYear()
    : 'N/A';

  const releaseDate = movie.release_date
    ? new Date(movie.release_date).toLocaleDateString('fr-FR')
    : 'Date inconnue';

  const rating = movie.vote_average ? movie.vote_average.toFixed(1) : '0.0';

  const formatCurrency = (amount: number) => {
    return new Intl.NumberFormat('fr-FR', {
      style: 'currency',
      currency: 'USD',
      minimumFractionDigits: 0,
    }).format(amount);
  };

  const formatRuntime = (minutes: number | null) => {
    if (!minutes) return 'Durée inconnue';
    const hours = Math.floor(minutes / 60);
    const mins = minutes % 60;
    return `${hours}h ${mins}min`;
  };

  return (
    <div className="min-h-screen">
      {/* Header avec backdrop */}
      <div className="relative h-96 overflow-hidden">
        {backdropUrl && (
          <img
            src={backdropUrl}
            alt={movie.title}
            className="w-full h-full object-cover"
          />
        )}
        <div className="absolute inset-0 bg-gradient-to-t from-gray-900 via-gray-900/60 to-transparent"></div>
        
        {/* Bouton retour */}
        <button
          onClick={onBack}
          className="absolute top-6 left-6 flex items-center space-x-2 bg-black/50 backdrop-blur-sm hover:bg-black/70 text-white px-4 py-2 rounded-xl transition-all duration-200"
        >
          <ArrowLeft className="w-5 h-5" />
          <span>Retour</span>
        </button>

        {/* Bouton favori */}
        <button
          onClick={onToggleFavorite}
          className="absolute top-6 right-6 p-3 rounded-full bg-black/50 backdrop-blur-sm hover:bg-black/70 transition-all duration-200"
        >
          <Heart
            className={`w-6 h-6 transition-all duration-200 ${
              isFavorite
                ? 'text-red-500 fill-red-500'
                : 'text-white hover:text-red-400'
            }`}
          />
        </button>
      </div>

      {/* Contenu principal */}
      <div className="container mx-auto px-4 py-8">
        <div className="flex flex-col lg:flex-row gap-8">
          {/* Poster */}
          <div className="lg:w-1/3">
            <div className="sticky top-8">
              {posterUrl ? (
                <img
                  src={posterUrl}
                  alt={movie.title}
                  className="w-full max-w-md mx-auto rounded-2xl shadow-2xl"
                />
              ) : (
                <div className="w-full max-w-md mx-auto aspect-[2/3] bg-gray-700 rounded-2xl flex items-center justify-center">
                  <Play className="w-16 h-16 text-gray-400" />
                </div>
              )}
            </div>
          </div>

          {/* Informations */}
          <div className="lg:w-2/3 space-y-6">
            {/* Titre et note */}
            <div>
              <h1 className="text-4xl font-bold text-white mb-2">
                {movie.title}
              </h1>
              {movie.original_title !== movie.title && (
                <p className="text-xl text-gray-300 mb-4">
                  {movie.original_title}
                </p>
              )}
              {movie.tagline && (
                <p className="text-lg text-blue-300 italic mb-4">
                  "{movie.tagline}"
                </p>
              )}
              
              <div className="flex items-center space-x-6 mb-6">
                <div className="flex items-center space-x-2">
                  <Star className="w-6 h-6 text-yellow-400 fill-yellow-400" />
                  <span className="text-2xl font-bold text-white">{rating}</span>
                  <span className="text-gray-300">({movie.vote_count} votes)</span>
                </div>
              </div>
            </div>

            {/* Informations rapides */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div className="bg-white/10 backdrop-blur-md rounded-xl p-4 border border-white/20">
                <div className="flex items-center space-x-2 text-gray-300 mb-2">
                  <Calendar className="w-5 h-5" />
                  <span className="font-medium">Date de sortie</span>
                </div>
                <p className="text-white text-lg">{releaseDate}</p>
              </div>

              {movie.runtime && (
                <div className="bg-white/10 backdrop-blur-md rounded-xl p-4 border border-white/20">
                  <div className="flex items-center space-x-2 text-gray-300 mb-2">
                    <Clock className="w-5 h-5" />
                    <span className="font-medium">Durée</span>
                  </div>
                  <p className="text-white text-lg">{formatRuntime(movie.runtime)}</p>
                </div>
              )}

              <div className="bg-white/10 backdrop-blur-md rounded-xl p-4 border border-white/20">
                <div className="flex items-center space-x-2 text-gray-300 mb-2">
                  <Globe className="w-5 h-5" />
                  <span className="font-medium">Langue originale</span>
                </div>
                <p className="text-white text-lg uppercase">{movie.original_language}</p>
              </div>

              <div className="bg-white/10 backdrop-blur-md rounded-xl p-4 border border-white/20">
                <div className="flex items-center space-x-2 text-gray-300 mb-2">
                  <span className="font-medium">Statut</span>
                </div>
                <p className="text-white text-lg">{movie.status}</p>
              </div>
            </div>

            {/* Genres */}
            {movie.genres && movie.genres.length > 0 && (
              <div>
                <h3 className="text-xl font-semibold text-white mb-3">Genres</h3>
                <div className="flex flex-wrap gap-2">
                  {movie.genres.map((genre) => (
                    <span
                      key={genre.id}
                      className="px-3 py-1 bg-blue-600/80 text-white rounded-full text-sm font-medium"
                    >
                      {genre.name}
                    </span>
                  ))}
                </div>
              </div>
            )}

            {/* Synopsis */}
            <div>
              <h3 className="text-xl font-semibold text-white mb-3">Synopsis</h3>
              <p className="text-gray-300 leading-relaxed text-lg">
                {movie.overview || 'Aucun synopsis disponible.'}
              </p>
            </div>

            {/* Informations financières */}
            {(movie.budget > 0 || movie.revenue > 0) && (
              <div>
                <h3 className="text-xl font-semibold text-white mb-3">Informations financières</h3>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  {movie.budget > 0 && (
                    <div className="bg-white/10 backdrop-blur-md rounded-xl p-4 border border-white/20">
                      <div className="flex items-center space-x-2 text-gray-300 mb-2">
                        <DollarSign className="w-5 h-5" />
                        <span className="font-medium">Budget</span>
                      </div>
                      <p className="text-white text-lg">{formatCurrency(movie.budget)}</p>
                    </div>
                  )}

                  {movie.revenue > 0 && (
                    <div className="bg-white/10 backdrop-blur-md rounded-xl p-4 border border-white/20">
                      <div className="flex items-center space-x-2 text-gray-300 mb-2">
                        <DollarSign className="w-5 h-5" />
                        <span className="font-medium">Recettes</span>
                      </div>
                      <p className="text-white text-lg">{formatCurrency(movie.revenue)}</p>
                    </div>
                  )}
                </div>
              </div>
            )}

            {/* Sociétés de production */}
            {movie.production_companies && movie.production_companies.length > 0 && (
              <div>
                <h3 className="text-xl font-semibold text-white mb-3">Production</h3>
                <div className="flex flex-wrap gap-3">
                  {movie.production_companies.map((company) => (
                    <div
                      key={company.id}
                      className="bg-white/10 backdrop-blur-md rounded-xl p-3 border border-white/20"
                    >
                      <span className="text-white text-sm">{company.name}</span>
                    </div>
                  ))}
                </div>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};
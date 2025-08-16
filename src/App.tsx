import React, { useState, useCallback } from "react";
import { Film, Heart, Search as SearchIcon } from "lucide-react";
import { SearchBar } from "./components/SearchBar";
import { MovieGrid } from "./components/MovieGrid";
import { FavoritesList } from "./components/FavoritesList";
import { MovieDetails } from "./components/MovieDetails";
import { useMovies } from "./hooks/useMovies";
import { useFavorites } from "./hooks/useFavorites";
import { useMovieDetails } from "./hooks/useMovieDetails";
import { Movie } from "./types/movie";

type ViewMode = "search" | "favorites" | "details";

function App() {
  const [viewMode, setViewMode] = useState<ViewMode>("search");
  const [searchQuery, setSearchQuery] = useState("");
  const { movies, loading, error, searchMovies } = useMovies();
  const { favorites, isFavorite, toggleFavorite } = useFavorites();
  const {
    movieDetails,
    loading: detailsLoading,
    fetchMovieDetails,
    clearMovieDetails,
  } = useMovieDetails();

  const handleSearch = useCallback(
    (query: string) => {
      setSearchQuery(query);
      searchMovies(query);
      if (query && viewMode === "favorites") {
        setViewMode("search");
      }
    },
    [searchMovies, viewMode]
  );

  const handleMovieClick = useCallback(
    (movie: Movie) => {
      fetchMovieDetails(movie.id);
      setViewMode("details");
    },
    [fetchMovieDetails]
  );

  const handleBackToSearch = useCallback(() => {
    clearMovieDetails();
    setViewMode("search");
  }, [clearMovieDetails]);

  const handleBackToFavorites = useCallback(() => {
    clearMovieDetails();
    setViewMode("favorites");
  }, [clearMovieDetails]);

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-900 via-blue-900 to-purple-900">
      {viewMode === "details" && movieDetails ? (
        <MovieDetails
          movie={movieDetails}
          isFavorite={isFavorite(movieDetails.id)}
          onToggleFavorite={() => toggleFavorite(movieDetails)}
          onBack={searchQuery ? handleBackToSearch : handleBackToFavorites}
          loading={detailsLoading}
        />
      ) : (
        <>
          {/* Header */}
          <header className="bg-black/20 backdrop-blur-md border-b border-white/10 sticky top-0 z-50">
            <div className="container mx-auto px-4 py-4">
              <div className="flex items-center justify-between">
                {/* Logo */}
                <div className="flex items-center space-x-2">
                  <div className="p-2 bg-gradient-to-r from-blue-500 to-purple-600 rounded-lg">
                    <Film className="w-8 h-8 text-white" />
                  </div>
                  <h1 className="text-2xl font-bold text-white">
                    Recherche de films
                  </h1>
                </div>

                {/* Navigation */}
                <nav className="flex space-x-4">
                  <button
                    onClick={() => setViewMode("search")}
                    className={`flex items-center space-x-2 px-4 py-2 rounded-xl transition-all duration-200 ${
                      viewMode === "search"
                        ? "bg-blue-600 text-white shadow-lg"
                        : "bg-white/10 text-gray-300 hover:bg-white/20 hover:text-white"
                    }`}
                  >
                    <SearchIcon className="w-5 h-5" />
                    <span>Recherche</span>
                  </button>

                  <button
                    onClick={() => setViewMode("favorites")}
                    className={`flex items-center space-x-2 px-4 py-2 rounded-xl transition-all duration-200 relative ${
                      viewMode === "favorites"
                        ? "bg-red-600 text-white shadow-lg"
                        : "bg-white/10 text-gray-300 hover:bg-white/20 hover:text-white"
                    }`}
                  >
                    <Heart className="w-5 h-5" />
                    <span>Favoris</span>
                    {favorites.length > 0 && (
                      <span className="absolute -top-1 -right-1 bg-red-500 text-white text-xs rounded-full w-5 h-5 flex items-center justify-center">
                        {favorites.length}
                      </span>
                    )}
                  </button>
                </nav>
              </div>
            </div>
          </header>

          {/* Main Content */}
          <main className="container mx-auto px-4 py-8">
            {viewMode === "search" && (
              <>
                <SearchBar onSearch={handleSearch} loading={loading} />
                <MovieGrid
                  movies={movies}
                  searchQuery={searchQuery}
                  loading={loading}
                  error={error}
                  isFavorite={isFavorite}
                  onToggleFavorite={toggleFavorite}
                  onMovieClick={handleMovieClick}
                />
              </>
            )}

            {viewMode === "favorites" && (
              <FavoritesList
                favorites={favorites}
                onToggleFavorite={toggleFavorite}
                onMovieClick={handleMovieClick}
              />
            )}
          </main>

          {/* Footer */}
          <footer className="bg-black/20 backdrop-blur-md border-t border-white/10 mt-16">
            <div className="container mx-auto px-4 py-6 text-center text-gray-300">
              <p>
                Réalisé par {""}
                <a
                  href="https://portfolio-arnaud-dujardin.vercel.app/"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-blue-400 hover:text-blue-300 transition-colors duration-200"
                >
                  Arnaud Dujardin
                </a>
              </p>
            </div>
          </footer>
        </>
      )}
    </div>
  );
}

export default App;

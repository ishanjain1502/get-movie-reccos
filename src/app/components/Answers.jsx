'use client';

import { useState, useEffect } from 'react';
import { getGenresFromAnswers, getMovieRecommendations } from '../utils/gemini';

const Answers = ({ answers }) => {
  const [genres, setGenres] = useState([]);
  const [movies, setMovies] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [selectedMovie, setSelectedMovie] = useState(null);
  const [imdbData, setImdbData] = useState(null);
  const [imdbLoading, setImdbLoading] = useState(false);

  useEffect(() => {
    const fetchData = async () => {
      try {
        setLoading(true);
        setError(null);
        
        // First get genres
        const suggestedGenres = await getGenresFromAnswers(answers);
        setGenres(suggestedGenres);
        
        // Then get movie recommendations
        const movieRecommendations = await getMovieRecommendations(suggestedGenres);
        let cleanedMovies = movieRecommendations.replace(/```json/g, '').replace(/```/g, '');
        const parsedMovies = JSON.parse(cleanedMovies);
        setMovies(parsedMovies);
      } catch (error) {
        console.error('Error fetching data:', error);
        setError('Failed to fetch recommendations. Please try again.');
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, [answers]);

  const fetchImdbData = async (movieTitle) => {
    try {
      setImdbLoading(true);
      setImdbData(null);
      setSelectedMovie(movieTitle);

      const response = await fetch(`/api/imdb?title=${encodeURIComponent(movieTitle)}`);
      const data = await response.json();

      if (!response.ok) {
        throw new Error(data.error || 'Failed to fetch IMDB data');
      }

      setImdbData(data);
    } catch (error) {
      console.error('Error fetching IMDB data:', error);
      setError('Failed to fetch IMDB data. Please try again.');
    } finally {
      setImdbLoading(false);
    }
  };

  const answerLabels = {
    type: 'Type',
    mood: 'Mood',
    era: 'Era'
  };

  return (
    <div className="mt-8 p-6 bg-white rounded-2xl shadow-xl border border-indigo-100">
      <h3 className="text-xl font-bold text-indigo-900 mb-4">Your Preferences</h3>
      <div className="space-y-4">
        {Object.entries(answers).map(([key, value]) => (
          <div key={key} className="flex items-center justify-between p-4 bg-indigo-50 rounded-xl">
            <span className="font-medium text-indigo-700">{answerLabels[key]}:</span>
            <span className="text-indigo-900">{value}</span>
          </div>
        ))}
      </div>

      <div className="mt-8">
        <h3 className="text-xl font-bold text-indigo-900 mb-4">Recommended Genres</h3>
        {loading ? (
          <div className="flex items-center justify-center p-4">
            <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-indigo-600"></div>
          </div>
        ) : (
          <div className="flex flex-wrap gap-2">
            {genres.map((genre, index) => (
              <span
                key={index}
                className="px-4 py-2 bg-indigo-100 text-indigo-800 rounded-full text-sm font-medium"
              >
                {genre}
              </span>
            ))}
          </div>
        )}
      </div>

      <div className="mt-8">
        <h3 className="text-xl font-bold text-indigo-900 mb-4">Recommended Movies & shows</h3>
        {loading ? (
          <div className="flex items-center justify-center p-4">
            <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-indigo-600"></div>
          </div>
        ) : error ? (
          <div className="text-red-600 p-4 bg-red-50 rounded-xl">{error}</div>
        ) : (
          <div className="grid gap-4">
            {movies.map((movie, index) => (
              <div key={index} className="p-4 bg-indigo-50 rounded-xl">
                <div className="flex justify-between items-start mb-2">
                  <div className="flex-1">
                    <h4 className="text-lg font-semibold text-indigo-900 mb-2">{movie.title}</h4>
                    <button
                      onClick={() => fetchImdbData(movie.title)}
                      className="text-sm px-3 py-1 bg-indigo-600 text-white rounded-lg hover:bg-indigo-700 transition-colors"
                    >
                      Get IMDB Info
                    </button>
                  </div>
                  <span className="px-2 py-1 bg-indigo-200 text-indigo-800 rounded text-sm">
                    {movie.rating}/10
                  </span>
                </div>
                <p className="text-indigo-700 mb-1">{movie.year}</p>
                <p className="text-indigo-600">{movie.description}</p>

                {selectedMovie === movie.title && imdbLoading && (
                  <div className="mt-4 flex items-center justify-center">
                    <div className="animate-spin rounded-full h-6 w-6 border-b-2 border-indigo-600"></div>
                  </div>
                )}

                {selectedMovie === movie.title && imdbData && (
                  <div className="mt-4 p-4 bg-white rounded-lg border border-indigo-200">
                    <div className="flex items-start gap-4">
                      {imdbData.posterUrl && (
                        <img 
                          src={imdbData.posterUrl} 
                          alt={imdbData.title} 
                          className="w-24 h-36 object-cover rounded-lg"
                        />
                      )}
                      <div className="flex-1">
                        <h5 className="font-semibold text-indigo-900">{imdbData.title}</h5>
                        <p className="text-sm text-indigo-700">{imdbData.year}</p>
                        <a 
                          href={imdbData.imdbUrl}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="inline-block mt-2 text-sm text-indigo-600 hover:text-indigo-800"
                        >
                          View on IMDB →
                        </a>
                      </div>
                    </div>
                  </div>
                )}
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
};

export default Answers; 
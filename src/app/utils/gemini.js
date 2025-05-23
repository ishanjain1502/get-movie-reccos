export async function getGenresFromAnswers(answers) {
  try {
    const response = await fetch('/api/gemini', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        action: 'getGenres',
        data: answers
      }),
    });

    if (!response.ok) {
      throw new Error('Failed to get genres');
    }

    const data = await response.json();
    return data.genres;
  } catch (error) {
    console.error('Error getting genres:', error);
    return ['Action', 'Comedy', 'Drama']; // Fallback genres
  }
}

export async function getMovieRecommendations(genres) {
  try {
    const response = await fetch('/api/gemini', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        action: 'getRecommendations',
        data: { genres }
      }),
    });

    if (!response.ok) {
      throw new Error('Failed to get recommendations');
    }

    const data = await response.json();
    return data.recommendations;
  } catch (error) {
    console.error('Error getting movie recommendations:', error);
    return []; // Return empty array on error
  }
} 
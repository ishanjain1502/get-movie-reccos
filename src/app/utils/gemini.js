import {GoogleGenAI} from '@google/genai';


const genAI = new GoogleGenAI({apiKey: process.env.NEXT_PUBLIC_GEMINI_API_KEY});

export async function getGenresFromAnswers(answers) {
  try {
    // const model = genAI.getGenerativeModel({ model: "gemini-2.0-flash-001" });

    const prompt = `Based on these preferences:
    Type: ${answers.type}
    Mood: ${answers.mood}
    Era: ${answers.era}
    
    Suggest 3-4 most suitable movie/show genres that would match these preferences. 
    Return only the genres in a comma-separated list, nothing else.`;

    const result = await genAI.models.generateContent({
        model: "gemini-2.0-flash-001",
        contents: prompt,
    });
    debugger
    const response = result;
    const genres = response.text;
    
    return genres.split(',').map(genre => genre.trim());


    
  } catch (error) {
    console.error('Error getting genres:', error);
    return ['Action', 'Comedy', 'Drama']; // Fallback genres
  }
}

export async function getMovieRecommendations(genres) {
  try {
    const prompt = `Give me 10 popular movies available on Netflix India in these genres: ${genres.join(', ')}.
    For each movie, provide:
    1. Title
    2. Year
    3. Brief description (one line)
    4. Rating (out of 10)
    
    Format the response as a JSON array of objects with these properties:
    {
      "title": "Movie Title",
      "year": "Year",
      "description": "Brief description",
      "rating": "Rating out of 10"
    }`;

    const result = await genAI.models.generateContent({
      model: "gemini-2.0-flash-001",
      contents: prompt,
    });

    const response = result.text;
    return response;
  } catch (error) {
    console.error('Error getting movie recommendations:', error);
    return []; // Return empty array on error
  }
} 
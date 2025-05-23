import { GoogleGenAI } from '@google/genai';

const genAI = new GoogleGenAI({ apiKey: process.env.GEMINI_API_KEY });

export async function POST(request) {
  try {
    const { action, data } = await request.json();

    if (action === 'getGenres') {
      const prompt = `Based on these preferences:
      Type: ${data.type}
      Mood: ${data.mood}
      Era: ${data.era}
      
      Suggest 3-4 most suitable movie/show genres that would match these preferences. 
      Return only the genres in a comma-separated list, nothing else.`;

      const result = await genAI.models.generateContent({
        model: "gemini-2.0-flash-001",
        contents: prompt,
      });

      const genres = result.text;
      return Response.json({ genres: genres.split(',').map(genre => genre.trim()) });
    }

    if (action === 'getRecommendations') {
      const prompt = `Give me 10 popular movies available on Netflix India in these genres: ${data.genres.join(', ')}.
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

      return Response.json({ recommendations: result.text });
    }

    return Response.json({ error: 'Invalid action' }, { status: 400 });
  } catch (error) {
    console.error('Error in Gemini API:', error);
    return Response.json({ error: 'Internal server error' }, { status: 500 });
  }
} 
import { NextResponse } from 'next/server';
import * as cheerio from 'cheerio';

export async function GET(request) {
  try {
    const { searchParams } = new URL(request.url);
    const movieTitle = searchParams.get('title');

    if (!movieTitle) {
      return NextResponse.json({ error: 'Movie title is required' }, { status: 400 });
    }

    const response = await fetch(`https://www.imdb.com/find?q=${encodeURIComponent(movieTitle)}`);
    const html = await response.text();
    const $ = cheerio.load(html);

    // Find the first movie result
    const firstResult = $('.ipc-metadata-list-summary-item').first();
    
    if (!firstResult.length) {
      return NextResponse.json({ error: 'No results found' }, { status: 404 });
    }

    // Extract movie details
    const title = firstResult.find('.ipc-metadata-list-summary-item__t').text().trim();
    const year = firstResult.find('.ipc-metadata-list-summary-item__li').first().text().trim();
    const imdbId = firstResult.find('a').attr('href')?.split('/')[2] || '';
    const posterUrl = firstResult.find('img').attr('src') || '';

    // Get the imdb url
    const imdbUrl = `https://www.imdb.com/title/${imdbId}/`;

    

    return NextResponse.json({
      title,
      year,
      imdbId,
      posterUrl,
      imdbUrl
    });
  } catch (error) {
    console.error('Error fetching IMDB data:', error);
    return NextResponse.json({ error: 'Failed to fetch IMDB data' }, { status: 500 });
  }
} 
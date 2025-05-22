# Movie Recommendation System

A Next.js application that helps users discover movies based on their preferences and provides detailed information from IMDB.

## Features

- Interactive Q&A system to understand user preferences
- Genre-based movie recommendations
- Detailed movie information from IMDB including:
  - Ratings
  - Cast
  - Plot summaries
  - Release dates
  - And more!

## How It Works

1. **User Preferences**: Answer simple questions about your movie preferences
2. **Genre Selection**: Get personalized genre recommendations based on your answers
3. **Movie Discovery**: Browse through curated movie suggestions from your preferred genres
4. **IMDB Integration**: View comprehensive movie details sourced from IMDB

## Getting Started

First, run the development server:

```bash
npm run dev
# or
yarn dev
# or
pnpm dev
# or
bun dev
```

Open [http://localhost:3000](http://localhost:3000) with your browser to start discovering movies!

## Setup Requirements

### Prerequisites

- Node.js version 18 or above
- npm, yarn, pnpm, or bun package manager
- Gemini API key

### Environment Setup

1. Clone the repository:
```bash
git clone [repository-url]
cd movie-recos
```

2. Install dependencies:
```bash
npm install
# or
yarn install
# or
pnpm install
# or
bun install
```

3. Create a `.env` file in the root directory and add your Gemini API key:
```env
GEMINI_API_KEY=your_api_key_here
```

4. Start the development server:
```bash
npm run dev
```

## Tech Stack

- [Next.js](https://nextjs.org/) - React framework for production
- [IMDB API](https://imdb-api.com/) - Movie database integration
- [Gemini API](https://ai.google.dev/) - AI-powered recommendations
- Modern UI components for an engaging user experience

## Contributing

Feel free to submit issues and enhancement requests!

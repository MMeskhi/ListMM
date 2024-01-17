import { NextResponse } from "next/server";

export async function POST(req) {
  const { movieName } = req.body;

  try {
    const response = await fetch(
      `https://api.themoviedb.org/3/search/movie?api_key=${process.env.TMDB_API_KEY}&query=${movieName}`
    );
    const data = await response.json();

    const results = data.results
      .filter((movie) => movie.poster_path)
      .map((movie) => {
        return {
          id: movie.id,
          name: movie.title,
          image: `https://image.tmdb.org/t/p/w500/${movie.poster_path}`,
        };
      })
      .slice(0, 12);

    return new Response(JSON.stringify({ movies: results }), { status: 200 });
  } catch (error) {
    console.error(error);
    return new Response(JSON.stringify({ error: "Failed to fetch movies" }), {
      status: 500,
    });
  }
}

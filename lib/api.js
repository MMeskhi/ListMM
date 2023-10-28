export async function searchMovies(movieName) {
  const response = await fetch(
    `https://api.themoviedb.org/3/search/movie?api_key=${process.env.NEXT_PUBLIC_TMDB_API_KEY}&query=${movieName}`
  );
  const data = await response.json();
  return data.results || [];
}

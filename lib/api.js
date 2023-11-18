export async function searchMovies(movieName) {
  const response = await fetch(
    `https://api.themoviedb.org/3/search/movie?api_key=${process.env.NEXT_PUBLIC_TMDB_API_KEY}&query=${movieName}`
  );
  const data = await response.json();
  return data.results || [];
}

export async function searchAlbums(artistName) {
  const response = await fetch(
    `http://ws.audioscrobbler.com/2.0/?method=artist.gettopalbums&artist=${artistName}&api_key=${process.env.NEXT_PUBLIC_LASTFM_API_KEY}&format=json`
  );
  const data = await response.json();
  return data.topalbums.album || [];
}

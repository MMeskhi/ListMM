export async function searchMovies(movieName) {
  const response = await fetch(
    `https://api.themoviedb.org/3/search/movie?api_key=${process.env.NEXT_PUBLIC_TMDB_API_KEY}&query=${movieName}`
  );
  const data = await response.json();
  return data.results || [];
}

export async function searchAlbums(albumName) {
  const response = await fetch(
    `https://ws.audioscrobbler.com/2.0/?method=album.search&album=${albumName}&api_key=${process.env.NEXT_PUBLIC_LASTFM_API_KEY}&format=json&limit=20`
  );
  const data = await response.json();
  return (
    data.results.albummatches.album.map((album) => ({
      name: album.name,
      image: album.image.find((img) => img.size === "large")["#text"],
      url: album.url,
    })) || []
  );
}

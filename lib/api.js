export async function searchMovies(movieName) {
  const response = await fetch(
    `https://api.themoviedb.org/3/search/movie?api_key=${process.env.NEXT_PUBLIC_TMDB_API_KEY}&query=${movieName}`
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

  return results;
}

export async function searchAlbums(albumName) {
  const response = await fetch(
    `https://ws.audioscrobbler.com/2.0/?method=album.search&album=${albumName}&api_key=${process.env.NEXT_PUBLIC_LASTFM_API_KEY}&format=json&limit=12`
  );
  const data = await response.json();
  return (
    data.results.albummatches.album
      .filter(
        (album) => album.image.find((img) => img.size === "large")["#text"]
      )
      .map((album) => ({
        id: album.url,
        name: album.name,
        artist: album.artist,
        image: album.image.find((img) => img.size === "large")["#text"],
      })) || []
  );
}

export async function searchGames(gameName) {
  const response = await fetch(
    `/api/igdb/v4/games?search=${gameName}&fields=name,cover.image_id,url&limit=12`,
    {
      headers: {
        "Client-ID": process.env.NEXT_PUBLIC_IGDB_CLIENT_ID,
        Authorization: `Bearer ${process.env.NEXT_PUBLIC_IGDB_ACCESS_TOKEN}`,
      },
    }
  );
  const data = await response.json();
  return (
    data
      .filter((game) => game.cover)
      .map((game) => ({
        id: game.id,
        name: game.name,
        url: game.url,
        image: `https://images.igdb.com/igdb/image/upload/t_cover_big/${game.cover.image_id}.jpg`,
      })) || []
  );
}

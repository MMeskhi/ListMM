import Image from "next/image";

export default function SearchResults({ results, onMovieClick }) {
  return (
    <div className="grid grid-cols-fluid">
      {results
        .filter((movie) => movie.poster_path)
        .map((movie) => (
          <div
            key={movie.id}
            className="w-32 h-42"
            onClick={() => onMovieClick(movie)}
          >
            <Image
              src={`https://image.tmdb.org/t/p/w500${movie.poster_path}`}
              alt={movie.title}
              width={200}
              height={200}
              className="object-cover w-28 h-[160px] rounded-sm"
            />
            <h2 className="truncate">{movie.title}</h2>
          </div>
        ))}
    </div>
  );
}

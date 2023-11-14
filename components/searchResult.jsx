import Image from "next/image";

export default function SearchResults({ results, onMovieClick }) {
  return (
    <div className="grid grid-cols-fluid">
      {results
        .filter((movie) => movie.poster_path)
        .map((movie) => (
          <div
            key={movie.id}
            className="w-24 border max-md:w-20"
            onClick={() => onMovieClick(movie)}
          >
            <Image
              src={`https://image.tmdb.org/t/p/w500${movie.poster_path}`}
              alt={movie.title}
              width={200}
              height={200}
              className="object-cover h-[143px] rounded-sm max-md:h-[120px]"
            />
            <h2 className="truncate ">
              {movie.title} ({movie.release_date.split("-")[0]})
            </h2>
          </div>
        ))}
    </div>
  );
}

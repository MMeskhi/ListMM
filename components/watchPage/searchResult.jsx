import Image from "next/image";
import Link from "next/link";
import { BsFillCheckCircleFill } from "react-icons/bs";
import { Spinner, TinySpinner } from "../loaders";

export default function SearchResults({
  results,
  onMovieClick,
  isLoading,
  hasSearched,
  addingMovies,
}) {
  if (hasSearched && results.length === 0) {
    return <p className="text-slate-700">No results found</p>;
  }
  return (
    <div className="grid gap-2 grid-cols-4 max-sm:grid-cols-3">
      {isLoading ? (
        <Spinner />
      ) : (
        results
          .filter((movie) => movie.poster_path)
          .map((movie) => (
            <div
              key={movie.id}
              className="rounded-sm flex flex-col justify-between"
            >
              <div className="relative hover:before:bg-gray-900 before:absolute before:inset-0 before:rounded-sm hover:before:opacity-40 before:duration-300 [&>span]:hover:opacity-100 select-none h-full">
                {addingMovies.includes(movie.id) ? (
                  <div className="absolute right-1.5 top-1.5">
                    <TinySpinner />
                  </div>
                ) : (
                  <span
                    className="opacity-0 absolute right-1.5 top-1.5 text-gray-200 text-xl bg-slate-800 p-px rounded-full shadow-sm cursor-pointer hover:text-gray-800 hover:bg-gray-200 duration-200 active:scale-90 active:duration-75"
                    onClick={() => {
                      onMovieClick(movie);
                    }}
                  >
                    <BsFillCheckCircleFill />
                  </span>
                )}
                <Image
                  src={`https://image.tmdb.org/t/p/w154${movie.poster_path}`}
                  alt={movie.title}
                  width={100}
                  height={100}
                  className="object-cover rounded-sm w-full h-full min-h-[140px] shadow-sm"
                />
              </div>
              <h2 className="truncate w-full">
                <Link
                  href={`https://letterboxd.com/tmdb/${movie.id}`}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="w-fit hover:text-slate-700 duration-150"
                >
                  {movie.title}
                </Link>
              </h2>
            </div>
          ))
      )}
    </div>
  );
}

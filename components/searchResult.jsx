import Image from "next/image";
import Link from "next/link";
import { BsFillCheckCircleFill } from "react-icons/bs";

export default function SearchResults({ results, onMovieClick }) {
  return (
    <div className="grid gap-2 grid-cols-4 max-sm:grid-cols-3">
      {results
        .filter((movie) => movie.poster_path)
        .map((movie) => (
          <div key={movie.id} className="rounded-sm">
            <div className="relative  hover:before:bg-gray-900 before:absolute before:inset-0 before:rounded-sm hover:before:opacity-40 before:duration-300 [&>span]:hover:opacity-100 select-none h-[180px] max-sm:h-[160px]">
              <span
                className="opacity-0 absolute right-1.5 top-1.5 text-gray-200 text-xl bg-slate-800 p-px rounded-full shadow-sm cursor-pointer hover:text-gray-800 hover:bg-gray-200 duration-200 active:scale-90 active:duration-75"
                onClick={() => {
                  onMovieClick(movie);
                }}
              >
                <BsFillCheckCircleFill />
              </span>
              <Image
                src={`https://image.tmdb.org/t/p/w500${movie.poster_path}`}
                alt={movie.title}
                width={200}
                height={200}
                className="object-cover rounded-sm w-full h-full"
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
        ))}
    </div>
  );
}

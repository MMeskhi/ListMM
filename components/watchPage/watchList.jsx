import React, { useContext } from "react";
import Image from "next/image";
import Link from "next/link";
import { WatchListContext } from "@/context/WatchListContext";
import { BsFillCheckCircleFill } from "react-icons/bs";

export default function WatchList() {
  const { movies, removeMovieFromWatchList } = useContext(WatchListContext);

  return (
    <div className="mt-5 h-full flex gap-4 flex-wrap">
      {movies &&
        movies.map((movie) => (
          <div key={movie.id} className="rounded-sm w-24 max-md:w-20">
            <div className="relative hover:before:bg-gray-900 before:absolute before:inset-0 hover:before:opacity-40 before:duration-300 [&>span]:hover:opacity-100 select-none">
              <span
                className="opacity-0 absolute right-1.5 top-1.5 text-gray-200 text-lg bg-slate-800 p-px rounded-full shadow-sm cursor-pointer hover:text-gray-800 hover:bg-gray-200 duration-200 active:scale-90 active:duration-75"
                onClick={() => removeMovieFromWatchList(movie.id)}
              >
                <BsFillCheckCircleFill />
              </span>
              <Image
                src={`https://image.tmdb.org/t/p/w500${movie.poster_path}`}
                alt={movie.title}
                width={100}
                height={100}
                className="object-cover rounded-sm border border-gray-800 shadow-sm h-[143px] max-md:h-[120px]"
              />
            </div>
            <h2 className="truncate text-gray-300 w-full text-sm">
              <Link
                href={`https://letterboxd.com/tmdb/${movie.id}`}
                target="_blank"
                rel="noopener noreferrer"
                className="w-fit"
              >
                {movie.title}
              </Link>
            </h2>
          </div>
        ))}
    </div>
  );
}

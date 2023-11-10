import React, { useContext } from "react";
import Image from "next/image";
import Link from "next/link";
import { WatchListContext } from "@/context/WatchListContext";

export default function WatchList() {
  const { movies } = useContext(WatchListContext);

  return (
    <div className="mt-5 h-full flex gap-4 flex-wrap">
      {movies &&
        movies.map((movie) => (
          <div key={movie.id} className="rounded-sm w-24 ">
            <Image
              src={`https://image.tmdb.org/t/p/w500${movie.poster_path}`}
              alt={movie.title}
              width={100}
              height={100}
              className="object-cover rounded-sm border border-gray-800 shadow-sm h-[143px]"
            />
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

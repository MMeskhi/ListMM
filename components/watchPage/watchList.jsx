"use client";
import React from "react";
import Image from "next/image";

export default function WatchList({ movies }) {
  return (
    <div className="mt-8 h-full flex gap-4 flex-wrap">
      {movies &&
        movies.map((movie) => (
          <div key={movie.id}>
            <Image
              src={`https://image.tmdb.org/t/p/w500${movie.poster_path}`}
              alt={movie.title}
              width={200}
              height={200}
              className="object-cover w-28 h-[160px] rounded-sm"
            />
            <h2 className="truncate text-gray-300 w-28">{movie.title}</h2>
          </div>
        ))}
    </div>
  );
}

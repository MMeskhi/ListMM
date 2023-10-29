"use client";
import React from "react";
import Image from "next/image";

export default function MovieList({ movies }) {
  return (
    <div className="mt-8 h-full grid grid-cols-fluid">
      {movies &&
        movies.map((movie) => (
          <div key={movie.id}>
            <Image
              src={`https://image.tmdb.org/t/p/w500${movie.poster_path}`}
              alt={movie.title}
              width={200}
              height={200}
              className="w-40"
            />
            <h2 className="truncate text-slate-200">{movie.title}</h2>
          </div>
        ))}
    </div>
  );
}

"use client";
import React, { useEffect, useState } from "react";
import Image from "next/image";
import { useSession } from "next-auth/react";

export default function WatchList() {
  const { data: session } = useSession();
  const [movies, setMovies] = useState([]);

  useEffect(() => {
    const fetchWatchList = async () => {
      if (session) {
        try {
          const response = await fetch("/watch/api/getWatchList", {
            method: "POST",
            headers: {
              "Content-Type": "application/json",
            },
            body: JSON.stringify({
              userId: session.user.id,
            }),
          });

          if (response.ok) {
            const data = await response.json();
            setMovies(data.movies);
          } else {
            console.error("Failed to fetch WatchList");
          }
        } catch (error) {
          console.error(error);
        }
      }
    };

    fetchWatchList();
  }, [session]);

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

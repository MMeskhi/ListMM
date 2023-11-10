"use client";
import React, { createContext, useState, useEffect } from "react";
import { useSession } from "next-auth/react";
import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

export const WatchListContext = createContext();

export const WatchListProvider = ({ children }) => {
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
            toast.error("Failed to load the WatchList");
          }
        } catch (error) {
          console.error(error);
        }
      }
    };

    fetchWatchList();
  }, [session]);

  const addMovieToWatchList = async (movie) => {
    try {
      const response = await fetch("/watch/api/addMoviesToList", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          movieId: movie.id,
          title: movie.title,
          poster_path: movie.poster_path,
          userId: session.user.id,
        }),
      });

      if (response.ok) {
        const updatedMovies = [...movies, movie];
        setMovies(updatedMovies);
        toast.success("Movie added to WatchList");
      } else {
        toast.error("Failed to add movie to WatchList");
      }
    } catch (error) {
      console.error(error);
      toast.error("An error occurred");
    }
  };

  //   const removeMovieFromWatchList = async (movieId) => {};

  return (
    <WatchListContext.Provider value={{ movies, addMovieToWatchList }}>
      {children}
    </WatchListContext.Provider>
  );
};

"use client";
import React, { createContext, useState, useEffect } from "react";
import { useSession } from "next-auth/react";
import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

export const WatchListContext = createContext();

export const WatchListProvider = ({ children }) => {
  const { data: session } = useSession();
  const [movies, setMovies] = useState([]);
  const [lastUpdate, setLastUpdate] = useState(Date.now());
  const [removingMovies, setRemovingMovies] = useState([]);

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
  }, [session, lastUpdate]);

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

    setLastUpdate(Date.now());
  };

  const removeMovieFromWatchList = async (movieId) => {
    setRemovingMovies((prevRemovingMovies) => [...prevRemovingMovies, movieId]);
    try {
      const response = await fetch("/watch/api/removeMovieFromList", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          movieId: movieId,
          userId: session.user.id,
        }),
      });

      if (response.ok) {
        const updatedMovies = movies.filter((movie) => movie.id !== movieId);
        setMovies(updatedMovies);
        toast.success("Movie removed from WatchList");
      } else {
        toast.error("Failed to remove movie from WatchList");
      }
    } catch (error) {
      console.error(error);
      toast.error("An error occurred");
    }

    setLastUpdate(Date.now());
    setRemovingMovies((prevRemovingMovies) =>
      prevRemovingMovies.filter((id) => id !== movieId)
    );
  };

  return (
    <WatchListContext.Provider
      value={{
        movies,
        addMovieToWatchList,
        removeMovieFromWatchList,
        removingMovies,
      }}
    >
      {children}
    </WatchListContext.Provider>
  );
};

"use client";
import React, { createContext, useState, useEffect } from "react";
import { useUserSession } from "@/lib/session";
import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

export const WatchPageContext = createContext();

export const WatchPageProvider = ({ children }) => {
  const { session } = useUserSession();
  const [movies, setMovies] = useState([]);
  const [lastUpdate, setLastUpdate] = useState(Date.now());
  const [removingMovies, setRemovingMovies] = useState([]);
  const [reorderingMovies, setReorderingMovies] = useState([]);

  useEffect(() => {
    const fetchWatchList = async () => {
      if (session) {
        try {
          const response = await fetch("/api/watchPage/getWatchList", {
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
      const response = await fetch("/api/watchPage/addMoviesToList", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          movieId: movie.id,
          title: movie.title,
          image: movie.poster_path,
          userId: session.user.id,
        }),
      });

      if (response.ok) {
        setLastUpdate(Date.now());
        toast.success("Movie added to WatchList");
      } else {
        toast.error("Failed to add movie to WatchList");
      }
    } catch (error) {
      console.error(error);
      toast.error("An error occurred");
    }
  };

  const removeMovieFromWatchList = async (movieId) => {
    setRemovingMovies((prevRemovingMovies) => [...prevRemovingMovies, movieId]);
    try {
      const response = await fetch("/api/watchPage/removeMovieFromList", {
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
        setLastUpdate(Date.now());
        toast.success("Movie removed from WatchList");
      } else {
        toast.error("Failed to remove movie from WatchList");
      }
    } catch (error) {
      console.error(error);
      toast.error("An error occurred");
    }

    setRemovingMovies((prevRemovingMovies) =>
      prevRemovingMovies.filter((id) => id !== movieId)
    );
  };

  const updateMovieOrder = async (newMovies, activeMovieId) => {
    setReorderingMovies((prevReorderingMovies) => [
      ...prevReorderingMovies,
      activeMovieId,
    ]);

    const response = await fetch("/api/watchPage/updateMovieOrder", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ movies: newMovies, userId: session.user.id }),
    });

    if (response.ok) {
      setMovies(newMovies);
    }

    setReorderingMovies((prevReorderingMovies) =>
      prevReorderingMovies.filter((id) => id !== activeMovieId)
    );
  };

  return (
    <WatchPageContext.Provider
      value={{
        movies,
        setMovies,
        addMovieToWatchList,
        removeMovieFromWatchList,
        removingMovies,
        updateMovieOrder,
        reorderingMovies,
      }}
    >
      {children}
    </WatchPageContext.Provider>
  );
};

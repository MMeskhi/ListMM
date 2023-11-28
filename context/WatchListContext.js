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
  const [reorderingMovies, setReorderingMovies] = useState([]);

  useEffect(() => {
    const fetchWatchList = async () => {
      if (session) {
        try {
          const response = await fetch("/api/getWatchList", {
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
      const response = await fetch("/api/addMoviesToList", {
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
      const response = await fetch("/api/removeMovieFromList", {
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

    const response = await fetch("/api/updateMovieOrder", {
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
    <WatchListContext.Provider
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
    </WatchListContext.Provider>
  );
};

"use client";
import React, {
  createContext,
  useState,
  useLayoutEffect,
  useCallback,
} from "react";
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

  const fetchList = useCallback(async () => {
    if (session) {
      try {
        const response = await fetch("/api/watchPage/getMovieList", {
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
          console.error("Failed to fetch the List");
          toast.error("Failed to load the the List");
        }
      } catch (error) {
        console.error(error);
      }
    }
  }, [session]);

  useLayoutEffect(() => {
    fetchList();
  }, [fetchList, lastUpdate]);

  const addMovie = async (movie) => {
    try {
      const response = await fetch("/api/watchPage/addMovie", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          movieId: movie.id,
          title: movie.name,
          image: movie.image,
          userId: session.user.id,
        }),
      });

      if (response.ok) {
        setLastUpdate(Date.now());
        toast.success("Movie added to the List");
      } else {
        toast.error("Failed to add movie to the List");
      }
    } catch (error) {
      console.error(error);
      toast.error("An error occurred");
    }
  };

  const removeMovie = async (movieId) => {
    setRemovingMovies((prevRemovingMovies) => [...prevRemovingMovies, movieId]);
    try {
      const response = await fetch("/api/watchPage/removeMovie", {
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
        toast.success("Movie removed from the List");
      } else {
        toast.error("Failed to remove movie from the List");
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

    const response = await fetch("/api/watchPage/reorderMovie", {
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
        addMovie,
        removeMovie,
        removingMovies,
        updateMovieOrder,
        reorderingMovies,
      }}
    >
      {children}
    </WatchPageContext.Provider>
  );
};

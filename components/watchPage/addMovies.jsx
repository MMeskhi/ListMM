"use client";
import { useState, useContext } from "react";
import SearchBar from "../searchBar";
import SearchResult from "./searchResult";
import { searchMovies } from "../../lib/api";
import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { useUserSession } from "@/lib/session";
import mainStore from "@/components/store/mainStore";

export default function AddMovies() {
  const { session } = useUserSession();
  const { toggleReload } = mainStore();
  const [results, setResults] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  const [hasSearched, setHasSearched] = useState(false);
  const [addingMovies, setAddingMovies] = useState([]);

  const handleSearch = async (movieName) => {
    setIsLoading(true);
    const newResults = await searchMovies(movieName);
    setResults(newResults);
    setIsLoading(false);
    setHasSearched(true);
  };

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
        // setLastUpdate(Date.now());
        toggleReload();
        toast.success("Movie added to the List");
      } else {
        toast.error("Failed to add movie to the List");
      }
    } catch (error) {
      console.error(error);
      toast.error("An error occurred");
    }
  };

  const addMovieToList = async (movie) => {
    if (!session) {
      console.log("not signed");
    }

    setAddingMovies((prevAddingMovies) => [...prevAddingMovies, movie.id]);

    try {
      await addMovie(movie);
    } catch (error) {
      console.error(error);
      toast.error("Failed to add movie to the List");
    } finally {
      setAddingMovies((prevAddingMovies) =>
        prevAddingMovies.filter((id) => id !== movie.id)
      );
    }
  };

  return (
    <>
      <SearchBar onSearch={handleSearch} />
      <SearchResult
        results={results}
        onMovieClick={addMovieToList}
        isLoading={isLoading}
        hasSearched={hasSearched}
        addingMovies={addingMovies}
      />
    </>
  );
}

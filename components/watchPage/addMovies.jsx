"use client";
import { useState, useContext } from "react";
import SearchBar from "../searchBar";
import SearchResult from "./searchResult";
import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { useUserSession } from "@/lib/session";
import { WatchPageContext } from "@/context/watchPageContext";

export default function AddMovies() {
  const [results, setResults] = useState([]);
  const { session } = useUserSession();
  const { addMovie } = useContext(WatchPageContext);
  const [isLoading, setIsLoading] = useState(false);
  const [hasSearched, setHasSearched] = useState(false);
  const [addingMovies, setAddingMovies] = useState([]);

  const handleSearch = async (movieName) => {
    setIsLoading(true);
    const response = await fetch(
      `/api/services/searchMovies?movieName=${movieName}`
    );
    const newResults = await response.json();
    setResults(newResults);
    setIsLoading(false);
    setHasSearched(true);
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

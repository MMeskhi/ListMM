"use client";
import React, { useState, useContext } from "react";
import SearchBar from "../searchBar";
import SearchResults from "../searchResult";
import { searchMovies } from "../../lib/api";
import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { useUserSession } from "@/lib/session";
import { WatchListContext } from "@/context/WatchListContext";

export default function MoviesAdd() {
  const [results, setResults] = useState([]);
  const { session } = useUserSession();
  const { addMovieToWatchList } = useContext(WatchListContext);
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

  const addMovieToList = async (movie) => {
    if (!session) {
      console.log("not signed");
    }

    setAddingMovies((prevAddingMovies) => [...prevAddingMovies, movie.id]);

    try {
      await addMovieToWatchList(movie);
    } catch (error) {
      console.error(error);
      toast.error("Failed to add movie to WatchList");
    } finally {
      setAddingMovies((prevAddingMovies) =>
        prevAddingMovies.filter((id) => id !== movie.id)
      );
    }
  };

  return (
    <div>
      <SearchBar onSearch={handleSearch} />
      <SearchResults
        results={results}
        onMovieClick={addMovieToList}
        isLoading={isLoading}
        hasSearched={hasSearched}
        addingMovies={addingMovies}
      />
    </div>
  );
}

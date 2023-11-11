"use client";
import React, { useState, useContext } from "react";
import SearchBar from "../searchBar";
import SearchResults from "../searchResult";
import { searchMovies } from "../../lib/api";
import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { useSession } from "next-auth/react";
import { WatchListContext } from "@/context/WatchListContext";

export default function MoviesAdd() {
  const [results, setResults] = useState([]);
  const { data: session } = useSession();
  const { addMovieToWatchList } = useContext(WatchListContext);

  const handleSearch = async (movieName) => {
    const newResults = await searchMovies(movieName);
    setResults(newResults);
  };

  const addMovieToList = async (movie) => {
    if (!session) {
      console.log("not signed");
    }

    try {
      await addMovieToWatchList(movie);
    } catch (error) {
      console.error(error);
      toast.error("Failed to add movie to WatchList 2");
    }
  };

  return (
    <div>
      <SearchBar onSearch={handleSearch} />
      <SearchResults results={results} onMovieClick={addMovieToList} />
    </div>
  );
}

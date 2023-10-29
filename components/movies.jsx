"use client";
import React, { useState } from "react";
import SearchBar from "./search-bar";
import SearchResults from "./search-results";
import { searchMovies } from "../lib/api";

export default function Movies({ setSelectedMovies }) {
  const [results, setResults] = useState([]);

  const handleSearch = async (movieName) => {
    const newResults = await searchMovies(movieName);
    setResults(newResults);
  };

  const addMovieToList = (movie) => {
    setSelectedMovies((prevMovies) => [...prevMovies, movie]);
  };

  return (
    <div>
      <SearchBar onSearch={handleSearch} />
      <SearchResults results={results} onMovieClick={addMovieToList} />{" "}
    </div>
  );
}

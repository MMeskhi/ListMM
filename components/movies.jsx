"use client";
import React, { useState } from "react";
import SearchBar from "./search-bar";
import SearchResults from "./search-results";
import { searchMovies } from "../lib/api";

export default function Movies() {
  const [results, setResults] = useState([]);

  const handleSearch = async (movieName) => {
    const newResults = await searchMovies(movieName);
    setResults(newResults);
  };
  return (
    <div>
      <SearchBar onSearch={handleSearch} />
      <SearchResults results={results} />
    </div>
  );
}

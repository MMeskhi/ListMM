"use client";
import React, { useState } from "react";
import SearchBar from "./searchBar";
import SearchResults from "./searchResult";
import { searchMovies } from "../lib/api";
import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

export default function MoviesAdd({ setSelectedMovies }) {
  const [results, setResults] = useState([]);

  const handleSearch = async (movieName) => {
    const newResults = await searchMovies(movieName);
    setResults(newResults);
  };

  let alertShown = false;

  const addMovieToList = (movie) => {
    setSelectedMovies((prevMovies) => {
      const movieExists = prevMovies.find(
        (prevMovie) => prevMovie.id === movie.id
      );

      if (!movieExists) {
        return [...prevMovies, movie];
      } else {
        if (!alertShown) {
          toast.info("You already have that movie in your list");
          alertShown = true;
        }
        return prevMovies;
      }
    });
  };

  return (
    <div>
      <SearchBar onSearch={handleSearch} />
      <SearchResults results={results} onMovieClick={addMovieToList} />
    </div>
  );
}

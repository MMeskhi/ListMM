"use client";
import React, { useState } from "react";
import SearchBar from "../searchBar";
import SearchResults from "../searchResult";
import { searchMovies } from "../../lib/api";
import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { useSession } from "next-auth/react";

export default function MoviesAdd({ setSelectedMovies }) {
  const [results, setResults] = useState([]);
  const { data: session } = useSession();

  const handleSearch = async (movieName) => {
    const newResults = await searchMovies(movieName);
    setResults(newResults);
  };

  let alertShown = false;

  const addMovieToList = async (movie) => {
    if (!session) {
      console.log("not signed");
    }

    console.log(movie); // Log the movie object
    console.log(session); // Log the session object

    try {
      const response = await fetch("/watch/api/addMoviesToList", {
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
      } else {
        toast.error("Failed to add movie to WatchList");
      }
    } catch (error) {
      console.error(error);
      toast.error("An error occurred");
    }
  };

  return (
    <div>
      <SearchBar onSearch={handleSearch} />
      <SearchResults results={results} onMovieClick={addMovieToList} />
    </div>
  );
}

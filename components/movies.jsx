"use client";
import React, { useState } from "react";
import { Modal } from "@/components/modal";
import MovieList from "@/components/movie-list";

export default function Home() {
  const [selectedMovies, setSelectedMovies] = useState([]);
  return (
    <>
      <Modal setSelectedMovies={setSelectedMovies} />
      <MovieList movies={selectedMovies} />
    </>
  );
}

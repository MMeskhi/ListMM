"use client";
import React, { useState } from "react";
import { Modal } from "@/components/modal";
import WatchList from "@/components/watchPage/watchList";

export default function Home() {
  const [selectedMovies, setSelectedMovies] = useState([]);
  return (
    <>
      <Modal setSelectedMovies={setSelectedMovies} />
      <WatchList movies={selectedMovies} />
    </>
  );
}

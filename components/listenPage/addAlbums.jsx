"use client";
import { useState, useContext } from "react";
import SearchBar from "../searchBar";
import SearchResult from "./searchResult";
import { searchAlbums } from "@/lib/api";
import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { useUserSession } from "@/lib/session";
import { ListenPageContext } from "@/context/listenPageContext";

export default function AddAlbums() {
  const [results, setResults] = useState([]);
  const { session } = useUserSession();
  const { addAlbum } = useContext(ListenPageContext);
  const [isLoading, setIsLoading] = useState(false);
  const [hasSearched, setHasSearched] = useState(false);
  const [addingAlbums, setAddingAlbums] = useState([]);

  const handleSearch = async (albumName) => {
    setIsLoading(true);
    const newResults = await searchAlbums(albumName);
    setResults(newResults);
    setIsLoading(false);
    setHasSearched(true);
  };

  const addAlbumToList = async (album) => {
    if (!session) {
      console.log("not signed");
    }

    setAddingAlbums((prevAddingAlbums) => [...prevAddingAlbums, album.id]);

    try {
      await addAlbum(album);
    } catch (error) {
      console.error(error);
      toast.error("Failed to add album to the List");
    } finally {
      setAddingAlbums((prevAddingAlbums) =>
        prevAddingAlbums.filter((id) => id !== album.id)
      );
    }
  };

  return (
    <>
      <SearchBar onSearch={handleSearch} />
      <SearchResult
        results={results}
        onAlbumClick={addAlbumToList}
        isLoading={isLoading}
        hasSearched={hasSearched}
        addingAlbums={addingAlbums}
      />
    </>
  );
}

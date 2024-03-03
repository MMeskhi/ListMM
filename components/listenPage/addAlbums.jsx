"use client";
import { useState } from "react";
import { useUserSession } from "@/lib/session";
import { useQueryClient } from "@tanstack/react-query";
import SearchBar from "../searchBar";
import SearchResult from "./searchResult";
import { searchAlbums } from "@/lib/api";
import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

export default function AddAlbums() {
  const { session } = useUserSession();
  const [results, setResults] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  const [hasSearched, setHasSearched] = useState(false);
  const [addingAlbums, setAddingAlbums] = useState([]);

  const queryClient = useQueryClient();

  const handleSearch = async (albumName) => {
    setIsLoading(true);
    const newResults = await searchAlbums(albumName);
    setResults(newResults);
    setIsLoading(false);
    setHasSearched(true);
  };

  const addAlbum = async (album) => {
    try {
      const response = await fetch("/api/listenPage/addAlbum", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          albumId: album.id,
          title: album.name,
          image: album.image,
          userId: session.user.id,
        }),
      });

      if (response.ok) {
        await queryClient.refetchQueries({
          queryKey: ["albums"],
        });
        toast.success("Album added to the List");
      } else {
        toast.error("Failed to add album to the List");
      }
    } catch (error) {
      console.error(error);
      toast.error("An error occurred");
    }
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

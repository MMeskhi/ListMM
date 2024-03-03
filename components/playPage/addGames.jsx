"use client";
import { useState } from "react";
import { useUserSession } from "@/lib/session";
import { useQueryClient } from "@tanstack/react-query";
import SearchBar from "../searchBar";
import SearchResult from "./searchResult";
import { searchGames } from "../../lib/api";
import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

export default function AddGames() {
  const { session } = useUserSession();
  const [results, setResults] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  const [hasSearched, setHasSearched] = useState(false);
  const [addingGames, setAddingGames] = useState([]);

  const queryClient = useQueryClient();

  const handleSearch = async (gameName) => {
    setIsLoading(true);
    const newResults = await searchGames(gameName);
    setResults(newResults);
    setIsLoading(false);
    setHasSearched(true);
  };

  const addGame = async (game) => {
    try {
      const response = await fetch("/api/playPage/addGame", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          gameId: game.id,
          title: game.name,
          image: game.image,
          url: game.url,
          userId: session.user.id,
        }),
      });

      if (response.ok) {
        await queryClient.refetchQueries({
          queryKey: ["games"],
        });
        toast.success("Game added to the List");
      } else {
        toast.error("Failed to add game to the List");
      }
    } catch (error) {
      console.error(error);
      toast.error("An error occurred");
    }
  };

  const addGameToList = async (game) => {
    if (!session) {
      console.log("not signed");
    }

    setAddingGames((prevAddingGames) => [...prevAddingGames, game.id]);

    try {
      await addGame(game);
    } catch (error) {
      console.error(error);
      toast.error("Failed to add game to the List");
    } finally {
      setAddingGames((prevAddingGames) =>
        prevAddingGames.filter((id) => id !== game.id)
      );
    }
  };

  return (
    <>
      <SearchBar onSearch={handleSearch} />
      <SearchResult
        results={results}
        onGameClick={addGameToList}
        isLoading={isLoading}
        hasSearched={hasSearched}
        addingGames={addingGames}
      />
    </>
  );
}

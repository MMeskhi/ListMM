"use client";
import { useState, useContext } from "react";
import SearchBar from "../searchBar";
import SearchResult from "./searchResult";
import { searchGames } from "../../lib/api";
import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { useUserSession } from "@/lib/session";
import { PlayPageContext } from "@/context/playPageContext";

export default function AddGames() {
  const [results, setResults] = useState([]);
  const { session } = useUserSession();
  const { addGame } = useContext(PlayPageContext);
  const [isLoading, setIsLoading] = useState(false);
  const [hasSearched, setHasSearched] = useState(false);
  const [addingGames, setAddingGames] = useState([]);

  const handleSearch = async (gameName) => {
    setIsLoading(true);
    const newResults = await searchGames(gameName);
    setResults(newResults);
    setIsLoading(false);
    setHasSearched(true);
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

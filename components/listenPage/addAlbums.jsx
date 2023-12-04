import { useState } from "react";
import SearchBar from "../searchBar";
import SearchResultAlbums from "./searchResultAlbums";
import { useUserSession } from "@/lib/session";
import { searchAlbums } from "@/lib/api";

export default function AddAlbums() {
  const { session } = useUserSession();
  const [results, setResults] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  const [hasSearched, setHasSearched] = useState(false);

  const handleSearch = async (albumName) => {
    setIsLoading(true);
    const newResults = await searchAlbums(albumName);
    setResults(newResults);
    setIsLoading(false);
    setHasSearched(true);
  };

  return (
    <>
      <SearchBar onSearch={handleSearch} />
      <SearchResultAlbums
        results={results}
        isLoading={isLoading}
        hasSearched={hasSearched}
      />
    </>
  );
}

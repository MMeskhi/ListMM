"use client";
import React, {
  createContext,
  useState,
  useLayoutEffect,
  useCallback,
} from "react";
import { useUserSession } from "@/lib/session";
import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

export const PlayPageContext = createContext();

export const PlayPageProvider = ({ children }) => {
  const { session } = useUserSession();
  const [games, setGames] = useState([]);
  const [lastUpdate, setLastUpdate] = useState(Date.now());
  const [removingGames, setRemovingGames] = useState([]);
  const [reorderingGames, setReorderingGames] = useState([]);

  const fetchList = useCallback(async () => {
    if (session) {
      try {
        const response = await fetch("/api/playPage/getGameList", {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({
            userId: session.user.id,
          }),
        });

        if (response.ok) {
          const data = await response.json();
          setGames(data.games);
        } else {
          console.error("Failed to fetch the List");
          toast.error("Failed to load the the List");
        }
      } catch (error) {
        console.error(error);
      }
    }
  }, [session]);

  useLayoutEffect(() => {
    fetchList();
  }, [fetchList, lastUpdate]);

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
        setLastUpdate(Date.now());
        toast.success("Game added to the List");
      } else {
        toast.error("Failed to add game to the List");
      }
    } catch (error) {
      console.error(error);
      toast.error("An error occurred");
    }
  };

  const removeGame = async (gameId) => {
    setRemovingGames((prevRemovingGames) => [...prevRemovingGames, gameId]);
    try {
      const response = await fetch("/api/playPage/removeGame", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          gameId: gameId,
          userId: session.user.id,
        }),
      });

      if (response.ok) {
        setLastUpdate(Date.now());
        toast.success("Game removed from the List");
      } else {
        toast.error("Failed to remove game from List");
      }
    } catch (error) {
      console.error(error);
      toast.error("An error occurred");
    }

    setRemovingGames((prevRemovingGames) =>
      prevRemovingGames.filter((id) => id !== gameId)
    );
  };

  const updateGameOrder = async (newGames, activeGameId) => {
    setReorderingGames((prevReorderingGames) => [
      ...prevReorderingGames,
      activeGameId,
    ]);

    const response = await fetch("/api/playPage/reorderGame", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ games: newGames, userId: session.user.id }),
    });

    if (response.ok) {
      setGames(newGames);
    }

    setReorderingGames((prevReorderingGames) =>
      prevReorderingGames.filter((id) => id !== activeGameId)
    );
  };

  return (
    <PlayPageContext.Provider
      value={{
        games,
        setGames,
        addGame,
        removeGame,
        removingGames,
        updateGameOrder,
        reorderingGames,
      }}
    >
      {children}
    </PlayPageContext.Provider>
  );
};

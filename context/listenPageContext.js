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

export const ListenPageContext = createContext();

export const ListenPageProvider = ({ children }) => {
  const { session } = useUserSession();
  const [albums, setAlbums] = useState([]);
  const [lastUpdate, setLastUpdate] = useState(Date.now());
  const [removingAlbums, setRemovingAlbums] = useState([]);
  const [reorderingAlbums, setReorderingAlbums] = useState([]);

  const fetchList = useCallback(async () => {
    if (session) {
      try {
        const response = await fetch("/api/listenPage/getAlbumList", {
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
          setAlbums(data.albums);
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
        setLastUpdate(Date.now());
        toast.success("Album added to the List");
      } else {
        toast.error("Failed to add album to the List");
      }
    } catch (error) {
      console.error(error);
      toast.error("An error occurred");
    }
  };

  const removeAlbum = async (albumId) => {
    setRemovingAlbums((prevRemovingAlbums) => [...prevRemovingAlbums, albumId]);
    try {
      const response = await fetch("/api/listenPage/removeAlbum", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          albumId: albumId,
          userId: session.user.id,
        }),
      });

      if (response.ok) {
        setLastUpdate(Date.now());
        toast.success("Album removed from the List");
      } else {
        toast.error("Failed to remove album from List");
      }
    } catch (error) {
      console.error(error);
      toast.error("An error occurred");
    }

    setRemovingAlbums((prevRemovingAlbums) =>
      prevRemovingAlbums.filter((id) => id !== albumId)
    );
  };

  const updateAlbumOrder = async (newAlbums, activeAlbumId) => {
    setReorderingAlbums((prevReorderingAlbums) => [
      ...prevReorderingAlbums,
      activeAlbumId,
    ]);

    const response = await fetch("/api/listenPage/reorderAlbum", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ albums: newAlbums, userId: session.user.id }),
    });

    if (response.ok) {
      setAlbums(newAlbums);
    }

    setReorderingAlbums((prevReorderingAlbums) =>
      prevReorderingAlbums.filter((id) => id !== activeAlbumId)
    );
  };

  return (
    <ListenPageContext.Provider
      value={{
        albums,
        setAlbums,
        addAlbum,
        removeAlbum,
        removingAlbums,
        updateAlbumOrder,
        reorderingAlbums,
      }}
    >
      {children}
    </ListenPageContext.Provider>
  );
};

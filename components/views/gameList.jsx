"use client";
import Image from "next/image";
import Link from "next/link";
import { useState, useEffect } from "react";
import { useQuery } from "@tanstack/react-query";
import { useUserSession } from "@/lib/session";
import { TinySpinner, Spinner } from "../loaders";
import { motion } from "framer-motion";
import { DndContext, closestCenter } from "@dnd-kit/core";
import {
  SortableContext,
  rectSortingStrategy,
  useSortable,
  arrayMove,
} from "@dnd-kit/sortable";
import { restrictToParentElement } from "@dnd-kit/modifiers";
import { CSS } from "@dnd-kit/utilities";
import { BsFillXCircleFill } from "react-icons/bs";
import { RiDragMove2Fill } from "react-icons/ri";
import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

export default function GameList() {
  const { session } = useUserSession();
  const [games, setGames] = useState([]);
  const [removingGames, setRemovingGames] = useState([]);
  const [reorderingGames, setReorderingGames] = useState([]);

  const { data, error, isLoading, refetch } = useQuery({
    queryKey: ["games"],
    queryFn: async () => {
      const response = await fetch("/api/playPage/getGameList", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          userId: session.user.id,
        }),
      });
      const jsonData = await response.json();
      return jsonData;
    },
    enabled: !!session,
    staleTime: 1000 * 60 * 5,
    cacheTime: 1000 * 60 * 30,
  });

  useEffect(() => {
    if (data) {
      setGames(data.games);
    }
  }, [data]);

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
        await refetch();
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
      await refetch();
      setGames(newGames);
    }

    setReorderingGames((prevReorderingGames) =>
      prevReorderingGames.filter((id) => id !== activeGameId)
    );
  };

  const SortableGames = ({ game }) => {
    const {
      attributes,
      listeners,
      setNodeRef,
      transform,
      transition,
      isDragging,
    } = useSortable({ id: game.id });

    const style = {
      transition,
      transform: CSS.Transform.toString(transform),
      zIndex: isDragging ? 1000 : 1,
    };

    return (
      <li
        ref={setNodeRef}
        style={style}
        className="rounded-sm w-auto flex flex-col justify-between"
      >
        <div className="relative hover:before:bg-gray-900 before:absolute before:inset-0 before:rounded-sm hover:before:opacity-40 before:duration-300 [&>button]:hover:opacity-100 [&>button]:hover:visible select-none h-full">
          {removingGames.includes(game.id) ? (
            <div className="absolute right-1 top-[4px]">
              <TinySpinner />
            </div>
          ) : (
            <button
              className="opacity-0 absolute right-1 top-[4px] text-gray-200 text-xl bg-gray-800 p-px rounded-full shadow-sm cursor-pointer invisible hover:text-red-800 hover:bg-gray-300 duration-200 active:scale-90 active:duration-75"
              onClick={() => removeGame(game.id)}
            >
              <BsFillXCircleFill />
            </button>
          )}
          {reorderingGames.includes(game.id) ? (
            <>
              <div className="absolute right-1 top-[30px] z-50">
                <TinySpinner />
              </div>
              <button className="opacity-100 absolute right-1 top-[30px] text-gray-200 text-sm bg-gray-800 p-[3px] rounded-full shadow-sm visible duration-200 cursor-move border border-gray-600 lg:hover:border-gray-400 touch-none">
                <RiDragMove2Fill />
              </button>
            </>
          ) : (
            <button
              {...attributes}
              {...listeners}
              className="opacity-0 absolute right-1 top-[30px] text-gray-200 text-sm bg-gray-800 p-[3px] rounded-full shadow-sm invisible duration-200 cursor-move border border-gray-600 lg:hover:border-gray-400 touch-none"
            >
              <RiDragMove2Fill />
            </button>
          )}
          <Image
            src={game.image}
            alt={game.title}
            width={100}
            height={100}
            className="object-cover rounded-sm border border-gray-800 shadow-sm w-full h-full min-h-[120px]"
          />
        </div>
        <h2 className="truncate text-gray-300 w-full h-fit text-sm">
          <Link
            href={game.url.replace(/igdb/g, "backloggd")}
            target="_blank"
            rel="noopener noreferrer"
            title={game.title}
            className="w-fit hover:text-slate-200 duration-150"
          >
            {game.title}
          </Link>
        </h2>
      </li>
    );
  };

  const onDragEnd = async (event) => {
    const { active, over } = event;
    if (active.id !== over.id) {
      const oldIndex = games.findIndex((game) => game.id === active.id);
      const newIndex = games.findIndex((game) => game.id === over.id);
      const newGames = arrayMove(games, oldIndex, newIndex);
      setGames(newGames);
      await updateGameOrder(newGames, active.id);
    }
  };

  return (
    <>
      {isLoading ? (
        <div className="mt-2">
          <Spinner />
        </div>
      ) : (
        <motion.ul
          className="mt-4 h-full grid grid-cols-12 gap-3 max-sm:gap-2 max-xs:grid-cols-3 max-sm:grid-cols-4 max-md:grid-cols-5 max-lg:grid-cols-6 max-xl:grid-cols-8 max-xl2:grid-cols-10"
          initial={{ y: 24, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
        >
          <DndContext
            collisionDetection={closestCenter}
            onDragEnd={onDragEnd}
            modifiers={[restrictToParentElement]}
          >
            <SortableContext items={games} strategy={rectSortingStrategy}>
              {games &&
                games.map((game) => (
                  <SortableGames key={game.id} game={game} />
                ))}
            </SortableContext>
          </DndContext>
        </motion.ul>
      )}
    </>
  );
}

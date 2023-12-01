"use client";
import { useContext } from "react";
import Image from "next/image";
import Link from "next/link";
import { WatchListContext } from "@/context/WatchListContext";
import { BsFillXCircleFill } from "react-icons/bs";
import { RiDragMove2Fill } from "react-icons/ri";
import { TinySpinner } from "../loaders";
import { motion } from "framer-motion";
import { DndContext, closestCenter } from "@dnd-kit/core";
import {
  SortableContext,
  rectSortingStrategy,
  useSortable,
  arrayMove,
} from "@dnd-kit/sortable";
import { CSS } from "@dnd-kit/utilities";

export default function WatchList() {
  const {
    movies,
    setMovies,
    removeMovieFromWatchList,
    removingMovies,
    updateMovieOrder,
    reorderingMovies,
  } = useContext(WatchListContext);

  const SortableMovies = ({ movie }) => {
    const { attributes, listeners, setNodeRef, transform, transition } =
      useSortable({ id: movie.id });

    const style = {
      transition,
      transform: CSS.Transform.toString(transform),
    };

    return (
      <li
        ref={setNodeRef}
        style={style}
        className="rounded-sm w-auto flex flex-col justify-between"
      >
        <div className="relative hover:before:bg-gray-900 before:absolute before:inset-0 before:rounded-sm hover:before:opacity-40 before:duration-300 [&>button]:hover:opacity-100 [&>button]:hover:visible select-none h-full">
          {removingMovies.includes(movie.id) ? (
            <div className="absolute right-1 top-[4px]">
              <TinySpinner />
            </div>
          ) : (
            <button
              className="opacity-0 absolute right-1 top-[4px] text-gray-200 text-xl bg-gray-800 p-px rounded-full shadow-sm cursor-pointer invisible hover:text-red-800 hover:bg-gray-300 duration-200 active:scale-90 active:duration-75"
              onClick={() => removeMovieFromWatchList(movie.id)}
            >
              <BsFillXCircleFill />
            </button>
          )}
          {reorderingMovies.includes(movie.id) ? (
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
            src={`https://image.tmdb.org/t/p/w154${movie.poster_path}`}
            alt={movie.title}
            width={100}
            height={100}
            className="object-cover rounded-sm border border-gray-800 shadow-sm w-full h-full min-h-[140px]"
          />
        </div>
        <h2 className="truncate text-gray-300 w-full text-sm">
          <Link
            href={`https://letterboxd.com/tmdb/${movie.id}`}
            target="_blank"
            rel="noopener noreferrer"
            className="w-fit hover:text-slate-200 duration-150"
          >
            {movie.title}
          </Link>
        </h2>
      </li>
    );
  };

  const onDragEnd = async (event) => {
    const { active, over } = event;
    if (active.id !== over.id) {
      const oldIndex = movies.findIndex((movie) => movie.id === active.id);
      const newIndex = movies.findIndex((movie) => movie.id === over.id);
      const newMovies = arrayMove(movies, oldIndex, newIndex);
      setMovies(newMovies);
      await updateMovieOrder(newMovies, active.id);
    }
  };

  return (
    <motion.ul
      className="mt-4 h-full grid grid-cols-12 gap-3 max-sm:gap-2 max-xs:grid-cols-3 max-sm:grid-cols-4 max-md:grid-cols-5 max-lg:grid-cols-6 max-xl:grid-cols-8 max-xl2:grid-cols-10"
      initial={{ y: 24, opacity: 0 }}
      animate={{ y: 0, opacity: 1 }}
    >
      <DndContext collisionDetection={closestCenter} onDragEnd={onDragEnd}>
        <SortableContext items={movies} strategy={rectSortingStrategy}>
          {movies &&
            movies.map((movie) => (
              <SortableMovies key={movie.id} movie={movie} />
            ))}
        </SortableContext>
      </DndContext>
    </motion.ul>
  );
}

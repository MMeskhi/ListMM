"use client";
import {
  Dialog,
  DialogClose,
  DialogContent,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";

import { usePathname } from "next/navigation";

import AddMovies from "./watchPage/addMovies";
import AddAlbums from "./listenPage/addAlbums";
import AddGames from "./playPage/addGames";

export function Modal() {
  const pathname = usePathname();

  if ("/watch".includes(pathname))
    return (
      <Dialog>
        <DialogTrigger asChild>
          <button className="text-gray-800 bg-gray-300 rounded-sm shadow-sm px-3 py-1 hover:opacity-95 active:scale-95 duration-150">
            Add
          </button>
        </DialogTrigger>
        <DialogContent className="overflow-y-auto max-h-[64vh] max-w-xl bg-gray-200 max-sm:p-3 rounded-sm border border-gray-800 z-[999]">
          <DialogHeader>
            <DialogTitle>Find The Movie</DialogTitle>
          </DialogHeader>
          <AddMovies />
          <DialogFooter className="sm:justify-start">
            <DialogClose asChild>
              <button className="bg-gray-800 text-gray-300 rounded-sm shadow-sm px-3 py-1 hover:opacity-95 active:scale-95 duration-150">
                Close
              </button>
            </DialogClose>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    );
  if ("/listen".includes(pathname))
    return (
      <Dialog>
        <DialogTrigger asChild>
          <button className="text-gray-800 bg-gray-300 rounded-sm shadow-sm px-3 py-1 hover:opacity-95 active:scale-95 duration-150">
            Add
          </button>
        </DialogTrigger>
        <DialogContent className="overflow-y-auto max-h-[64vh] max-w-xl bg-gray-200 max-sm:p-3 rounded-sm border border-gray-800 z-[999]">
          <DialogHeader>
            <DialogTitle>Find The Album</DialogTitle>
          </DialogHeader>
          <AddAlbums />
          <DialogFooter className="sm:justify-start">
            <DialogClose asChild>
              <button className="bg-gray-800 text-gray-300 rounded-sm shadow-sm px-3 py-1 hover:opacity-95 active:scale-95 duration-150">
                Close
              </button>
            </DialogClose>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    );
  if ("/play".includes(pathname))
    return (
      <Dialog>
        <DialogTrigger asChild>
          <button className="text-gray-800 bg-gray-300 rounded-sm shadow-sm px-3 py-1 hover:opacity-95 active:scale-95 duration-150">
            Add
          </button>
        </DialogTrigger>
        <DialogContent className="overflow-y-auto max-h-[64vh] max-w-xl bg-gray-200 max-sm:p-3 rounded-sm border border-gray-800 z-[999]">
          <DialogHeader>
            <DialogTitle>Find The Game</DialogTitle>
          </DialogHeader>
          <AddGames />
          <DialogFooter className="sm:justify-start">
            <DialogClose asChild>
              <button className="bg-gray-800 text-gray-300 rounded-sm shadow-sm px-3 py-1 hover:opacity-95 active:scale-95 duration-150">
                Close
              </button>
            </DialogClose>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    );
}

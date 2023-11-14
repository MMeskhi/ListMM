import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogClose,
  DialogContent,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";

import MoviesAdd from "./watchPage/moviesAdd";

export function Modal({ setSelectedMovies }) {
  return (
    <Dialog>
      <DialogTrigger asChild>
        <Button variant="outline" size="sm">
          Add
        </Button>
      </DialogTrigger>
      <DialogContent className="overflow-y-auto max-h-[60vh] max-w-xl bg-gray-200">
        <DialogHeader>
          <DialogTitle>Find The Movie</DialogTitle>
        </DialogHeader>
        <div className="flex items-center space-x-2">
          <div className="grid flex-1 gap-2">
            <MoviesAdd setSelectedMovies={setSelectedMovies} />
          </div>
        </div>
        <DialogFooter className="sm:justify-start">
          <DialogClose asChild>
            <Button type="button" variant="secondary">
              Close
            </Button>
          </DialogClose>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
}

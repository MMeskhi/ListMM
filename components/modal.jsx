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

export function Modal() {
  return (
    <Dialog>
      <DialogTrigger asChild>
        <Button variant="outline" size="sm">
          Add
        </Button>
      </DialogTrigger>
      <DialogContent className="overflow-y-auto max-h-[60vh] max-w-xl bg-gray-200 max-sm:p-3 rounded-sm">
        <DialogHeader>
          <DialogTitle>Find The Movie</DialogTitle>
        </DialogHeader>
        <MoviesAdd />
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

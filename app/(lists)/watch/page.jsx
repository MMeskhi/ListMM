import { Modal } from "@/components/modal";
import MovieList from "@/components/views/movieList";

export const metadata = {
  title: "Watch",
  description: "Watch list for movies",
};

export default function Watch() {
  return (
    <section className="">
      <Modal />
      <MovieList />
    </section>
  );
}

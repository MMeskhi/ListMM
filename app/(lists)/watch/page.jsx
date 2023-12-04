import { Modal } from "@/components/modal";
import WatchList from "@/components/watchPage/watchList";

export const metadata = {
  title: "Watch",
  description: "Watch list for movies",
};

export default function Watch() {
  return (
    <section className="">
      <Modal />
      <WatchList />
    </section>
  );
}

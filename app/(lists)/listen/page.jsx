import { Modal } from "@/components/modal";
import AlbumList from "@/components/listenPage/albumList";

export const metadata = {
  title: "Listen",
  description: "Listen list for music",
};

export default function Listen() {
  return (
    <section className="">
      <Modal />
      <AlbumList />
    </section>
  );
}

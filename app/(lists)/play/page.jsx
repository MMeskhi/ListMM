import { Modal } from "@/components/modal";
import GameList from "@/components/playPage/gameList";

export const metadata = {
  title: "Play",
  description: "Play list for games",
};

export default function Play() {
  return (
    <section className="">
      <Modal />
      <GameList />
    </section>
  );
}

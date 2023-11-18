import React, { Suspense } from "react";
import { Modal } from "@/components/modal";
import WatchList from "@/components/watchPage/watchList";
import Loading from "../loading";

export default function Watch() {
  return (
    <section className="">
      <Modal />
      <Suspense fallback={<Loading />}>
        <WatchList />
      </Suspense>
    </section>
  );
}

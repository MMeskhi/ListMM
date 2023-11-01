import React from "react";
import Movies from "@/components/movies";
import { getServerSession } from "next-auth";
import { redirectIfNotAuthenticated } from "@/lib/session";

export default async function Watch() {
  const session = await getServerSession();
  redirectIfNotAuthenticated(session);

  return (
    <section className="">
      <Movies />
    </section>
  );
}

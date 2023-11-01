import React from "react";
import { getServerSession } from "next-auth";
import { redirectIfNotAuthenticated } from "@/lib/session";

export default async function Listen() {
  const session = await getServerSession();
  redirectIfNotAuthenticated(session);

  return (
    <div>
      <h2 className="text-slate-200">Coming Soon!</h2>
    </div>
  );
}

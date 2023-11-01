import { signIn, signOut, useSession } from "next-auth/react";
import { redirect } from "next/navigation";

export function useUserSession() {
  const { status, data: session } = useSession();
  return { status, session };
}

export function userSignIn() {
  return signIn("google", {
    callbackUrl: `${window.location.origin}/watch`,
  });
}

export function userSignOut() {
  return signOut();
}

export function redirectIfNotAuthenticated(session) {
  if (!session || !session.user) {
    redirect("/");
  }
}

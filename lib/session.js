import { signIn, signOut, useSession } from "next-auth/react";

export function useUserSession() {
  const { status, data: session } = useSession();
  return { status, session };
}

export function userSignIn() {
  return signIn("google", { callbackUrl: "/watch" });
}

export function userSignOut() {
  return signOut();
}

"use client";
import { SessionProvider } from "next-auth/react";
import { Next13ProgressBar } from "next13-progressbar";

export const NextAuthProvider = ({ children }) => {
  return (
    <SessionProvider>
      <Next13ProgressBar
        height="4px"
        color="#0c4a6e"
        options={{ showSpinner: false }}
        showOnShallow={true}
        delay={500}
        startPosition={0.4}
      />
      {children}
    </SessionProvider>
  );
};

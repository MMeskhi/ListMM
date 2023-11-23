import React from "react";
import { MotionWrapper } from "./motionWrapper";

export default function MainLayout({ children }) {
  return (
    <MotionWrapper>
      <section className="overflow-auto border border-gray-800 shadow-md h-[80vh] w-full overflow-x-hidden bg-gray-950 bg-opacity-20 backdrop-blur-3xl py-4 container mx-auto px-4 max-md:px-3 max-md:py-3 board-bar">
        {children}
      </section>
    </MotionWrapper>
  );
}

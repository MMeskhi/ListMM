"use client";
import React from "react";
import { motion, AnimatePresence } from "framer-motion";

export default function Footer() {
  const madeByBox = {
    default: { y: -20, opacity: 0 },
    hover: { y: 0, opacity: 1 },
  };

  return (
    <AnimatePresence>
      <footer className="container mx-auto px-28 xl:px-20 max-w-6xl mt-8 mb-4 max-sm:hidden flex justify-center items-center relative z-[102]">
        <motion.div
          className="flex flex-col justify-center items-center w-fit relative"
          initial="default"
          whileHover="hover"
        >
          <motion.span
            className="text-gray-300 text-sm absolute -top-36 border border-gray-950 pl-4 pr-16 whitespace-nowrap py-3 bg-gray-800 bg-opacity-60 backdrop-blur-xl rounded-md shadow-sm space-y-2 [&>*]:flex [&>*]:items-center [&>p>svg]:mr-2 pointer-events-none"
            variants={madeByBox}
          >
            <p>Next.js for code</p>
            <p>Tailwind for UI</p>
            <p>GitHub for versions</p>
            <p>Vercel for host</p>
          </motion.span>
          <motion.div
            className="text-gray-300 text-opacity-95 text-center cursor-default whitespace-nowrap select-none"
            initial={{ y: 16, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            transition={{ delay: 1 }}
          >
            &copy; 2023 Mikheil Meskhi
          </motion.div>
        </motion.div>
      </footer>
    </AnimatePresence>
  );
}

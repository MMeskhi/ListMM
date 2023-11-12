"use client";
import React from "react";
import { motion } from "framer-motion";

export default function Footer() {
  const madeByBox = {
    default: { y: -20, opacity: 0 },
    hover: { y: 0, opacity: 1 },
  };

  return (
    <footer className="container mx-auto px-28 xl:px-20 max-w-6xl mt-8 mb-6 max-sm:hidden flex justify-center items-center relative z-[102]">
      <motion.div
        className="flex flex-col justify-center items-center w-fit relative"
        initial="default"
        whileHover="hover"
      >
        <motion.span
          className="text-gray-300 text-sm absolute -top-36 border border-neutral-800 pl-4 pr-16 whitespace-nowrap py-3 bg-neutral-800 bg-opacity-80 rounded-md backdrop-blur-lg shadow-sm space-y-2 [&>*]:flex [&>*]:items-center [&>p>svg]:mr-2 pointer-events-none"
          variants={madeByBox}
        >
          <p>Next.js for code</p>
          <p>Tailwind for UI</p>
          <p>GitHub for versions</p>
          <p>Vercel for host</p>
        </motion.span>
        <motion.div
          className="text-gray-300 text-opacity-95 text-center cursor-default whitespace-nowrap select-none"
          initial={{ y: 20, opacity: 0 }}
          whileInView={{ y: 0, opacity: 1 }}
          viewport={{ once: true }}
          transition={{ delay: 1 }}
        >
          &copy; 2023 Mikheil Meskhi
        </motion.div>
      </motion.div>
    </footer>
  );
}

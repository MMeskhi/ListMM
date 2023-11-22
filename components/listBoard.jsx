"use client";
import React from "react";
import { motion } from "framer-motion";

export default function MainLayout({ children }) {
  return (
    <motion.section
      className="overflow-auto border border-gray-800 shadow-md h-[80vh] w-full overflow-x-hidden bg-gray-950 bg-opacity-20 backdrop-blur-3xl py-4 container mx-auto px-4 max-md:px-3 max-md:py-3 board-bar"
      initial={{ y: 40, opacity: 0 }}
      animate={{ y: 0, opacity: 1 }}
      transition={{ delay: 0.2 }}
    >
      {children}
    </motion.section>
  );
}

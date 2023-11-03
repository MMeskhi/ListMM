"use client";
import React from "react";
import { motion } from "framer-motion";

export default function MainLayout({ children }) {
  return (
    <motion.section
      className="overflow-auto border border-gray-800 shadow-md h-[70vh] w-full bg-gray-950 bg-opacity-20 backdrop-blur-3xl py-4 container mx-auto px-4"
      initial={{ y: 20, opacity: 0 }}
      animate={{ y: 0, opacity: 1 }}
    >
      {children}
    </motion.section>
  );
}

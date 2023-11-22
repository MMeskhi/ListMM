"use client";
import React from "react";
import { motion } from "framer-motion";

export default function Intro() {
  return (
    <h1 className="text-gray-300 text-4xl flex gap-4 mt-10">
      <motion.span
        initial={{ y: 24, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
      >
        Watch
      </motion.span>
      <motion.span
        initial={{ y: -24, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
      >
        Listen
      </motion.span>
      <motion.span
        initial={{ y: 24, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
      >
        Play
      </motion.span>
    </h1>
  );
}

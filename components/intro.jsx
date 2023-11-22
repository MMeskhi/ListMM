"use client";
import React from "react";
import { motion } from "framer-motion";

export default function Intro() {
  return (
    <h1 className="text-gray-300 text-4xl flex gap-4 mt-10">
      <motion.span
        initial={{ y: 24, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        transition={{ delay: 0.1 }}
        className="relative"
      >
        Watch
      </motion.span>
      <motion.span
        initial={{ y: -24, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        transition={{ delay: 0.4 }}
        className="relative"
      >
        Listen
      </motion.span>
      <motion.span
        initial={{ y: 24, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        transition={{ delay: 0.7 }}
        className="relative"
      >
        Play
      </motion.span>
    </h1>
  );
}

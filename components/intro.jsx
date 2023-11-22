"use client";
import React from "react";
import { motion } from "framer-motion";

export default function Intro() {
  return (
    <h1 className="text-gray-300 text-4xl flex gap-4 mt-10">
      <motion.span
        initial={{ scale: 0.24, opacity: 0 }}
        animate={{ scale: 1, opacity: 1 }}
        transition={{ delay: 0.1 }}
      >
        Watch
      </motion.span>
      <motion.span
        initial={{ scale: 0.24, opacity: 0 }}
        animate={{ scale: 1, opacity: 1 }}
        transition={{ delay: 0.4 }}
      >
        Listen
      </motion.span>
      <motion.span
        initial={{ scale: 0.24, opacity: 0 }}
        animate={{ scale: 1, opacity: 1 }}
        transition={{ delay: 0.7 }}
      >
        Play
      </motion.span>
    </h1>
  );
}

"use client";
import React from "react";
import { motion } from "framer-motion";

export default function Intro() {
  return (
    <h1 className="text-gray-300 text-3xl flex gap-4 mt-10">
      <motion.span
        initial={{ y: 24, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        transition={{ delay: 0.1 }}
      >
        Watch
      </motion.span>
      <motion.span
        initial={{ y: -24, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        transition={{ delay: 0.3 }}
      >
        Listen
      </motion.span>
      <motion.span
        initial={{ y: 24, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        transition={{ delay: 0.5 }}
      >
        Play
      </motion.span>
    </h1>
  );
}

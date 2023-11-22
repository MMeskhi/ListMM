"use client";
import React from "react";
import { motion } from "framer-motion";

export default function Intro() {
  return (
    <div className="text-gray-300 text-4xl flex gap-4 mt-10">
      <motion.div
        initial={{ y: 24, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        transition={{ delay: 0.1 }}
      >
        Watch
      </motion.div>
      <motion.div
        initial={{ y: -24, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        transition={{ delay: 0.4 }}
      >
        Listen
      </motion.div>
      <motion.div
        initial={{ y: 24, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        transition={{ delay: 0.7 }}
      >
        Play
      </motion.div>
    </div>
  );
}

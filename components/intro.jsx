"use client";
import React from "react";
import { motion } from "framer-motion";

export default function Intro() {
  return (
    <div className="mt-10">
      <h1 className="text-slate-200 text-4xl flex gap-4">
        <motion.span
          initial={{ y: 40, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          transition={{ delay: 0.1 }}
        >
          Watch
        </motion.span>
        <motion.span
          initial={{ y: -40, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          transition={{ delay: 0.4 }}
        >
          Listen
        </motion.span>
        <motion.span
          initial={{ y: 40, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          transition={{ delay: 0.7 }}
        >
          Play
        </motion.span>
      </h1>
    </div>
  );
}

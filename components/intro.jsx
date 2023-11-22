"use client";
import React from "react";
import { motion } from "framer-motion";

export default function Intro() {
  return (
    <motion.h1
      className="text-gray-300 text-4xl flex gap-4 mt-10"
      initial={{ scale: 0.4, opacity: 0 }}
      animate={{ scale: 1, opacity: 1 }}
      transition={{ delay: 0.4 }}
    >
      <span>Watch</span>
      <span>Listen</span>
      <span>Play</span>
    </motion.h1>
  );
}

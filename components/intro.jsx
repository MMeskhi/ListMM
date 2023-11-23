"use client";
import React, { useRef } from "react";
import { motion, useInView } from "framer-motion";

export default function Intro() {
  const ref = useRef(null);
  const isInView = useInView(ref);

  return (
    <div className="flex flex-col gap-10">
      <h1 className="text-gray-300 text-4xl flex gap-4 mt-10">
        <motion.span
          initial={{ y: 24, opacity: 0 }}
          whileInView={{ y: 0, opacity: 1 }}
          transition={{ delay: 0.1 }}
        >
          Watch
        </motion.span>
        <motion.span
          initial={{ y: -24, opacity: 0 }}
          whileInView={{ y: 0, opacity: 1 }}
          transition={{ delay: 0.4 }}
        >
          Listen
        </motion.span>
        <motion.span
          initial={{ y: 24, opacity: 0 }}
          whileInView={{ y: 0, opacity: 1 }}
          transition={{ delay: 0.7 }}
        >
          Play
        </motion.span>
      </h1>

      <motion.div
        ref={ref}
        className="text-gray-300 text-4xl bg-gray-950 rounded-md p-4 py-10 mt-96"
        animate={{ y: isInView ? 0 : 40 }}
      ></motion.div>
    </div>
  );
}

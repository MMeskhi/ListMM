"use client";

import { motion, AnimatePresence } from "framer-motion";

export const MotionWrapper = ({ children }) => {
  return (
    <AnimatePresence>
      <motion.div
        initial={{ y: 24, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        exit={{ y: 24, opacity: 0 }}
        transition={{ delay: 0.2 }}
      >
        {children}
      </motion.div>
    </AnimatePresence>
  );
};

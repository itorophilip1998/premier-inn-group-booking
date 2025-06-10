"use client";

import { motion } from "framer-motion";

export const Logo = () => {
  return (
    <motion.div
      initial={{ opacity: 0, y: -20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.8, ease: "easeOut" }}
      className="flex items-center justify-center"
    >
      <motion.div
        whileHover={{ scale: 1.05 }}
        whileTap={{ scale: 0.95 }}
        className="relative"
      >
        <motion.div
          className="absolute -top-2 left-0 w-full h-1 bg-blue-600"
          initial={{ scaleX: 0 }}
          animate={{ scaleX: [0, 1, 0] }}
          transition={{ duration: 2, repeat: Infinity, ease: "easeInOut" }}
        />
        <motion.h1
          className="text-2xl font-bold text-gray-600 sm:text-3xl md:text-4xl"
          initial={{ letterSpacing: "0.5em" }}
          animate={{ letterSpacing: ["0.5em", "0.1em", "0.5em"] }}
          transition={{ duration: 2, repeat: Infinity, ease: "easeInOut" }}
        >
          Premier Inn
        </motion.h1>
        <motion.div
          className="absolute -bottom-2 right-0 w-full h-1 bg-blue-600"
          initial={{ scaleX: 0 }}
          animate={{ scaleX: [0, 1, 0] }}
          transition={{ duration: 2, repeat: Infinity, ease: "easeInOut" }}
        />
      </motion.div>
    </motion.div>
  );
};

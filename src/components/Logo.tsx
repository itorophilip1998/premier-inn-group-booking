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
        animate={{
          y: [0, -10, 0],
          scale: [1, 1.05, 1],
        }}
        transition={{
          duration: 4,
          ease: "easeInOut",
          repeat: Infinity,
          repeatType: "reverse",
        }}
      >
        <motion.div
          className="absolute -top-2 left-0 w-full h-1 bg-blue-600"
          initial={{ scaleX: 0 }}
          animate={{ scaleX: 1 }}
          transition={{ duration: 0.8, delay: 0.5 }}
        />
        <motion.h1
          className="text-2xl font-bold text-gray-600 sm:text-3xl md:text-4xl"
          initial={{ letterSpacing: "0.5em" }}
          animate={{ letterSpacing: "0.1em" }}
          transition={{ duration: 1, ease: "easeOut" }}
        >
          Premier Inn
        </motion.h1>
        <motion.div
          className="absolute -bottom-2 right-0 w-full h-1 bg-blue-600"
          initial={{ scaleX: 0 }}
          animate={{ scaleX: 1 }}
          transition={{ duration: 0.8, delay: 0.5 }}
        />
      </motion.div>
    </motion.div>
  );
};

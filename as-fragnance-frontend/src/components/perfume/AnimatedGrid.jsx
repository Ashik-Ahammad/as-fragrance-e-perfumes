"use client";
import React from "react";
import { motion } from "framer-motion";

export default function AnimatedGrid({ children }) {
  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: { staggerChildren: 0.1 },
    },
  };

  const itemVariants = {
    hidden: { opacity: 0, y: 30 },
    visible: { opacity: 1, y: 0, transition: { duration: 0.5, ease: "easeOut" } },
  };

  return (
    <motion.div
      className="w-full grid lg:grid-cols-3 md:grid-cols-2 sm:grid-cols-1 gap-4"
      variants={containerVariants}
      initial="hidden"
      whileInView="visible"
      viewport={{ once: true, margin: "-50px" }}
    >
      {React.Children.map(children, (child) => (
        <motion.div key={child.key} variants={itemVariants}>
          {child}
        </motion.div>
      ))}
    </motion.div>
  );
}

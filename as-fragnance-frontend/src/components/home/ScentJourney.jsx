"use client";
import React from "react";
import { motion } from "framer-motion";
import { FaWind } from "react-icons/fa6";
import { HiOutlineSparkles } from "react-icons/hi2";
import { LuDroplets } from "react-icons/lu";
import { IoIosLeaf } from "react-icons/io";

const scents = [
  {
    title: "Woody & Earthy",
    desc: "Deep, mysterious and grounded. Perfect for evening elegance.",
    icon: <IoIosLeaf  className="w-8 h-8" />,
    gradient: "from-amber-600 to-amber-800",
  },
  {
    title: "Floral & Sweet",
    desc: "Fresh, romantic and delicate. Inspired by blooming gardens.",
    icon: <HiOutlineSparkles  className="w-8 h-8" />,
    gradient: "from-rose-500 to-rose-700",
  },
  {
    title: "Fresh & Aquatic",
    desc: "Clean, breezy and revitalizing. Great for daily wear.",
    icon: <LuDroplets  className="w-8 h-8" />,
    gradient: "from-blue-500 to-cyan-600",
  },
  {
    title: "Spicy & Intense",
    desc: "Bold, warm and energetic. Leaves a lasting impression.",
    icon: <FaWind className="w-8 h-8" />,
    gradient: "from-orange-500 to-red-600",
  },
];

export default function ScentJourney() {

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: { staggerChildren: 0.15 },
    },
  };

  const itemVariants = {
    hidden: { opacity: 0, y: 30 },
    visible: {
      opacity: 1,
      y: 0,
      transition: { duration: 0.6, ease: "easeOut" },
    },
  };

  return (
    <section className="py-24 bg-[#fcfaf8]">
      <div className="max-w-7xl mx-auto px-6 lg:px-8">
        <div className="text-center mb-16">
          <h2 className="text-3xl md:text-4xl font-serif text-stone-900 mb-4">
            Find Your Signature Scent
          </h2>
          <p className="text-stone-500 font-light max-w-xl mx-auto">
            Choose the olfactory profile that resonates with your personality.
          </p>
        </div>

        <motion.div
          className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6"
          variants={containerVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, amount: 0.2 }}
        >
          {scents.map((scent, index) => (
            <motion.div
              key={index}
              variants={itemVariants}
              whileHover={{
                y: -10,
                borderColor: "#d97706",
                boxShadow: "0 20px 40px -5px rgba(217, 119, 6, 0.1)"
              }}
              className="bg-white p-8 rounded-[2rem] border border-stone-200 transition-all duration-300 text-center flex flex-col items-center group cursor-pointer"
            >
              <motion.div
                className="mb-6 opacity-80 text-stone-600 group-hover:text-amber-600 transition-colors duration-300"
                whileHover={{ scale: 1.15, rotate: 5 }}
              >
                {scent.icon}
              </motion.div>

              <h3 className="text-lg font-bold text-stone-900 mb-2 uppercase tracking-widest">{scent.title}</h3>

              <div className="w-8 h-px bg-amber-600 my-4 group-hover:w-16 transition-all duration-500" />

              <p className="text-stone-500 text-sm font-light mb-6">{scent.desc}</p>
            </motion.div>
          ))}
        </motion.div>
      </div>
    </section>
  );
}
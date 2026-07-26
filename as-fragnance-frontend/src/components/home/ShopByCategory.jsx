"use client";
import React from "react";
import Image from "next/image";
import Link from "next/link";
import { motion } from "framer-motion";
import { FiArrowRight } from "react-icons/fi";

const categories = [
  {
    name: "Oud",
    description: "Deep, mysterious, and long-lasting woody notes.",
    image: "https://images.unsplash.com/photo-1615557960916-5f4791effe9d?q=80&w=800",
    link: "/shop?category=Oud",
    colSpan: "col-span-1 md:col-span-2",
    rowSpan: "row-span-2",
  },
  {
    name: "Floral",
    description: "Soft, romantic, and elegant blossoming scents.",
    image: "https://images.unsplash.com/photo-1596462502278-27bfdc403348?q=80&w=800",
    link: "/shop?category=Floral",
    colSpan: "col-span-1",
    rowSpan: "row-span-1",
  },
  {
    name: "Citrus",
    description: "Fresh, vibrant, and energetic zesty aromas.",
    image: "https://images.unsplash.com/photo-1611078775432-8f192b0051e5?q=80&w=800",
    link: "/shop?category=Citrus",
    colSpan: "col-span-1",
    rowSpan: "row-span-1",
  },
  {
    name: "Musk",
    description: "Sensual, warm, and sophisticated base notes.",
    image: "https://images.unsplash.com/photo-1590159762955-44249a5b3a4a?q=80&w=800",
    link: "/shop?category=Musk",
    colSpan: "col-span-1 md:col-span-2",
    rowSpan: "row-span-1",
  },
];

export default function ShopByCategory() {
  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: { staggerChildren: 0.15 },
    },
  };

  const itemVariants = {
    hidden: { opacity: 0, y: 30 },
    visible: { opacity: 1, y: 0, transition: { duration: 0.6, ease: "easeOut" } },
  };

  return (
    <section className="py-24 bg-white relative overflow-hidden">
      <div className="max-w-7xl mx-auto px-6 lg:px-8">
        <div className="flex flex-col md:flex-row justify-between items-end mb-16 gap-6">
          <div className="max-w-2xl">
            <h2 className="text-sm font-bold text-amber-600 tracking-[0.2em] uppercase mb-3">
              Olfactive Families
            </h2>
            <h3 className="text-4xl md:text-5xl font-serif text-zinc-900 leading-tight">
              Shop by <span className="italic text-zinc-400">Category</span>
            </h3>
          </div>
          <Link
            href="/shop"
            className="group flex items-center gap-2 text-sm font-semibold uppercase tracking-widest text-zinc-900 hover:text-amber-600 transition-colors"
          >
            Explore All 
            <FiArrowRight className="group-hover:translate-x-1 transition-transform" />
          </Link>
        </div>

        <motion.div 
          className="grid grid-cols-1 md:grid-cols-4 grid-rows-none md:grid-rows-2 gap-4 h-auto md:h-[600px]"
          variants={containerVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: "-100px" }}
        >
          {categories.map((category, index) => (
            <motion.div
              key={category.name}
              variants={itemVariants}
              className={`group relative overflow-hidden rounded-2xl ${category.colSpan} ${category.rowSpan} min-h-[250px]`}
            >
              <Link href={category.link} className="block w-full h-full">
                <div className="absolute inset-0 bg-black/20 group-hover:bg-black/40 transition-colors duration-500 z-10" />
                <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/20 to-transparent z-10" />
                
                <Image
                  src={category.image}
                  alt={category.name}
                  fill
                  className="object-cover transition-transform duration-700 group-hover:scale-110"
                />

                <div className="absolute bottom-0 left-0 p-8 z-20 w-full transform translate-y-4 group-hover:translate-y-0 transition-transform duration-500">
                  <h4 className="text-2xl md:text-3xl font-serif text-white mb-2">
                    {category.name}
                  </h4>
                  <p className="text-sm text-zinc-300 opacity-0 group-hover:opacity-100 transition-opacity duration-500 delay-100 hidden md:block">
                    {category.description}
                  </p>
                </div>
              </Link>
            </motion.div>
          ))}
        </motion.div>
      </div>
    </section>
  );
}

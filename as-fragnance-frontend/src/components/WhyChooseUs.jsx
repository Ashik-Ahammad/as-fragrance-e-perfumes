"use client";
import React from "react";
import { motion } from "framer-motion";
import { FiShield, FiZap, FiPackage, FiAward } from "react-icons/fi";

const commitments = [
  {
    icon: <FiShield />,
    title: "100% Original Oil",
    desc: "We source our fragrance oils from top-tier global suppliers, ensuring pure and authentic quality.",
  },
  {
    icon: <FiAward />,
    title: "Long Lasting Guarantee",
    desc: "Our concentration techniques ensure that your signature scent lingers for hours.",
  },
  {
    icon: <FiZap />,
    title: "Fast Delivery",
    desc: "Your luxury order is packed with care and dispatched immediately to your doorstep.",
  },
  {
    icon: <FiPackage />,
    title: "Premium Packaging",
    desc: "Every bottle is encased in bespoke packaging, making it an experience, not just a purchase.",
  },
];

export default function WhyChooseUs() {
  const container = {
    hidden: { opacity: 0 },
    visible: { opacity: 1, transition: { staggerChildren: 0.2 } },
  };

  const item = {
    hidden: { opacity: 0, y: 30 },
    visible: { opacity: 1, y: 0, transition: { duration: 0.6, ease: "easeOut" } },
  };

  return (
    <section className="py-24 bg-[#fcfaf8]">
      <div className="max-w-7xl mx-auto px-6 lg:px-8">

        {/* --- TITLE SECTION --- */}
        <div className="text-center mb-16">
          <span className="text-[10px] font-bold text-amber-600 uppercase tracking-[0.25em] block mb-3">
            Why Choose AS Fragrance
          </span>
          <h2 className="text-3xl md:text-4xl font-serif text-stone-900 mb-4">
            Our Commitment to Excellence
          </h2>
          <p className="text-stone-500 font-light max-w-xl mx-auto text-sm leading-relaxed">
            Experience the difference with our authentic collection and dedicated service.
          </p>
        </div>

        {/* --- CARDS SECTION --- */}
        <motion.div
          variants={container}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, amount: 0.3 }}
          className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8"
        >
          {commitments.map((itemData, index) => (
            <motion.div
              key={index}
              variants={item}
              className="flex flex-col items-center text-center p-8 space-y-4 hover:bg-stone-50 rounded-[2rem] transition-all duration-300 group border border-transparent hover:border-stone-100"
            >
              {/* Icon Container */}
              <div className="w-16 h-16 bg-amber-50 rounded-2xl flex items-center justify-center text-amber-600 mb-2 text-2xl group-hover:scale-110 transition-transform duration-300">
                {itemData.icon}
              </div>

              <h3 className="text-lg font-serif text-stone-900 tracking-wide pt-2">
                {itemData.title}
              </h3>

              <p className="text-sm text-stone-500 font-light leading-relaxed max-w-55">
                {itemData.desc}
              </p>
            </motion.div>
          ))}
        </motion.div>
      </div>
    </section>
  );
}
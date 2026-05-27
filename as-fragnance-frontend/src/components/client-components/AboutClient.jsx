"use client";
import React from "react";
import Image from "next/image";
import { motion } from "framer-motion";
import {
  FiDroplet,
  FiAward,
  FiGlobe,
  FiStar,
  FiShield,
  FiHeart,
} from "react-icons/fi";
import { BiBookOpen } from "react-icons/bi";
import { FaBookmark } from "react-icons/fa";

export default function AboutClient() {

  const fadeUp = {
    hidden: { opacity: 0, y: 40 },
    visible: {
      opacity: 1,
      y: 0,
      transition: { duration: 0.8, ease: "easeOut" },
    },
  };

  const staggerContainer = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: { staggerChildren: 0.2 },
    },
  };

  const scaleIn = {
    hidden: { opacity: 0, scale: 0.9 },
    visible: {
      opacity: 1,
      scale: 1,
      transition: { duration: 0.8, ease: "easeOut" },
    },
  };

  const slideRight = {
    hidden: { opacity: 0, x: -50 },
    visible: {
      opacity: 1,
      x: 0,
      transition: { duration: 0.8, ease: "easeOut" },
    },
  };

  const slideLeft = {
    hidden: { opacity: 0, x: 50 },
    visible: {
      opacity: 1,
      x: 0,
      transition: { duration: 0.8, ease: "easeOut" },
    },
  };

  return (
    <div className="bg-[radial-gradient(ellipse_at_top,var(--tw-gradient-stops))] from-amber-50 via-stone-50 to-white min-h-screen text-stone-700 font-sans overflow-hidden pt-24 pb-16">

      <section className="relative px-6 lg:px-8 max-w-7xl mx-auto mb-24 md:mb-36 text-center">
        <div className="absolute top-0 left-1/2 -translate-x-1/2 opacity-5 pointer-events-none select-none">
          <svg
            width="400"
            height="400"
            viewBox="0 0 100 100"
            fill="none"
            stroke="currentColor"
          >
            <polygon points="50,0 65,35 100,50 65,65 50,100 35,65 0,50 35,35" />
            <polygon points="50,15 60,40 85,50 60,60 50,85 40,60 15,50 40,40" />
          </svg>
        </div>

        <motion.div
          initial="hidden"
          animate="visible"
          variants={staggerContainer}
          className="max-w-3xl mx-auto relative z-10"
        >
          <motion.p
            variants={fadeUp}
            className="text-amber-600 font-bold tracking-[0.2em] uppercase text-xs md:text-sm mb-4"
          >
            Our Legacy & Spiritual Values
          </motion.p>
          <motion.h1
            variants={fadeUp}
            className="text-4xl md:text-6xl lg:text-7xl font-serif text-stone-900 mb-6 leading-tight"
          >
            Honoring the Sunnah <br />{" "}
            <span className="text-amber-700 italic">
              Through Premium Scents
            </span>
          </motion.h1>
          <motion.p
            variants={fadeUp}
            className="text-sm md:text-base lg:text-lg text-stone-600 leading-relaxed font-light"
          >
            At A S Fragrance, our journey is rooted in deep spiritual tradition.
            Fragrance is not merely a statement of luxury; it is a beloved
            Sunnah and an expression of purity, refinement, and mutual respect.
          </motion.p>
        </motion.div>
      </section>

      <section className="px-6 lg:px-8 max-w-5xl mx-auto mb-24 md:mb-36">
        <motion.div
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, amount: 0.3 }}
          variants={scaleIn}
          className="bg-linear-to-br from-amber-100/70 via-stone-100/50 to-amber-50/40 rounded-3xl p-8 md:p-12 border border-amber-200/50 text-center relative overflow-hidden shadow-xl shadow-amber-900/5 group"
        >
          <div className="absolute top-4 left-4 text-amber-200/40">
            <BiBookOpen className="text-7xl md:text-9xl" />
          </div>

          <div className="relative z-10 max-w-2xl mx-auto">
            <span className="inline-block px-4 py-1 rounded-full bg-amber-600/10 text-amber-700 text-xs font-semibold tracking-wider uppercase mb-6">
              Sahih Hadith on Fragrance
            </span>
            <p className="font-serif text-xl md:text-2xl text-stone-900 italic leading-relaxed mb-6">
              "حُبِّبَ إِلَيَّ مِنَ الدُّنْيَا النِّسَاءُ وَالطِّيبُ وَجُعِلَتْ
              قُرَّةُ عَيْنِي فِي الصَّلَاةِ"
            </p>
            <p className="text-base md:text-lg text-stone-800 font-medium mb-4 leading-relaxed">
              {`The Messenger ﷺ of Allah ﷻ said: In this world, women and perfume
              have been made dear to me, and my comfort has been provided in
              prayer.`}
            </p>
            <a
              href="https://sunnah.com/nasai:3939"
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-2 text-xs tracking-wider uppercase text-amber-700 font-bold hover:text-amber-500 transition-colors bg-amber-600/5 hover:bg-amber-600/10 px-4 py-2 rounded-full mt-2 animate-pulse"
            >
              <FaBookmark className="text-[10px]" /> Verified on Sunnah.com —
              Sunan an-Nasa`i 3939
            </a>
          </div>
        </motion.div>
      </section>

      <section className="relative px-6 lg:px-8 max-w-7xl mx-auto mb-24 md:mb-36">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-12 lg:gap-20 items-center">

          <motion.div
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, amount: 0.3 }}
            variants={slideRight}
            className="relative h-100 md:h-137.5 w-full rounded-3xl overflow-hidden group shadow-2xl shadow-stone-300"
          >
            <div className="absolute inset-0 bg-linear-to-t from-white/40 via-transparent to-transparent z-10"></div>
            <Image
              src="/assets/meskamber.png"
              alt="A S Fragrance Story"
              fill
              className="object-cover object-center group-hover:scale-110 transition-transform duration-1000 ease-in-out"
            />
            <div className="absolute inset-0 border-4 border-white/40 rounded-3xl z-20"></div>
          </motion.div>

          <motion.div
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, amount: 0.3 }}
            variants={slideLeft}
            className="flex flex-col justify-center"
          >
            <h2 className="text-3xl md:text-5xl font-serif text-stone-900 mb-6 leading-tight">
              The Pursuit of <br />{" "}
              <span className="text-amber-700">Pure Craftsmanship</span>
            </h2>
            <p className="text-stone-600 mb-6 text-sm md:text-base font-light leading-relaxed">
              Founded with an unwavering vision, A S Fragrance bridges global
              luxury with sacred eastern traditions. We travel the globe, source
              ethical ingredients, and curate olfactory collections ranging from
              deep royal ouds to modern fresh notes.
            </p>
            <p className="text-stone-600 mb-8 text-sm md:text-base font-light leading-relaxed">
              We operate under strict ethical benchmarks, believing that trade
              is a sacred trust. Our goal is to serve our community with
              unparalleled transparency while preserving the historic nobility
              of perfumery.
            </p>

            <div className="grid grid-cols-2 gap-6 border-t border-amber-200/60 pt-8 mt-4">
              <div>
                <h4 className="text-4xl font-serif text-amber-700 mb-2">20+</h4>
                <p className="text-xs font-semibold tracking-widest uppercase text-stone-500">
                  Curated Brands
                </p>
              </div>
              <div>
                <h4 className="text-4xl font-serif text-amber-700 mb-2">3k+</h4>
                <p className="text-xs font-semibold tracking-widest uppercase text-stone-500">
                  Satisfied Patrons
                </p>
              </div>
            </div>
          </motion.div>
        </div>
      </section>

      <section className="px-6 lg:px-8 max-w-7xl mx-auto mb-24 md:mb-36">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 items-stretch">
          <motion.div
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true }}
            variants={scaleIn}
            className="md:col-span-1 bg-stone-900 text-stone-100 p-8 rounded-3xl flex flex-col justify-between border border-stone-800 shadow-xl"
          >
            <div>
              <span className="text-[10px] tracking-[0.2em] font-bold text-amber-400 uppercase block mb-4">
                Quranic Guidance
              </span>
              <h3 className="text-2xl font-serif text-white mb-6">
                Honesty & Goodwill in Business
              </h3>
            </div>
            <p className="text-sm text-stone-400 leading-relaxed font-light italic">
              O believers! Do not devour one another’s wealth illegally, but
              rather trade by mutual consent. And do not kill ˹each other or˺
              yourselves. Surely Allah is ever Merciful to you.
              <br />
              <span className="text-xs font-sans tracking-wide block mt-4 text-amber-400/70 not-italic font-semibold">
                <a href="https://quran.com/an-nisa/29" target="_blank">— Surah An-Nisa, 4:29</a>
              </span>
            </p>
          </motion.div>
          <motion.div
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true }}
            variants={scaleIn}
            className="md:col-span-2 bg-white/70 backdrop-blur-md p-8 md:p-10 rounded-3xl border border-stone-200 shadow-xl flex flex-col justify-center"
          >
            <h4 className="text-xl font-serif text-stone-900 mb-4">
              The Principle of Amanah
            </h4>
            <p className="text-sm md:text-base text-stone-600 font-light leading-relaxed mb-6">
              Our business philosophy strictly adheres to Islamic guidelines
              regarding fair trade, clear transparency, and mutual satisfaction.
              Prophetic history teaches us that an honest, truthful merchant
              will be aligned with the righteous. We firmly stand against
              counterfeit items, deceptive dilutions, or misleading pricing.
            </p>
            <div className="flex flex-wrap gap-4 items-center">
              <div className="flex items-center gap-2 text-xs bg-amber-100 text-amber-800 px-3 py-1.5 rounded-full font-medium">
                <FiShield className="shrink-0" /> Absolute Authenticity
              </div>
              <div className="flex items-center gap-2 text-xs bg-stone-100 text-stone-800 px-3 py-1.5 rounded-full font-medium">
                <FiHeart className="shrink-0" /> Customer Amanah
              </div>
            </div>
          </motion.div>
        </div>
      </section>

      <section className="relative px-6 lg:px-8 max-w-7xl mx-auto">
        <motion.div
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, amount: 0.2 }}
          variants={fadeUp}
          className="text-center mb-16"
        >
          <h2 className="text-3xl md:text-5xl font-serif text-stone-900 mb-4">
            Our Core Philosophy
          </h2>
          <p className="text-stone-500 max-w-2xl mx-auto font-light">
            The foundational pillars that make A S Fragrance a trusted sanctuary
            for premium scents.
          </p>
        </motion.div>

        <motion.div
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, amount: 0.2 }}
          variants={staggerContainer}
          className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6"
        >
          <motion.div
            variants={scaleIn}
            className="group p-8 rounded-3xl bg-white/60 backdrop-blur-md border border-white hover:border-amber-300 shadow-xl shadow-stone-200/40 hover:shadow-amber-200/40 hover:-translate-y-2 transition-all duration-500"
          >
            <div className="w-14 h-14 rounded-full bg-linear-to-br from-amber-100 to-rose-100 border border-amber-200 flex items-center justify-center mb-6 group-hover:scale-110 group-hover:rotate-6 transition-all duration-500">
              <FiDroplet className="text-2xl text-amber-600" />
            </div>
            <h3 className="text-xl text-stone-900 font-serif mb-3">
              Pure Essences
            </h3>
            <p className="text-sm text-stone-500 leading-relaxed font-light">
              We guarantee 100% authentic products sourced directly from
              manufacturers and trusted distributors.
            </p>
          </motion.div>
          <motion.div
            variants={scaleIn}
            className="group p-8 rounded-3xl bg-white/60 backdrop-blur-md border border-white hover:border-amber-300 shadow-xl shadow-stone-200/40 hover:shadow-amber-200/40 hover:-translate-y-2 transition-all duration-500"
          >
            <div className="w-14 h-14 rounded-full bg-linear-to-br from-stone-100 to-amber-100 border border-amber-200 flex items-center justify-center mb-6 group-hover:scale-110 group-hover:rotate-6 transition-all duration-500">
              <FiAward className="text-2xl text-amber-700" />
            </div>
            <h3 className="text-xl text-stone-900 font-serif mb-3">
              Unmatched Quality
            </h3>
            <p className="text-sm text-stone-500 leading-relaxed font-light">
              Our collection undergoes rigorous selection to ensure only the
              highest longevity and projection.
            </p>
          </motion.div>

          <motion.div
            variants={scaleIn}
            className="group p-8 rounded-3xl bg-white/60 backdrop-blur-md border border-white hover:border-amber-300 shadow-xl shadow-stone-200/40 hover:shadow-amber-200/40 hover:-translate-y-2 transition-all duration-500"
          >
            <div className="w-14 h-14 rounded-full bg-linear-to-br from-amber-50 to-stone-100 border border-stone-200 flex items-center justify-center mb-6 group-hover:scale-110 group-hover:-rotate-6 transition-all duration-500">
              <FiGlobe className="text-2xl text-stone-600" />
            </div>
            <h3 className="text-xl text-stone-900 font-serif mb-3">
              Global Curation
            </h3>
            <p className="text-sm text-stone-500 leading-relaxed font-light">
              From Arabian Ouds to French designer releases, we bring the global
              fragrance market to your doorstep.
            </p>
          </motion.div>

          <motion.div
            variants={scaleIn}
            className="group p-8 rounded-3xl bg-white/60 backdrop-blur-md border border-white hover:border-amber-300 shadow-xl shadow-stone-200/40 hover:shadow-amber-200/40 hover:-translate-y-2 transition-all duration-500"
          >
            <div className="w-14 h-14 rounded-full bg-linear-to-br from-amber-100 to-amber-50 border border-amber-200 flex items-center justify-center mb-6 group-hover:scale-110 group-hover:rotate-6 transition-all duration-500">
              <FiStar className="text-2xl text-amber-600" />
            </div>
            <h3 className="text-xl text-stone-900 font-serif mb-3">
              Luxury Experience
            </h3>
            <p className="text-sm text-stone-500 leading-relaxed font-light">
              From unboxing to the final spritz, we ensure your shopping
              experience feels as luxurious as the scent itself.
            </p>
          </motion.div>
        </motion.div>
      </section>
    </div>
  );
}
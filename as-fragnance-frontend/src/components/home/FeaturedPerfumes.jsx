import React from "react";
import Link from "next/link";
import PerfumeCard from "../perfume/PerfumeCard";
import { FiArrowRight } from "react-icons/fi";

const FeaturedPerfumes = async () => {

  let featuredPerfumes = [];
  try {
    const res = await fetch(`${process.env.NEXT_PUBLIC_SERVER_URL}/perfume`, {
      next: { revalidate: 60 },
    });

    if (res.ok) {
      const allPerfumes = await res.json();

      featuredPerfumes = allPerfumes.slice(0, 6);
    }
  } catch (error) {
    console.error("Error fetching featured perfumes:", error);
  }

  if (!featuredPerfumes || featuredPerfumes.length === 0) {
    return (
      <section className="py-24 bg-white flex flex-col items-center justify-center text-center">
        <h2 className="text-3xl font-serif text-stone-900 mb-4">
          Perfumes Unavailable
        </h2>
        <p className="text-stone-500 font-light">
          Please ensure your database is running and contains products.
        </p>
      </section>
    );
  }

  return (
    <section className="bg-[#fcfaf8] py-20 px-4 sm:px-6 lg:px-8 border-t border-stone-100 relative overflow-hidden">

      <div className="absolute top-0 left-0 w-[800px] h-[800px] bg-orange-100/30 rounded-full blur-[120px] pointer-events-none -translate-x-1/2 -translate-y-1/2"></div>
      <div className="absolute bottom-0 right-0 w-[600px] h-[600px] bg-amber-100/30 rounded-full blur-[100px] pointer-events-none translate-x-1/3 translate-y-1/3"></div>

      <div className="max-w-7xl mx-auto relative z-10">

        <div className="flex flex-col sm:flex-row sm:items-end justify-between gap-6 mb-16">
          <div className="max-w-2xl">
            <span className="text-[10px] font-bold text-orange-500 uppercase tracking-[0.25em] block mb-3">
              Curated Selection
            </span>
            <h2 className="text-3xl md:text-5xl font-serif text-stone-900 mb-4 tracking-tight">
              Featured Perfume Oils
            </h2>
            <p className="text-stone-500 font-light text-sm leading-relaxed max-w-md">
              Discover our most sought-after signature blends. Handcrafted with
              the finest raw materials for an unforgettable olfactory
              experience.
            </p>
          </div>

          <Link
            href="/shop"
            className="group flex items-center gap-2 text-xs font-bold text-stone-900 uppercase tracking-widest hover:text-orange-600 transition-colors pb-1 border-b-2 border-transparent hover:border-orange-300"
          >
            <span>View Entire Collection</span>
            <FiArrowRight className="text-base transition-transform duration-300 group-hover:translate-x-1" />
          </Link>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8 xl:gap-10">
          {featuredPerfumes.map((perfume) => (
            <div key={perfume._id} className="h-full">
              
              <PerfumeCard perfume={perfume} />
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default FeaturedPerfumes;

import PerfumeCard from "@/components/PerfumeCard";
import PerfumeSearchFilter from "@/components/PerfumeSearchFilter";
import React from "react";

export const metadata = {
  title: "Shop Premium Perfumes & Attars",
  description:
    "Browse our exclusive collection of premium perfumes, attars, and luxury fragrances. Find long-lasting signature scents at AS Fragrance. Authentic, Original Perfume Oil, Original Attar",

  alternates: {
    canonical: "/shop",
  },

  openGraph: {
    title: "Shop Premium Perfumes | AS Fragrance",
    description:
      "Explore our meticulously curated selection of premium fragrances. From woody ouds to fresh aquatic notes, find your perfect match.",
    url: "/shop",
  },
};

const ShopPage = async ({ searchParams }) => {

  const params = await searchParams;
  const search = params?.search || "";
  const category = params?.category || "All";

  const res = await fetch(
    `${process.env.NEXT_PUBLIC_SERVER_URL}/perfume?search=${encodeURIComponent(search)}&category=${encodeURIComponent(category)}`,
    {
      next: {
        revalidate: 300,
      },
    },
  );

  const perfumes = await res.json();

  return (
    <div className="bg-white min-h-screen text-zinc-600 pt-28 pb-20 font-sans overflow-hidden">
      <div className="max-w-7xl mx-auto px-6 lg:px-8">
        <div className="text-center max-w-3xl mx-auto mb-16 md:mb-20 group cursor-default">
          <p className="text-amber-600 font-medium tracking-[0.2em] uppercase text-xs md:text-sm mb-4 transition-transform duration-700 ease-out group-hover:-translate-y-1">
            Exclusive Collection
          </p>

          <h1 className="text-4xl md:text-5xl lg:text-6xl font-serif text-zinc-900 mb-6 font-light tracking-wide transition-all duration-700 ease-out group-hover:scale-105 group-hover:drop-shadow-[0_10px_15px_rgba(0,0,0,0.05)]">
            Discover Your{" "}
            <span className="italic text-zinc-400 transition-colors duration-500 group-hover:text-amber-600">
              Signature Scent
            </span>
          </h1>

          <p className="text-sm md:text-base text-zinc-500 leading-relaxed font-light transition-opacity duration-700 opacity-90 group-hover:opacity-100">
            Explore our meticulously curated selection of premium fragrances.
            From deep, woody ouds to fresh, aquatic notes—find the perfect
            masterpiece that speaks to your personality.
          </p>
        </div>

        <PerfumeSearchFilter />

        <div className="relative w-full h-px bg-zinc-200 mb-12 overflow-hidden rounded-full">
          <div className="absolute top-0 left-[20%] h-full w-[60%] bg-linear-to-r from-transparent via-amber-500/60 to-transparent animate-pulse"></div>
        </div>

        <div className="w-full">
          {perfumes.length > 0 ? (
            <div className="w-full grid lg:grid-cols-3 md:grid-cols-2 sm:grid-cols-1 gap-4">
              {perfumes.map((perfume) => (
                <PerfumeCard key={perfume._id} perfume={perfume}>
                  {perfume.perfumeTitle}
                </PerfumeCard>
              ))}
            </div>
          ) : (
            <div className="text-center py-20 border border-dashed border-zinc-300 rounded-3xl">
              <h3 className="text-2xl font-semibold text-zinc-800 mb-3">
                No Perfume Found
              </h3>
              <p className="text-zinc-500">
                Try searching with another perfume name or category.
              </p>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default ShopPage;

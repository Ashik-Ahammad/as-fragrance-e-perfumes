// app/combos/page.jsx

import React from "react";
import Link from "next/link";
import Image from "next/image";
import { FiPackage } from "react-icons/fi";
import { FaBangladeshiTakaSign } from "react-icons/fa6";

export const metadata = {
  title: "Exclusive Combo Deals | AS Fragrance",
  description:
    "Get the best value with our handpicked perfume combo deals. Premium fragrance bundles at special prices.",
  alternates: { canonical: "/combos" },
};

const CombosPage = async () => {
  const res = await fetch(`${process.env.NEXT_PUBLIC_SERVER_URL}/combos`, {
    cache: "no-store",
  });
  const combos = await res.json();

  return (
    <div className="bg-white min-h-screen text-zinc-600 pt-28 pb-20 font-sans overflow-hidden">
      <div className="max-w-7xl mx-auto px-6 lg:px-8">
        {/* Header */}
        <div className="text-center max-w-3xl mx-auto mb-16">
          <p className="text-amber-600 font-medium tracking-[0.2em] uppercase text-xs md:text-sm mb-4">
            Bundle & Save
          </p>
          <h1 className="text-4xl md:text-5xl lg:text-6xl font-serif text-zinc-900 mb-6 font-light tracking-wide">
            Exclusive <span className="italic text-amber-600">Combo Deals</span>
          </h1>
          <p className="text-sm md:text-base text-zinc-500 leading-relaxed font-light">
            Handpicked fragrance bundles crafted for maximum value. Own more,
            spend less.
          </p>
        </div>

        {/* Divider */}
        <div className="relative w-full h-px bg-zinc-200 mb-12 overflow-hidden rounded-full">
          <div className="absolute top-0 left-[20%] h-full w-[60%] bg-linear-to-r from-transparent via-amber-500/60 to-transparent animate-pulse" />
        </div>

        {/* Combo Cards */}
        {combos.length === 0 ? (
          <div className="text-center py-24 text-zinc-400">
            <FiPackage className="text-5xl mx-auto mb-4 opacity-30" />
            <p className="text-lg">No combo deals available yet.</p>
          </div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {combos.map((combo) => (
              <Link key={combo._id} href={`/combos/${combo._id}`}>
                <div className="group bg-white border border-zinc-100 rounded-3xl overflow-hidden shadow-sm hover:shadow-xl transition-all duration-500 hover:-translate-y-1 cursor-pointer">
                  {/* Image */}
                  <div className="relative w-full h-64 bg-zinc-50 overflow-hidden">
                    <Image
                      src={combo.imageUrl || "/assets/defaultPerfumeImage.png"}
                      alt={combo.title}
                      fill
                      className="object-cover group-hover:scale-105 transition-transform duration-700"
                    />
                    {combo.badge && (
                      <span className="absolute top-4 left-4 bg-amber-500 text-white text-[10px] font-bold uppercase tracking-widest px-3 py-1.5 rounded-full">
                        {combo.badge}
                      </span>
                    )}
                  </div>

                  {/* Info */}
                  <div className="p-6">
                    <h2 className="font-serif text-xl text-zinc-900 mb-2 group-hover:text-amber-600 transition-colors">
                      {combo.title}
                    </h2>
                    <p className="text-xs text-zinc-400 mb-4 leading-relaxed line-clamp-2">
                      {combo.description}
                    </p>

                    {/* Included Perfumes */}
                    {combo.items?.length > 0 && (
                      <div className="flex flex-wrap gap-1.5 mb-5">
                        {combo.items.map((item, i) => (
                          <span
                            key={i}
                            className="text-[10px] bg-zinc-50 border border-zinc-200 text-zinc-500 px-2.5 py-1 rounded-full font-medium"
                          >
                            {item.name}
                          </span>
                        ))}
                      </div>
                    )}

                    {/* Price */}
                    <div className="flex items-center justify-between">
                      <div>
                        {combo.originalPrice && (
                          <p className="text-xs text-zinc-400 line-through flex items-center">
                            <FaBangladeshiTakaSign className="text-[9px]" />
                            {combo.originalPrice}
                          </p>
                        )}
                        <p className="text-2xl font-bold text-zinc-900 flex items-center gap-0.5">
                          <FaBangladeshiTakaSign className="text-base" />
                          {combo.price}
                        </p>
                      </div>
                      <span className="text-[10px] font-bold uppercase tracking-widest text-amber-600 border border-amber-200 bg-amber-50 px-3 py-1.5 rounded-xl">
                        View Details →
                      </span>
                    </div>
                  </div>
                </div>
              </Link>
            ))}
          </div>
        )}
      </div>
    </div>
  );
};

export default CombosPage;

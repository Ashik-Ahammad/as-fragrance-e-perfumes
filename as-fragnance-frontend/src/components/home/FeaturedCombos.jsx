"use client";
import React, { useEffect, useState } from "react";
import Image from "next/image";
import Link from "next/link";
import { motion } from "framer-motion";
import { FiArrowRight, FiGift } from "react-icons/fi";
import { FaBangladeshiTakaSign } from "react-icons/fa6";

export default function FeaturedCombos() {
  const [combos, setCombos] = useState([]);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    fetch(`${process.env.NEXT_PUBLIC_SERVER_URL}/combos`)
      .then((res) => res.json())
      .then((data) => {
        // Only show top 3 combos on home page
        setCombos(data.slice(0, 3));
        setIsLoading(false);
      })
      .catch((err) => {
        console.error(err);
        setIsLoading(false);
      });
  }, []);

  if (isLoading || combos.length === 0) return null;

  return (
    <section className="py-24 bg-zinc-50 relative overflow-hidden">
      <div className="absolute top-0 right-0 w-1/3 h-full bg-amber-50/50 skew-x-12 -z-10 translate-x-1/2"></div>
      
      <div className="max-w-7xl mx-auto px-6 lg:px-8">
        <div className="text-center max-w-2xl mx-auto mb-16">
          <div className="inline-flex items-center justify-center p-3 bg-amber-100 text-amber-600 rounded-full mb-4">
            <FiGift className="w-5 h-5" />
          </div>
          <h2 className="text-sm font-bold text-amber-600 tracking-[0.2em] uppercase mb-3">
            Exclusive Offers
          </h2>
          <h3 className="text-4xl md:text-5xl font-serif text-zinc-900 leading-tight mb-4">
            Curated <span className="italic text-zinc-400">Bundles</span>
          </h3>
          <p className="text-zinc-500 text-sm md:text-base leading-relaxed">
            Experience our most beloved fragrances paired perfectly together. 
            Exceptional value for the ultimate scent wardrobe.
          </p>
        </div>

        <div className="flex flex-col gap-8 mb-12 max-w-5xl mx-auto">
          {combos.map((combo, index) => (
            <motion.div
              key={combo._id}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: index * 0.1 }}
              className="bg-white rounded-3xl overflow-hidden shadow-[0_8px_30px_rgb(0,0,0,0.04)] border border-amber-100/50 group flex flex-col md:flex-row hover:shadow-xl hover:shadow-amber-900/5 transition-all duration-300 min-h-[300px]"
            >
              <div className="relative w-full md:w-[45%] md:min-h-[300px] h-64 md:h-auto bg-zinc-100 overflow-hidden shrink-0">
                {combo.badge && (
                  <div className="absolute top-4 left-4 z-20 bg-amber-600 text-white text-[10px] font-bold uppercase tracking-widest px-3 py-1.5 rounded-full shadow-md">
                    {combo.badge}
                  </div>
                )}
                
                <Image
                  src={combo.imageUrl || "/assets/defaultPerfumeImage.png"}
                  alt={combo.title}
                  fill
                  className="object-cover transition-transform duration-700 group-hover:scale-105"
                />
              </div>

              <div className="p-6 md:p-10 flex-1 flex flex-col justify-center">
                <h4 className="text-2xl md:text-3xl font-serif text-zinc-900 mb-4">{combo.title}</h4>
                <p className="text-sm md:text-base text-zinc-500 mb-8 max-w-xl">
                  {combo.description}
                </p>

                <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-6 mt-auto">
                  <div className="flex items-end gap-3">
                    <div className="text-3xl font-bold text-amber-600 flex items-center">
                      <FaBangladeshiTakaSign className="text-xl mr-0.5" />
                      {combo.price}
                    </div>
                    {combo.originalPrice && (
                      <div className="text-base text-zinc-400 line-through mb-1 flex items-center">
                        <FaBangladeshiTakaSign className="text-xs mr-0.5" />
                        {combo.originalPrice}
                      </div>
                    )}
                  </div>

                  <Link
                    href="/combos"
                    className="py-3.5 px-8 bg-zinc-900 hover:bg-amber-600 text-white text-xs font-bold uppercase tracking-widest rounded-xl transition-colors duration-300 flex items-center justify-center gap-2 shrink-0 w-full sm:w-auto"
                  >
                    View Bundle
                  </Link>
                </div>
              </div>
            </motion.div>
          ))}
        </div>
        
        <div className="text-center">
          <Link
            href="/combos"
            className="inline-flex items-center gap-2 text-sm font-semibold uppercase tracking-widest text-zinc-600 hover:text-amber-600 transition-colors border-b-2 border-transparent hover:border-amber-600 pb-1"
          >
            See All Combos 
            <FiArrowRight />
          </Link>
        </div>
      </div>
    </section>
  );
}

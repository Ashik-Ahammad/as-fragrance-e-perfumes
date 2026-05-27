"use client";
import React, { useState } from "react";
import Image from "next/image";
import Link from "next/link";
import { FiArrowLeft, FiShoppingBag, FiPackage } from "react-icons/fi";
import { FaBangladeshiTakaSign } from "react-icons/fa6";
import { useCartStore } from "@/lib/useCartStore";
import { toast } from "sonner";

export default function ComboDetailClient({ combo }) {
  const addToCart = useCartStore((state) => state.addToCart);
  const [added, setAdded] = useState(false);

  const handleAddToCart = () => {
    const comboAsCartItem = {
      _id: combo._id,
      title: combo.title,
      image: combo.imageUrl,
      price: Number(combo.price),
    };
    addToCart(comboAsCartItem, "Combo Pack");
    setAdded(true);
    toast.success(`${combo.title} added to cart!`);
    setTimeout(() => setAdded(false), 2000);
  };

  const savings =
    combo.originalPrice && combo.price
      ? Number(combo.originalPrice) - Number(combo.price)
      : null;

  return (
    <div className="bg-[#faf9f7] min-h-screen pt-28 pb-20 font-sans text-stone-700">
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">

        <Link
          href="/combos"
          className="inline-flex items-center gap-2 text-stone-500 hover:text-stone-900 text-sm mb-10 transition-colors group"
        >
          <FiArrowLeft className="group-hover:-translate-x-1 transition-transform" />
          Back to Combo Deals
        </Link>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-start">

          <div className="relative">
            {combo.badge && (
              <span className="absolute top-4 left-4 z-10 bg-amber-500 text-white text-[10px] font-bold uppercase tracking-widest px-3 py-1.5 rounded-full shadow-md">
                {combo.badge}
              </span>
            )}
            <div className="relative w-full aspect-square rounded-3xl overflow-hidden bg-stone-100 shadow-xl shadow-stone-200/60">
              <Image
                src={combo.imageUrl || "/assets/defaultPerfumeImage.png"}
                alt={combo.title}
                fill
                className="object-cover"
                priority
              />
            </div>
          </div>

          <div className="space-y-8">

            <div>
              <p className="text-amber-600 font-medium tracking-[0.2em] uppercase text-xs mb-3">
                Exclusive Combo Deal
              </p>
              <h1 className="text-3xl sm:text-4xl font-serif text-stone-900 mb-4 leading-tight">
                {combo.title}
              </h1>
              {combo.description && (
                <p className="text-stone-500 text-sm leading-relaxed">
                  {combo.description}
                </p>
              )}
            </div>

            {combo.items?.length > 0 && (
              <div>
                <p className="text-[10px] font-bold text-stone-400 uppercase tracking-widest mb-3 flex items-center gap-2">
                  <FiPackage /> Included in this combo
                </p>
                <div className="space-y-2.5">
                  {combo.items.map((item, i) => (
                    <div
                      key={i}
                      className="flex items-center gap-3 p-3 bg-white border border-stone-100 rounded-2xl shadow-xs"
                    >
                      <div className="relative w-11 h-11 rounded-xl overflow-hidden bg-stone-50 shrink-0">
                        <Image
                          src={item.imageUrl || "/assets/defaultPerfumeImage.png"}
                          alt={item.name}
                          fill
                          className="object-cover"
                        />
                      </div>
                      <p className="text-sm font-medium text-stone-800">{item.name}</p>
                      <span className="ml-auto text-[10px] text-stone-400 bg-stone-50 border border-stone-200 px-2 py-0.5 rounded-full font-medium">
                        Included
                      </span>
                    </div>
                  ))}
                </div>
              </div>
            )}

            <div className="bg-white border border-stone-100 rounded-2xl p-5 shadow-xs space-y-2">
              {combo.originalPrice && (
                <div className="flex items-center justify-between text-sm text-stone-400">
                  <span>Original Price</span>
                  <span className="line-through flex items-center gap-0.5">
                    <FaBangladeshiTakaSign className="text-xs" />{combo.originalPrice}
                  </span>
                </div>
              )}
              {savings && savings > 0 && (
                <div className="flex items-center justify-between text-sm text-emerald-600 font-semibold">
                  <span>You Save</span>
                  <span className="flex items-center gap-0.5">
                    <FaBangladeshiTakaSign className="text-xs" />{savings}
                  </span>
                </div>
              )}
              <div className="flex items-center justify-between border-t border-stone-100 pt-3 mt-1">
                <span className="text-sm font-bold text-stone-700">Combo Price</span>
                <span className="text-3xl font-bold text-stone-900 flex items-center gap-0.5">
                  <FaBangladeshiTakaSign className="text-xl" />{combo.price}
                </span>
              </div>
            </div>

            <button
              onClick={handleAddToCart}
              className={`w-full py-5 rounded-2xl font-bold uppercase tracking-widest text-sm flex items-center justify-center gap-3 transition-all hover:cursor-pointer duration-300 shadow-lg ${
                added
                  ? "bg-emerald-600 text-white shadow-emerald-600/20"
                  : "bg-stone-900 text-white hover:bg-amber-600 shadow-stone-900/20 active:scale-95"
              }`}
            >
              <FiShoppingBag className="text-lg" />
              {added ? "Added to Cart ✓" : "Add Combo to Cart"}
            </button>

            <p className="text-center text-xs text-stone-400">
              Free delivery available · Cash on delivery accepted
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}
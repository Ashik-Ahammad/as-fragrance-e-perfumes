"use client";
import React, { useEffect, useState } from "react";
import Image from "next/image";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { motion, AnimatePresence } from "framer-motion";
import { useCartStore } from "@/lib/useCartStore";
import { authClient } from "@/lib/auth-client";
import { FiX, FiPlus, FiMinus, FiTrash2, FiShoppingBag, FiArrowRight, FiPackage } from "react-icons/fi";
import { FaBangladeshiTakaSign } from "react-icons/fa6";

export default function CartSidebar() {
  const router = useRouter();
  const { data: session } = authClient.useSession();

  const [hasHistory, setHasHistory] = useState(false);

  const { cartItems, isCartOpen, closeCart, updateQuantity, removeFromCart } = useCartStore();
  const subtotal = cartItems.reduce((acc, item) => acc + item.price * item.quantity, 0);

  // Check for history on component mount
  useEffect(() => {
    const data = localStorage.getItem("as_guest_orders");
    if (data && JSON.parse(data).length > 0) {
      setHasHistory(true);
    }
  }, []);

  const handleCheckout = () => {
    closeCart();
    router.push("/cart");
  };

  return (
    <AnimatePresence>
      {isCartOpen && (
        <>
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={closeCart}
            className="fixed inset-0 bg-black/40 backdrop-blur-xs z-50 cursor-pointer"
          />

          <motion.div
            initial={{ x: "100%" }}
            animate={{ x: 0 }}
            exit={{ x: "100%" }}
            transition={{ type: "spring", damping: 25, stiffness: 200 }}
            className="fixed top-0 right-0 h-full w-full sm:w-[440px] bg-white/95 backdrop-blur-xl border-l border-stone-100 shadow-2xl z-50 flex flex-col selection:bg-amber-100"
          >
            {/* Header */}
            <div className="p-6 border-b border-stone-100 flex items-center justify-between">
              <div className="flex items-center gap-2.5">
                <FiShoppingBag className="text-amber-600 text-xl" />
                <h2 className="font-serif text-xl text-stone-900 tracking-wide">Your Cart</h2>
                <span className="bg-stone-100 text-stone-600 text-xs font-bold px-2 py-0.5 rounded-full">
                  {cartItems.length}
                </span>
              </div>
              <button onClick={closeCart} className="p-2 text-stone-400 hover:text-stone-900 hover:cursor-pointer hover:bg-stone-50 rounded-xl transition-all">
                <FiX className="text-xl" />
              </button>
            </div>

            {/* Body */}
            <div className="flex-1 overflow-y-auto p-6 space-y-4">
              {cartItems.length === 0 ? (
                <div className="h-full flex flex-col items-center justify-center text-center p-4">
                  <div className="w-16 h-16 bg-stone-50 rounded-full flex items-center justify-center text-stone-300 mb-4 border border-stone-100">
                    <FiShoppingBag className="text-2xl" />
                  </div>
                  <h3 className="font-serif text-lg text-stone-800 mb-1">Your cart is empty</h3>
                  <p className="text-xs text-stone-400 font-light max-w-[240px] leading-relaxed mb-8">
                    Explore our curated collection to find your true signature scent.
                  </p>

                  <div className="flex flex-col gap-3 w-full max-w-[240px]">
                    {/* View Order History Button */}
                    {(hasHistory || session?.user) && (
                      <Link
                        href="/profile"
                        onClick={closeCart}
                        className="w-full flex items-center justify-center gap-2 py-3 bg-stone-100 text-stone-700 rounded-xl font-bold uppercase tracking-widest text-[10px] hover:bg-stone-200 transition-all text-center hover:cursor-pointer"
                      >
                        <FiPackage className="text-xs" /> View Order History
                      </Link>
                    )}

                    {/* Conditional Continue Shopping Button */}
                    {(hasHistory || session?.user) && (
                      <button
                        onClick={closeCart}
                        className="w-full py-3 bg-stone-900 text-white rounded-xl font-bold uppercase tracking-widest text-[10px] hover:bg-amber-600 transition-all text-center hover:cursor-pointer"
                      >
                        Continue Shopping
                      </button>
                    )}
                  </div>
                </div>
              ) : (
                // Active Cart Items
                cartItems.map((item) => (
                  <div key={`${item._id}-${item.selectedSize}`} className="flex gap-4 p-3 bg-stone-50/50 rounded-2xl border border-stone-100/80 hover:border-amber-200 transition-all group relative overflow-hidden">
                    <div className="relative w-20 h-24 rounded-xl overflow-hidden bg-white border border-stone-100 shrink-0">
                      <Image src={item.image} alt={item.title} fill sizes="80px" className="object-cover transition-transform duration-500 group-hover:scale-105" />
                    </div>
                    <div className="flex flex-col justify-between flex-1 min-w-0 pr-6">
                      <div>
                        <span className="text-[9px] font-bold text-amber-700 tracking-wider uppercase block mb-0.5">{item.category}</span>
                        <h4 className="font-serif text-sm font-medium text-stone-900 truncate tracking-wide mb-1">{item.title}</h4>
                        <span className="inline-block px-2 py-0.5 bg-white text-stone-500 border border-stone-200 text-[10px] font-bold tracking-wider rounded-md uppercase mb-2">
                          {item.selectedSize}
                        </span>
                      </div>
                      <div className="flex items-center justify-between">
                        <div className="flex items-center border border-stone-200 bg-white rounded-lg shadow-2xs overflow-hidden">
                          <button onClick={() => updateQuantity(item._id, item.selectedSize, "decrease")} className="p-1.5 text-stone-500 hover:bg-stone-50 transition-colors"><FiMinus className="text-xs" /></button>
                          <span className="px-2 text-xs font-semibold text-stone-800 min-w-[24px] text-center select-none">{item.quantity}</span>
                          <button onClick={() => updateQuantity(item._id, item.selectedSize, "increase")} className="p-1.5 text-stone-500 hover:bg-stone-50 transition-colors"><FiPlus className="text-xs" /></button>
                        </div>
                        <div className="flex items-center text-sm font-semibold text-stone-900 gap-0.5">
                          <FaBangladeshiTakaSign className="text-xs" />
                          <span>{item.price * item.quantity}</span>
                        </div>
                      </div>
                    </div>
                    <button onClick={() => removeFromCart(item._id, item.selectedSize)} className="absolute top-3 right-3 p-1.5 text-stone-300 hover:text-rose-600 hover:bg-rose-50 rounded-lg transition-colors opacity-0 group-hover:opacity-100 duration-200 hover:cursor-pointer">
                      <FiTrash2 className="text-sm" />
                    </button>
                  </div>
                ))
              )}
            </div>

            {/* Footer Summary */}
            {cartItems.length > 0 && (
              <div className="p-6 border-t border-stone-100 bg-stone-50/40 space-y-4">
                <div className="flex items-center justify-between">
                  <span className="text-xs font-bold uppercase tracking-widest text-stone-400">Subtotal</span>
                  <div className="flex items-center text-xl font-serif text-stone-900 font-medium gap-0.5">
                    <FaBangladeshiTakaSign className="text-base" />
                    <span>{subtotal}</span>
                  </div>
                </div>
                <div className="flex flex-col gap-2.5 pt-2">
                  <button onClick={handleCheckout} className="w-full flex items-center justify-center gap-2 bg-stone-900 text-white py-4 rounded-xl font-bold tracking-widest uppercase text-xs hover:bg-amber-600 shadow-md transition-all duration-300 group hover:cursor-pointer">
                    <span>Checkout Cart</span>
                    <FiArrowRight className="text-sm transition-transform group-hover:translate-x-1" />
                  </button>
                  <button onClick={closeCart} className="w-full bg-white text-stone-600 border border-stone-200 py-3.5 rounded-xl font-bold tracking-widest uppercase text-xs hover:bg-stone-50 transition-colors shadow-2xs hover:cursor-pointer">
                    Continue Shopping
                  </button>
                </div>
              </div>
            )}
          </motion.div>
        </>
      )}
    </AnimatePresence>
  );
}
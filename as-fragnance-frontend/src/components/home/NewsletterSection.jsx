"use client";
import React, { useState } from "react";
import Image from "next/image";
import { motion } from "framer-motion";
import { toast } from "sonner";
import { FiMail } from "react-icons/fi";

export default function NewsletterSection() {
  const [email, setEmail] = useState("");
  const [loading, setLoading] = useState(false);

  const handleSubscribe = async (e) => {
    e.preventDefault();
    if (!email) return;

    setLoading(true);
    try {
      const res = await fetch(`${process.env.NEXT_PUBLIC_SERVER_URL}/newsletter/subscribe`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ email }),
      });

      const data = await res.json();
      if (res.ok) {
        toast.success("Welcome to the AS Fragrance VIP Club!");
        setEmail("");
      } else {
        toast.error(data.message || "Something went wrong.");
      }
    } catch (error) {
      toast.error("Failed to subscribe. Please try again later.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <section className="relative py-32 bg-zinc-900 overflow-hidden">
      {/* Background Image with Overlay */}
      <div className="absolute inset-0 z-0">
        <Image
          src="https://images.unsplash.com/photo-1594035910387-fea47794261f?q=80&w=2000"
          alt="Luxury Perfume Bottles"
          fill
          className="object-cover opacity-30 mix-blend-luminosity"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-zinc-900 via-zinc-900/80 to-transparent" />
      </div>

      <div className="relative z-10 max-w-4xl mx-auto px-6 lg:px-8 text-center">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8 }}
        >
          <div className="inline-flex items-center justify-center p-3 bg-amber-500/10 text-amber-500 rounded-full mb-6 ring-1 ring-amber-500/30">
            <FiMail className="w-6 h-6" />
          </div>
          
          <h2 className="text-3xl md:text-5xl font-serif text-white mb-6 leading-tight">
            Join The <span className="text-amber-500 italic">Inner Circle</span>
          </h2>
          
          <p className="text-zinc-400 text-sm md:text-base max-w-xl mx-auto mb-10 leading-relaxed">
            Subscribe to our newsletter and be the first to know about new arrivals, 
            exclusive offers, and the art of fine perfumery.
          </p>

          <form onSubmit={handleSubscribe} className="max-w-md mx-auto relative">
            <input
              type="email"
              required
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              placeholder="Enter your email address..."
              className="w-full bg-white/10 border border-white/20 text-white placeholder:text-zinc-500 px-6 py-4 rounded-full outline-none focus:border-amber-500 focus:bg-white/15 transition-all backdrop-blur-md pr-36"
            />
            <button
              type="submit"
              disabled={loading}
              className="absolute right-1 top-1 bottom-1 bg-amber-600 hover:bg-amber-500 text-white font-bold text-[10px] uppercase tracking-widest px-6 rounded-full transition-colors disabled:opacity-50"
            >
              {loading ? "Joining..." : "Subscribe"}
            </button>
          </form>
          
          <p className="text-zinc-600 text-[10px] uppercase tracking-widest mt-6">
            We respect your privacy. No spam.
          </p>
        </motion.div>
      </div>
    </section>
  );
}

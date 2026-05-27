"use client";
import React, { useState } from "react";
import Image from "next/image";
import Link from "next/link";
import { toast } from "sonner";
import {
  FiHome,
  FiShoppingBag,
  FiInfo,
  FiMail,
  FiMapPin,
  FiArrowUp,
  FiPhone,
  FiChevronRight,
} from "react-icons/fi";
import {
  FaFacebookF,
  FaInstagram,
  FaWhatsapp,
  FaRegCopyright,
} from "react-icons/fa";

export default function Footer() {
  const [email, setEmail] = useState("");
  const [loading, setLoading] = useState(false);

  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  const handleSubscribe = async (e) => {
    e.preventDefault();
    if (!email) return;

    setLoading(true);
    try {
      const res = await fetch(
        `${process.env.NEXT_PUBLIC_SERVER_URL}/newsletter`,
        {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({ email }),
        },
      );

      if (res.ok) {
        toast.success("Successfully subscribed!");
        setEmail("");
      } else {
        const data = await res.json();
        toast.error(data.message || "Something went wrong.");
      }
    } catch (err) {
      toast.error("Failed to connect to server.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <footer className="bg-[#050505] text-zinc-400 border-t border-white/5 pt-20 pb-10 font-sans">
      <div className="max-w-7xl mx-auto px-6 lg:px-8">

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-12 lg:gap-8 mb-16">

          <div className="flex flex-col items-center md:items-start text-center md:text-left">
            <Link
              href="/"
              className="inline-block hover:opacity-80 transition-opacity mb-6"
            >
              <Image
                src="/assets/logo-as.png"
                alt="A S Fragrance Logo"
                width={70}
                height={70}
                className="object-contain"
              />
            </Link>
            <p className="text-sm leading-relaxed mb-8 max-w-xs">
              Discover the essence of luxury. We provide the finest and most
              authentic perfumes, crafted to leave an unforgettable mark.
            </p>
            <div className="flex gap-4">
              <a
                href="https://www.facebook.com/ashshamsu01"
                target="_blank"
                rel="noopener noreferrer"
                className="w-9 h-9 rounded-full bg-white/5 flex items-center justify-center text-zinc-400 hover:bg-[#1877F2] hover:text-white transition-all duration-300"
              >
                <FaFacebookF className="text-sm" />
              </a>
              <a
                href="https://www.instagram.com/ashshamsu25/"
                target="_blank"
                rel="noopener noreferrer"
                className="w-9 h-9 rounded-full bg-white/5 flex items-center justify-center text-zinc-400 hover:bg-linear-to-tr hover:from-[#f09433] hover:via-[#dc2743] hover:to-[#bc1888] hover:text-white transition-all duration-300"
              >
                <FaInstagram className="text-sm" />
              </a>
              <a
                href="https://wa.me/8801575606733"
                target="_blank"
                rel="noopener noreferrer"
                className="w-9 h-9 rounded-full bg-white/5 flex items-center justify-center text-zinc-400 hover:bg-[#25D366] hover:text-white transition-all duration-300"
              >
                <FaWhatsapp className="text-base" />
              </a>
            </div>
          </div>

          <div className="flex flex-col items-center md:items-start lg:pl-8">
            <h3 className="text-white font-medium tracking-[0.15em] uppercase mb-6 text-sm">
              Explore
            </h3>
            <ul className="flex flex-col gap-4 text-sm">
              <li>
                <Link
                  href="/"
                  className="group flex items-center gap-2 hover:text-amber-500 transition-colors"
                >
                  <FiHome className="text-base" /> <span>Home</span>
                </Link>
              </li>
              <li>
                <Link
                  href="/shop"
                  className="group flex items-center gap-2 hover:text-amber-500 transition-colors"
                >
                  <FiShoppingBag className="text-base" /> <span>Shop</span>
                </Link>
              </li>
              <li>
                <Link
                  href="/about"
                  className="group flex items-center gap-2 hover:text-amber-500 transition-colors"
                >
                  <FiInfo className="text-base" /> <span>About Us</span>
                </Link>
              </li>
              <li>
                <Link
                  href="/contact"
                  className="group flex items-center gap-2 hover:text-amber-500 transition-colors"
                >
                  <FiMail className="text-base" /> <span>Contact</span>
                </Link>
              </li>
            </ul>
          </div>

          <div className="flex flex-col items-center md:items-start text-center md:text-left">
            <h3 className="text-white font-medium tracking-[0.15em] uppercase mb-6 text-sm">
              Get In Touch
            </h3>
            <ul className="flex flex-col gap-5 text-sm">
              <li className="flex items-start gap-3 justify-center md:justify-start">
                <FiMapPin className="text-amber-500 text-lg shrink-0 mt-0.5" />
                <span className="leading-relaxed">
                  Suite 25 (Level 5),
                  <br /> China Town Market,
                  <br /> Naya Paltan, Dhaka,
                  <br /> Bangladesh, 1000
                </span>
              </li>
              <li className="flex items-center gap-3 justify-center md:justify-start">
                <FiPhone className="text-amber-500 text-lg shrink-0" />
                <a
                  href="tel:+8801575606733"
                  className="hover:text-amber-500 transition-colors"
                >
                  +880 1575-606733
                </a>
              </li>
              <li className="flex items-center gap-3 justify-center md:justify-start">
                <FiMail className="text-amber-500 text-lg shrink-0" />
                <a
                  href="mailto:rahatkhanrabby06@gmail.com"
                  className="hover:text-amber-500 transition-colors break-all"
                >
                  rahatkhanrabby06@gmail.com
                </a>
              </li>
            </ul>
          </div>

          <div className="flex flex-col items-center md:items-start text-center md:text-left">
            <h3 className="text-white font-medium tracking-[0.15em] uppercase mb-6 text-sm">
              Newsletter
            </h3>
            <p className="text-sm mb-6 max-w-xs">
              Subscribe to receive updates, access to exclusive deals, and more.
            </p>
            <form
              onSubmit={handleSubscribe}
              className="relative w-full max-w-70"
            >
              <input
                type="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                placeholder="Enter your email"
                className="w-full bg-transparent border-b border-zinc-700 text-white text-sm px-0 py-3 pr-10 focus:outline-none focus:border-amber-500 transition-colors placeholder:text-zinc-600"
                required
              />
              <button
                type="submit"
                disabled={loading}
                className="absolute right-0 top-0 h-full text-zinc-500 hover:text-amber-500 transition-colors"
                aria-label="Subscribe"
              >
                <FiChevronRight className="text-xl" />
              </button>
            </form>
          </div>
        </div>

        <div className="border-t border-white/5 pt-8 flex flex-col md:flex-row items-center justify-between gap-6">
          <div className="flex items-center gap-2 text-xs text-zinc-500">
            <FaRegCopyright className="text-sm" />
            <p>
              {new Date().getFullYear()}{" "}
              <span className="text-zinc-300 font-medium tracking-wider">
                A S FRAGRANCE
              </span>
              . All rights reserved.
            </p>
          </div>
          <button
            onClick={scrollToTop}
            className="group flex items-center gap-2 text-xs font-medium tracking-widest uppercase text-zinc-500 hover:text-amber-500 transition-colors"
          >
            Back To Top
            <div className="w-8 h-8 rounded-full border border-zinc-800 flex items-center justify-center group-hover:border-amber-500 transition-colors">
              <FiArrowUp className="text-sm group-hover:-translate-y-1 transition-transform duration-300" />
            </div>
          </button>
        </div>
      </div>
    </footer>
  );
}

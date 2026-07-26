"use client";
import { authClient } from "@/lib/auth-client";
import Image from "next/image";
import Link from "next/link";
import { usePathname } from "next/navigation";
import NavbarProfile from "./NavbarProfile";
import { useCartStore } from "@/lib/useCartStore";
import {
  FiHome,
  FiShoppingBag,
  FiInfo,
  FiMail,
  FiShoppingCart,
  FiUser,
} from "react-icons/fi";

export default function Navbar() {
  const { data: session } = authClient.useSession();
  const user = session?.user;

  // Active path track
  const pathname = usePathname();
  const isActive = (path) => pathname === path;

  // Active Link style helper
  const linkClass = (path) =>
    `flex items-center gap-2 text-xs tracking-widest uppercase transition-colors ${
      isActive(path) ? "text-white font-bold" : "text-gray-300 hover:text-white"
    }`;

  // Zustand Cart State data retrieve
  const cartItems = useCartStore((state) => state.cartItems);
  const openCart = useCartStore((state) => state.openCart);

  // Cart total item counting
  const totalCartCount = cartItems.reduce((acc, item) => acc + item.quantity, 0);

  return (
    <div className="navbar sticky top-0 z-50 bg-black backdrop-blur-lg border-b border-white/10 text-gray-100 px-4 lg:px-8 py-3">

      <div className="navbar-start">

        <div className="dropdown">
          <div
            tabIndex={0}
            role="button"
            className="btn btn-ghost lg:hidden pr-4"
          >
            <svg
              xmlns="http://www.w3.org/2000/svg"
              className="h-6 w-6"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth="2"
                d="M4 6h16M4 12h8m-8 6h16"
              />
            </svg>
          </div>
          <ul
            tabIndex={0}
            className="menu menu-sm dropdown-content bg-zinc-900/95 backdrop-blur-xl rounded-box z-1 mt-3 w-52 p-2 shadow-2xl border border-white/10"
          >
            <li>
              <Link href="/" className={isActive("/") ? "text-white font-bold" : "text-gray-300"}>
                <FiHome className="text-lg" /> Home
              </Link>
            </li>
            <li>
              <Link href="/shop" className={isActive("/shop") ? "text-white font-bold" : "text-gray-300"}>
                <FiShoppingBag className="text-lg" /> Shop
              </Link>
            </li>
            <li>
              <Link href="/about" className={isActive("/about") ? "text-white font-bold" : "text-gray-300"}>
                <FiInfo className="text-lg" /> About
              </Link>
            </li>
            <li>
              <Link href="/contact" className={isActive("/contact") ? "text-white font-bold" : "text-gray-300"}>
                <FiMail className="text-lg" /> Contact
              </Link>
            </li>
          </ul>
        </div>

        <Link
          href="/"
          className="flex items-center gap-3 hover:opacity-80 transition-opacity"
        >
          <Image
            src="/assets/logo-as.png"
            alt="AS Fragrance Logo"
            width={40}
            height={40}
            className="object-contain"
            priority
          />
          <span className="text-xl font-serif tracking-wide hidden sm:block">
            A S Fragrance
          </span>
        </Link>
      </div>

      <div className="navbar-center hidden lg:flex">
        <ul className="flex items-center gap-8 px-8 py-2.5 rounded-full border border-white/15 bg-white/5 shadow-[0_4px_30px_rgba(0,0,0,0.1)]">
          <li>
            <Link href="/" className={linkClass("/")}>
              <FiHome className="text-sm" /> Home
            </Link>
          </li>
          <li>
            <Link href="/shop" className={linkClass("/shop")}>
              <FiShoppingBag className="text-sm" /> Shop
            </Link>
          </li>
          <li>
            <Link href="/about" className={linkClass("/about")}>
              <FiInfo className="text-sm" /> About
            </Link>
          </li>
          <li>
            <Link href="/contact" className={linkClass("/contact")}>
              <FiMail className="text-sm" /> Contact
            </Link>
          </li>
        </ul>
      </div>

      <div className="navbar-end gap-3 flex items-center">

        <button
          onClick={openCart}
          className="btn btn-ghost btn-circle text-gray-300 hover:text-white hover:bg-white/10 transition-colors relative"
        >
          <FiShoppingCart className="text-xl" />
         
          {totalCartCount > 0 && (
            <span className="absolute -top-1 -right-1 bg-amber-500 text-black font-sans font-bold text-[10px] w-5 h-5 rounded-full flex items-center justify-center border-2 border-black animate-pulse">
              {totalCartCount}
            </span>
          )}
        </button>

        {user ? (
          <NavbarProfile user={user} />
        ) : (
          <Link href="/login">
            <button className={`btn btn-ghost btn-circle transition-colors ${isActive("/login") ? "text-white bg-white/20" : "text-gray-300 hover:text-white hover:bg-white/10"}`}>
              <FiUser className="text-xl" />
            </button>
          </Link>
        )}
      </div>
    </div>
  );
}
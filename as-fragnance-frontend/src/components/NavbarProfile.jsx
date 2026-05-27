"use client";
import React, { useEffect, useState, useRef } from "react";
import Link from "next/link";
import Image from "next/image";
import { useRouter } from "next/navigation";
import { FiUser, FiLogOut, FiChevronRight } from "react-icons/fi";
import { MdAdminPanelSettings } from "react-icons/md";
import { IoMdMail } from "react-icons/io";
import { PersonFill } from "@gravity-ui/icons";
import { authClient } from "@/lib/auth-client";
import { toast } from "sonner";

const NavbarProfile = ({ user }) => {
  const router = useRouter();
  const [isAdmin, setIsAdmin] = useState(false);
  const [open, setOpen] = useState(false);
  const dropdownRef = useRef(null);

  useEffect(() => {
    if (!user?.email) return;
    fetch("/api/check-role")
      .then((r) => r.json())
      .then((d) => setIsAdmin(d.role === "admin"))
      .catch(() => setIsAdmin(false));
  }, [user?.email]);

  // Close on outside click
  useEffect(() => {
    const handler = (e) => {
      if (dropdownRef.current && !dropdownRef.current.contains(e.target)) {
        setOpen(false);
      }
    };
    document.addEventListener("mousedown", handler);
    return () => document.removeEventListener("mousedown", handler);
  }, []);

  const handleSignOut = async () => {
    setOpen(false);
    const loadingToast = toast.loading("Signing out...");
    try {
      await authClient.signOut();
      toast.success("Signed out successfully!", { id: loadingToast });
      router.push("/login");
      router.refresh();
    } catch {
      toast.error("Something went wrong.", { id: loadingToast });
    }
  };

  return (
    <div ref={dropdownRef} className="relative">

      {/* ── Trigger ─────────────────────────────────────────── */}
      <button
        onClick={() => setOpen((v) => !v)}
        className="relative flex items-center justify-center outline-none hover:cursor-pointer"
      >
        <div className="relative w-10 h-10 rounded-full overflow-hidden border-2 border-white/20 bg-gradient-to-br from-stone-800 to-stone-900 shadow-lg hover:scale-105 transition-transform duration-200 flex items-center justify-center">
          {user?.image ? (
            <Image
              src={user.image}
              alt={user?.name || "User"}
              fill
              sizes="40px"
              className="object-cover"
            />
          ) : (
            <PersonFill className="w-5 h-5 text-zinc-300" />
          )}
        </div>
        <span className="absolute bottom-0 right-0 w-2.5 h-2.5 rounded-full bg-emerald-400 border-2 border-white shadow-[0_0_8px_rgba(52,211,153,0.8)]" />
      </button>

      {open && (
        <div
          className="absolute right-0 top-[calc(100%+14px)] w-[290px] z-50"
          style={{
            animation: "dropIn 0.22s cubic-bezier(0.16,1,0.3,1) forwards",
          }}
        >
          <style>{`
            @keyframes dropIn {
              from { opacity: 0; transform: translateY(-10px) scale(0.96); }
              to   { opacity: 1; transform: translateY(0) scale(1); }
            }
          `}</style>

          <div className="bg-[#111827] border border-white/10 rounded-[1.75rem] shadow-[0_28px_70px_rgba(0,0,0,0.45)] overflow-hidden">

            <div className="relative flex flex-col items-center text-center px-6 pt-8 pb-6 overflow-hidden">

              <div className="absolute top-0 left-1/2 -translate-x-1/2 w-40 h-20 bg-amber-500/10 rounded-full blur-2xl pointer-events-none" />

              <div className="relative w-[68px] h-[68px] rounded-2xl overflow-hidden bg-stone-800 border border-white/10 shadow-lg shrink-0 flex items-center justify-center mb-3">
                {user?.image ? (
                  <Image
                    src={user.image}
                    alt={user?.name || "User"}
                    fill
                    sizes="68px"
                    className="object-cover"
                  />
                ) : (
                  <PersonFill className="w-8 h-8 text-stone-400" />
                )}
              </div>

              <div className="flex items-center gap-2 justify-center flex-wrap">
                <span className="text-sm font-bold text-white leading-tight">
                  {user?.name || "Valued Customer"}
                </span>
                {isAdmin && (
                  <span className="inline-flex items-center gap-1 text-[9px] font-bold uppercase tracking-widest text-amber-400 bg-amber-400/10 border border-amber-400/20 px-2 py-0.5 rounded-full">
                    <MdAdminPanelSettings className="text-[10px]" />
                    Admin
                  </span>
                )}
              </div>

              <div className="flex items-center justify-center gap-1.5 mt-1.5">
                <IoMdMail className="text-stone-500 text-sm shrink-0" />
                <span className="text-xs text-stone-400 truncate max-w-[190px]">
                  {user?.email || "guest@example.com"}
                </span>
              </div>
            </div>

            <div className="mx-5">
              <div className="h-px bg-white/[0.07]" />
            </div>

            {/* ── Menu Items ──────────────────────────────── */}
            <div className="p-3 space-y-1">

              {/* Profile */}
              <Link
                href="/profile"
                onClick={() => setOpen(false)}
                className="flex items-center gap-3 px-4 py-3 rounded-2xl hover:bg-white/[0.07] transition-all duration-200 group"
              >
                <div className="w-9 h-9 rounded-xl bg-white/[0.06] group-hover:bg-amber-500/15 flex items-center justify-center shrink-0 transition-colors">
                  <FiUser className="text-stone-400 group-hover:text-amber-400 transition-colors text-base" />
                </div>
                <div className="flex-1 text-left">
                  <p className="text-sm font-semibold text-stone-200 leading-tight">Profile</p>
                  <p className="text-[10px] text-stone-500 mt-0.5">Manage your account</p>
                </div>
                <FiChevronRight className="text-stone-600 group-hover:text-amber-400 group-hover:translate-x-0.5 transition-all text-sm" />
              </Link>

              {/* Admin Panel */}
              {isAdmin && (
                <Link
                  href="/admin"
                  onClick={() => setOpen(false)}
                  className="flex items-center gap-3 px-4 py-3 rounded-2xl hover:bg-amber-500/10 transition-all duration-200 group"
                >
                  <div className="w-9 h-9 rounded-xl bg-amber-500/10 flex items-center justify-center shrink-0">
                    <MdAdminPanelSettings className="text-amber-400 text-lg" />
                  </div>
                  <div className="flex-1 text-left">
                    <p className="text-sm font-semibold text-amber-400 leading-tight">Admin Panel</p>
                    <p className="text-[10px] text-amber-600 mt-0.5">Control dashboard</p>
                  </div>
                  <FiChevronRight className="text-amber-700 group-hover:text-amber-400 group-hover:translate-x-0.5 transition-all text-sm" />
                </Link>
              )}

              {/* Divider */}
              <div className="px-1 py-1">
                <div className="h-px bg-white/[0.07]" />
              </div>

              {/* Sign Out */}
              <button
                onClick={handleSignOut}
                className="w-full flex items-center gap-3 px-4 py-3 rounded-2xl hover:bg-rose-500/10 transition-all duration-200 group cursor-pointer"
              >
                <div className="w-9 h-9 rounded-xl bg-rose-500/10 group-hover:bg-rose-500/20 flex items-center justify-center shrink-0 transition-colors">
                  <FiLogOut className="text-rose-400 text-base" />
                </div>
                <div className="flex-1 text-left">
                  <p className="text-sm font-semibold text-rose-400 leading-tight">Sign Out</p>
                  <p className="text-[10px] text-rose-700 mt-0.5">End your current session</p>
                </div>
                <FiChevronRight className="text-rose-800 group-hover:text-rose-400 group-hover:translate-x-0.5 transition-all text-sm" />
              </button>

            </div>

            {/* ── Footer ──────────────────────────────────── */}
            <div className="px-6 py-3 border-t border-white/6 flex items-center justify-between">
              <span className="text-[9px] font-bold uppercase tracking-widest text-stone-600">
                AS Fragrance
              </span>
              <span className="flex items-center gap-1.5 text-[9px] text-emerald-500 font-semibold">
                <span className="w-1.5 h-1.5 rounded-full bg-emerald-400 animate-pulse inline-block" />
                Secure Session
              </span>
            </div>

          </div>
        </div>
      )}
    </div>
  );
};

export default NavbarProfile;
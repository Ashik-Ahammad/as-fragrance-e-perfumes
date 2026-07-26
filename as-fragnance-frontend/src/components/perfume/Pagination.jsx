"use client";
import React from "react";
import Link from "next/link";
import { usePathname, useSearchParams } from "next/navigation";
import { FiChevronLeft, FiChevronRight } from "react-icons/fi";

export default function Pagination({ totalPages, currentPage }) {
  const pathname = usePathname();
  const searchParams = useSearchParams();

  if (totalPages <= 1) return null;

  const createPageUrl = (pageNumber) => {
    const params = new URLSearchParams(searchParams.toString());
    params.set("page", pageNumber.toString());
    return `${pathname}?${params.toString()}`;
  };

  const pages = Array.from({ length: totalPages }, (_, i) => i + 1);

  return (
    <div className="flex justify-center items-center gap-2 mt-16">
      {/* Prev Button */}
      {currentPage > 1 ? (
        <Link
          href={createPageUrl(currentPage - 1)}
          className="w-10 h-10 flex items-center justify-center rounded-full border border-zinc-200 text-zinc-500 hover:bg-amber-50 hover:text-amber-600 hover:border-amber-200 transition-all"
        >
          <FiChevronLeft />
        </Link>
      ) : (
        <div className="w-10 h-10 flex items-center justify-center rounded-full border border-zinc-100 text-zinc-300 cursor-not-allowed">
          <FiChevronLeft />
        </div>
      )}

      {/* Page Numbers */}
      <div className="flex items-center gap-1 sm:gap-2">
        {pages.map((page) => (
          <Link
            key={page}
            href={createPageUrl(page)}
            className={`w-10 h-10 flex items-center justify-center rounded-full text-sm font-semibold transition-all ${
              currentPage === page
                ? "bg-amber-600 text-white shadow-md shadow-amber-600/20"
                : "border border-zinc-200 text-zinc-600 hover:bg-amber-50 hover:text-amber-600 hover:border-amber-200"
            }`}
          >
            {page}
          </Link>
        ))}
      </div>

      {/* Next Button */}
      {currentPage < totalPages ? (
        <Link
          href={createPageUrl(currentPage + 1)}
          className="w-10 h-10 flex items-center justify-center rounded-full border border-zinc-200 text-zinc-500 hover:bg-amber-50 hover:text-amber-600 hover:border-amber-200 transition-all"
        >
          <FiChevronRight />
        </Link>
      ) : (
        <div className="w-10 h-10 flex items-center justify-center rounded-full border border-zinc-100 text-zinc-300 cursor-not-allowed">
          <FiChevronRight />
        </div>
      )}
    </div>
  );
}

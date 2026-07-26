"use client";
import { useRouter, useSearchParams } from "next/navigation";
import { motion, AnimatePresence } from "framer-motion";
import { FaSearch, FaFilter, FaTimes } from "react-icons/fa";
import { useState } from "react";

const PerfumeSearchFilter = () => {
  const router = useRouter();
  const searchParams = useSearchParams();
  const [showFilters, setShowFilters] = useState(false);

  const currentSearch = searchParams.get("search") || "";
  const currentCategory = searchParams.get("category") || "All";
  const currentStock = searchParams.get("stock") || "All";
  const currentMinPrice = searchParams.get("minPrice") || "";
  const currentMaxPrice = searchParams.get("maxPrice") || "";

  const handleSearch = (e) => {
    e.preventDefault();
    const formData = new FormData(e.target);

    const search = formData.get("search");
    const category = formData.get("category");
    const stock = formData.get("stock");
    const minPrice = formData.get("minPrice");
    const maxPrice = formData.get("maxPrice");

    const params = new URLSearchParams();

    if (search) params.set("search", search);
    if (category && category !== "All") params.set("category", category);
    if (stock && stock !== "All") params.set("stock", stock);
    if (minPrice) params.set("minPrice", minPrice);
    if (maxPrice) params.set("maxPrice", maxPrice);

    router.push(`/shop?${params.toString()}`);
  };

  const clearFilters = () => {
    router.push("/shop");
    setShowFilters(false);
  };

  const containerVariants = {
    hidden: { opacity: 0, y: -10, height: 0 },
    visible: { opacity: 1, y: 0, height: "auto", transition: { duration: 0.3 } },
    exit: { opacity: 0, y: -10, height: 0, transition: { duration: 0.2 } },
  };

  const hasActiveFilters = currentCategory !== "All" || currentStock !== "All" || currentMinPrice || currentMaxPrice;

  return (
    <div className="mb-14 relative z-20">
      <form onSubmit={handleSearch} className="bg-white p-3 md:p-4 rounded-3xl shadow-[0_8px_30px_rgb(0,0,0,0.04)] border border-zinc-100 transition-all duration-300">
        
        {/* Main Search Bar */}
        <div className="flex flex-col md:flex-row gap-3">
          <div className="flex-1 relative">
            <input
              type="text"
              name="search"
              defaultValue={currentSearch}
              placeholder="🧴 Search by perfume name or notes..."
              className="w-full h-14 rounded-2xl border-none bg-zinc-50/50 px-5 pr-12 text-sm text-zinc-800 outline-none transition-all duration-300 focus:bg-white focus:ring-2 focus:ring-amber-500"
            />
            <FaSearch className="absolute right-5 top-1/2 -translate-y-1/2 text-zinc-400 w-4 h-4" />
          </div>

          <div className="flex gap-2 sm:gap-3">
            <button
              type="button"
              onClick={() => setShowFilters(!showFilters)}
              className={`h-14 px-4 sm:px-6 rounded-2xl flex items-center justify-center gap-2 text-sm font-semibold transition-all duration-300 ${
                showFilters || hasActiveFilters
                  ? "bg-amber-100 text-amber-700 border-2 border-amber-200"
                  : "bg-zinc-50 text-zinc-600 hover:bg-zinc-100 border-2 border-transparent"
              }`}
            >
              <FaFilter className={hasActiveFilters ? "text-amber-600" : ""} /> 
              <span className="hidden sm:inline">Filters</span>
            </button>
            <button
              type="submit"
              className="h-14 px-6 sm:px-8 rounded-2xl bg-zinc-900 hover:bg-amber-600 transition-all duration-300 text-white font-semibold text-sm tracking-wide shadow-lg shadow-zinc-900/10 whitespace-nowrap cursor-pointer"
            >
              Search
            </button>
          </div>
        </div>

        {/* Expandable Advanced Filters */}
        <AnimatePresence>
          {showFilters && (
            <motion.div
              variants={containerVariants}
              initial="hidden"
              animate="visible"
              exit="exit"
              className="overflow-hidden"
            >
              <div className="mt-4 pt-4 border-t border-zinc-100 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
                {/* Category Filter */}
                <div className="flex flex-col gap-1.5">
                  <label className="text-[10px] uppercase font-bold text-zinc-400 tracking-wider">Category</label>
                  <select 
                    name="category" 
                    defaultValue={currentCategory}
                    className="w-full h-12 rounded-xl border border-zinc-200 bg-zinc-50 px-4 text-sm text-zinc-700 outline-none focus:border-amber-500 focus:bg-white transition-all cursor-pointer"
                  >
                    <option value="All">All Categories</option>
                    <option value="Musk">Musk</option>
                    <option value="Oud">Oud</option>
                    <option value="Hawas Inspired">Hawas Inspired</option>
                    <option value="Floral">Floral</option>
                    <option value="Woody">Woody</option>
                    <option value="Citrus">Citrus</option>
                    <option value="Aquatic">Aquatic</option>
                    <option value="Spicy">Spicy</option>
                  </select>
                </div>

                {/* Stock Filter */}
                <div className="flex flex-col gap-1.5">
                  <label className="text-[10px] uppercase font-bold text-zinc-400 tracking-wider">Availability</label>
                  <select 
                    name="stock" 
                    defaultValue={currentStock}
                    className="w-full h-12 rounded-xl border border-zinc-200 bg-zinc-50 px-4 text-sm text-zinc-700 outline-none focus:border-amber-500 focus:bg-white transition-all cursor-pointer"
                  >
                    <option value="All">All Status</option>
                    <option value="InStock">In Stock</option>
                    <option value="PreOrder">Pre Order</option>
                    <option value="OutOfStock">Out of Stock</option>
                  </select>
                </div>

                {/* Min Price */}
                <div className="flex flex-col gap-1.5">
                  <label className="text-[10px] uppercase font-bold text-zinc-400 tracking-wider">Min Price (৳)</label>
                  <input 
                    type="number" 
                    name="minPrice" 
                    defaultValue={currentMinPrice}
                    placeholder="Min"
                    min="0"
                    className="w-full h-12 rounded-xl border border-zinc-200 bg-zinc-50 px-4 text-sm text-zinc-700 outline-none focus:border-amber-500 focus:bg-white transition-all"
                  />
                </div>

                {/* Max Price */}
                <div className="flex flex-col gap-1.5">
                  <label className="text-[10px] uppercase font-bold text-zinc-400 tracking-wider">Max Price (৳)</label>
                  <div className="flex items-center gap-2">
                    <input 
                      type="number" 
                      name="maxPrice" 
                      defaultValue={currentMaxPrice}
                      placeholder="Max"
                      min="0"
                      className="w-full h-12 rounded-xl border border-zinc-200 bg-zinc-50 px-4 text-sm text-zinc-700 outline-none focus:border-amber-500 focus:bg-white transition-all"
                    />
                    {hasActiveFilters && (
                      <button
                        type="button"
                        onClick={clearFilters}
                        title="Clear Filters"
                        className="h-12 px-3 rounded-xl bg-red-50 text-red-500 hover:bg-red-500 hover:text-white transition-all flex items-center justify-center border border-red-100"
                      >
                        <FaTimes />
                      </button>
                    )}
                  </div>
                </div>
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </form>
    </div>
  );
};

export default PerfumeSearchFilter;
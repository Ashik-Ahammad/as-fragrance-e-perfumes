"use client";
import { useRouter, useSearchParams } from "next/navigation";
import { motion } from "framer-motion";
import { FaSearch } from "react-icons/fa";

const PerfumeSearchFilter = () => {
  const router = useRouter();
  const searchParams = useSearchParams();

  const handleSearch = (e) => {
    e.preventDefault();

    const formData = new FormData(e.target);

    const search = formData.get("search");

    const params = new URLSearchParams(searchParams);

    if (search) {
      params.set("search", search);
    } else {
      params.delete("search");
    }

    router.push(`/shop?${params.toString()}`);
  };

  const containerVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: {
      opacity: 1,
      y: 0,
      transition: {
        duration: 0.5,
        ease: "easeOut",
        staggerChildren: 0.15,
      },
    },
  };

  const itemVariants = {
    hidden: { opacity: 0, y: 15 },
    visible: {
      opacity: 1,
      y: 0,
      transition: {
        duration: 0.4,
        ease: "easeOut",
      },
    },
  };

  return (
    <motion.form
      onSubmit={handleSearch}
      variants={containerVariants}
      initial="hidden"
      animate="visible"
      className="mb-14"
    >
      <motion.div
        variants={itemVariants}
        className="flex flex-col md:flex-row gap-4 items-center"
      >
        <div className="w-full relative">
          <input
            type="text"
            name="search"
            placeholder="🧴 Search by perfume name or category..."
            defaultValue={searchParams.get("search") || ""}
            className="w-full h-14 rounded-2xl border border-zinc-200 bg-white px-5 pr-14 text-sm text-zinc-800 outline-none transition-all duration-300 focus:border-amber-500 focus:ring-4 focus:ring-amber-100"
          />

          <FaSearch
 className="absolute right-5 top-1/2 -translate-y-1/2 text-zinc-400 w-5 h-5" />
        </div>

        <button
          type="submit"
          className="h-14 px-8 rounded-2xl bg-amber-600 hover:bg-amber-500 transition-all duration-300 text-white font-semibold text-sm tracking-wide shadow-lg hover:shadow-amber-500/20 whitespace-nowrap hover:cursor-pointer"
        >
          Search
        </button>
      </motion.div>
    </motion.form>
  );
};

export default PerfumeSearchFilter;
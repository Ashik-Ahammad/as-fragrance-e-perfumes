"use client";
import React, { useState, useEffect } from "react";
import Image from "next/image";
import Link from "next/link";
import { FiPlus } from "react-icons/fi";
import { FaBangladeshiTakaSign } from "react-icons/fa6";
import { toast } from "sonner";
import { getPerfumes } from "@/services/perfumeService";
import { EditModal } from "@/components/ui/EditModal";
import { DeleteModal } from "@/components/ui/DeleteModal";

export default function PerfumeManagement({ initialPerfumes = [] }) {
  const [perfumes, setPerfumes] = useState(initialPerfumes);
  const [isLoading, setIsLoading] = useState(!initialPerfumes.length);

  const fetchPerfumes = async () => {
    try {
      const data = await getPerfumes();
      setPerfumes(data);
    } catch (error) {
      toast.error("Failed to fetch perfumes");
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    if (!initialPerfumes.length) {
      fetchPerfumes();
    }
  }, [initialPerfumes]);

  if (isLoading) return <div className="p-10 text-center">Loading Perfumes...</div>;

  return (
    <div className="flex flex-col h-full">
      <div className="mb-6 shrink-0 flex justify-between items-center">
        <h1 className="text-2xl sm:text-3xl font-serif text-stone-900">
          Perfume Inventory
        </h1>
        <Link
          href="/add-perfumes"
          className="bg-stone-900 text-white px-5 py-2.5 rounded-xl text-sm font-bold flex items-center gap-2 hover:bg-amber-600 transition-colors shadow-md"
        >
          <FiPlus className="text-lg" /> Add New
        </Link>
      </div>
      <div className="bg-white border border-stone-200 rounded-2xl shadow-sm flex-1 overflow-hidden flex flex-col">
        <div className="overflow-x-auto flex-1">
          <table className="w-full text-left border-collapse min-w-[800px]">
            <thead className="bg-stone-100 sticky top-0 z-10">
              <tr className="text-stone-600 text-xs uppercase tracking-widest">
                <th className="p-5 font-bold">Image</th>
                <th className="p-5 font-bold">Fragrance Name</th>
                <th className="p-5 font-bold">Price & Stock</th>
                <th className="p-5 font-bold text-right">Actions</th>
              </tr>
            </thead>
            <tbody className="text-sm divide-y divide-stone-100">
              {perfumes.map((p) => (
                <tr key={p._id} className="hover:bg-stone-50 transition-colors">
                  <td className="p-5">
                    <div className="w-14 h-14 relative rounded-xl overflow-hidden border border-stone-200 bg-stone-50">
                      <Image
                        src={p.imageUrl || "/assets/defaultPerfumeImage.png"}
                        alt={p.perfumeTitle}
                        fill
                        className="object-cover"
                      />
                    </div>
                  </td>
                  <td className="p-5">
                    <p className="font-bold text-stone-900 text-base mb-1">
                      {p.perfumeTitle}
                    </p>
                    <p className="text-[10px] font-bold text-stone-500 uppercase tracking-widest">
                      {p.category}
                    </p>
                  </td>
                  <td className="p-5">
                    <p className="font-bold flex items-center text-sm text-stone-900 mb-1">
                      <FaBangladeshiTakaSign className="text-xs mr-0.5" />
                      {p.price}
                    </p>
                    <p
                      className={`text-[10px] font-bold uppercase ${p.stock === "InStock" ? "text-emerald-600" : "text-rose-500"}`}
                    >
                      {p.stock}
                    </p>
                  </td>
                  <td className="p-5">
                    <div className="flex items-center justify-end gap-3">
                      <EditModal perfume={p} onSuccess={fetchPerfumes} />
                      <DeleteModal perfume={p} onSuccess={fetchPerfumes} />
                    </div>
                  </td>
                </tr>
              ))}
              {perfumes.length === 0 && (
                <tr>
                  <td colSpan="4" className="p-12 text-center text-stone-500">
                    No perfumes found.
                  </td>
                </tr>
              )}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}

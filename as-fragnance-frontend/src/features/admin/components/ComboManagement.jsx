"use client";
import React, { useState, useEffect } from "react";
import Image from "next/image";
import { FiLink, FiCopy, FiTrash2 } from "react-icons/fi";
import { FaBangladeshiTakaSign } from "react-icons/fa6";
import { toast } from "sonner";
import { getCombos, deleteCombo } from "@/services/comboService";
import { getPerfumes } from "@/services/perfumeService";
import ComboFormModal from "./modals/ComboFormModal";

export default function ComboManagement() {
  const [combos, setCombos] = useState([]);
  const [perfumes, setPerfumes] = useState([]);
  const [isLoading, setIsLoading] = useState(true);

  const fetchData = async () => {
    try {
      const [combosData, perfumesData] = await Promise.all([getCombos(), getPerfumes()]);
      setCombos(combosData);
      setPerfumes(perfumesData);
    } catch (error) {
      toast.error("Failed to fetch combos/perfumes");
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    fetchData();
  }, []);

  const handleCopyComboId = (id) => {
    const link = `/combos/${id}`;
    navigator.clipboard.writeText(link);
    toast.success(`Link copied! → ${link}`);
  };

  const handleDeleteCombo = async (id) => {
    if (!confirm("Delete this combo?")) return;
    try {
      await deleteCombo(id);
      toast.success("Combo deleted");
      fetchData();
    } catch {
      toast.error("Failed to delete combo");
    }
  };

  if (isLoading) return <div className="p-10 text-center">Loading Combos...</div>;

  return (
    <div className="flex flex-col h-full">
      <div className="mb-6 shrink-0 flex justify-between items-center">
        <div>
          <h1 className="text-2xl sm:text-3xl font-serif text-stone-900">
            Combo Deals
          </h1>
          <p className="text-sm text-stone-500 mt-1">
            Click the link icon to copy banner link
          </p>
        </div>
        <ComboFormModal onSuccess={fetchData} perfumes={perfumes} />
      </div>
      <div className="bg-white border border-stone-200 rounded-2xl shadow-sm flex-1 overflow-hidden flex flex-col">
        <div className="overflow-x-auto flex-1">
          <table className="w-full text-left border-collapse min-w-[900px]">
            <thead className="bg-stone-100 sticky top-0 z-10">
              <tr className="text-stone-600 text-xs uppercase tracking-widest">
                <th className="p-5 font-bold">Image</th>
                <th className="p-5 font-bold">Combo Title</th>
                <th className="p-5 font-bold">Included Perfumes</th>
                <th className="p-5 font-bold">Price</th>
                <th className="p-5 font-bold">Banner Link</th>
                <th className="p-5 font-bold text-right">Actions</th>
              </tr>
            </thead>
            <tbody className="text-sm divide-y divide-stone-100">
              {combos.map((combo) => (
                <tr key={combo._id} className="hover:bg-stone-50">
                  <td className="p-5">
                    <div className="w-16 h-16 relative rounded-xl overflow-hidden border border-stone-200 bg-stone-50">
                      <Image
                        src={combo.imageUrl || "/assets/defaultPerfumeImage.png"}
                        alt={combo.title}
                        fill
                        className="object-cover"
                      />
                    </div>
                  </td>
                  <td className="p-5">
                    <p className="font-bold text-stone-900">{combo.title}</p>
                    {combo.badge && (
                      <span className="inline-block mt-1 text-[10px] font-bold text-amber-700 bg-amber-50 border border-amber-200 px-2 py-0.5 rounded-full">
                        {combo.badge}
                      </span>
                    )}
                  </td>
                  <td className="p-5">
                    <div className="flex flex-wrap gap-1.5">
                      {combo.items?.map((item, i) => (
                        <span
                          key={i}
                          className="text-[10px] bg-stone-50 border border-stone-200 text-stone-500 px-2 py-0.5 rounded-full"
                        >
                          {item.name}
                        </span>
                      ))}
                      {(!combo.items || combo.items.length === 0) && (
                        <span className="text-stone-400 text-xs">No items</span>
                      )}
                    </div>
                  </td>
                  <td className="p-5">
                    <p className="font-bold text-stone-900 flex items-center">
                      <FaBangladeshiTakaSign className="text-xs mr-0.5" />
                      {combo.price}
                    </p>
                    {combo.originalPrice && (
                      <p className="text-xs text-stone-400 line-through flex items-center">
                        <FaBangladeshiTakaSign className="text-[9px]" />
                        {combo.originalPrice}
                      </p>
                    )}
                  </td>
                  <td className="p-5">
                    <button
                      onClick={() => handleCopyComboId(combo._id)}
                      className="inline-flex items-center gap-2 text-xs font-semibold text-stone-500 bg-stone-50 border border-stone-200 px-3 py-2 rounded-xl hover:bg-amber-50 hover:text-amber-700 hover:border-amber-200 transition-colors group"
                    >
                      <FiLink className="group-hover:text-amber-600" />
                      <span className="font-mono text-[10px]">
                        /combos/{combo._id.slice(-6)}...
                      </span>
                      <FiCopy className="opacity-50 group-hover:opacity-100" />
                    </button>
                  </td>
                  <td className="p-5 text-right">
                    <div className="flex items-center justify-end gap-2">
                      <ComboFormModal onSuccess={fetchData} perfumes={perfumes} existingCombo={combo} />
                      <button
                        onClick={() => handleDeleteCombo(combo._id)}
                        className="p-2.5 text-rose-400 hover:text-rose-600 hover:bg-rose-50 rounded-xl transition-colors"
                      >
                        <FiTrash2 />
                      </button>
                    </div>
                  </td>
                </tr>
              ))}
              {combos.length === 0 && (
                <tr>
                  <td colSpan="6" className="p-12 text-center text-stone-500">
                    No combos yet. Create your first deal!
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

"use client";
import React, { useState, useEffect } from "react";
import Image from "next/image";
import { FiLink, FiTrash2 } from "react-icons/fi";
import { toast } from "sonner";
import { getBanners, deleteBanner } from "@/services/bannerService";
import BannerFormModal from "./modals/BannerFormModal";

export default function BannerManagement() {
  const [banners, setBanners] = useState([]);
  const [isLoading, setIsLoading] = useState(true);

  const fetchBanners = async () => {
    try {
      const data = await getBanners();
      setBanners(data);
    } catch (error) {
      toast.error("Failed to fetch banners");
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    fetchBanners();
  }, []);

  const handleDeleteBanner = async (id) => {
    if (!confirm("Delete this banner?")) return;
    try {
      await deleteBanner(id);
      toast.success("Banner deleted");
      fetchBanners();
    } catch {
      toast.error("Failed to delete banner");
    }
  };

  if (isLoading) return <div className="p-10 text-center">Loading Banners...</div>;

  return (
    <div className="flex flex-col h-full">
      <div className="mb-6 shrink-0 flex justify-between items-center">
        <div>
          <h1 className="text-2xl sm:text-3xl font-serif text-stone-900">
            Banner Control
          </h1>
          <p className="text-sm text-stone-500 mt-1">
            Manage homepage carousel slides
          </p>
        </div>
        <BannerFormModal onSuccess={fetchBanners} />
      </div>
      <div className="bg-white border border-stone-200 rounded-2xl shadow-sm flex-1 overflow-hidden flex flex-col">
        <div className="overflow-x-auto flex-1">
          <table className="w-full text-left border-collapse min-w-[800px]">
            <thead className="bg-stone-100 sticky top-0 z-10">
              <tr className="text-stone-600 text-xs uppercase tracking-widest">
                <th className="p-5 font-bold">Preview</th>
                <th className="p-5 font-bold">Title & Subtitle</th>
                <th className="p-5 font-bold">Button</th>
                <th className="p-5 font-bold">Order</th>
                <th className="p-5 font-bold text-right">Actions</th>
              </tr>
            </thead>
            <tbody className="text-sm divide-y divide-stone-100">
              {banners.map((banner) => (
                <tr key={banner._id} className="hover:bg-stone-50">
                  <td className="p-5">
                    <div className="relative w-28 h-16 rounded-xl overflow-hidden bg-zinc-800">
                      <Image
                        src={banner.imageUrl}
                        alt={banner.title}
                        fill
                        className="object-cover object-top opacity-80"
                        unoptimized
                        onError={() => {}}
                      />
                    </div>
                  </td>
                  <td className="p-5">
                    <p className="font-bold text-stone-900">{banner.title}</p>
                    <p className="text-xs text-amber-600 font-medium uppercase tracking-wide mt-0.5">
                      {banner.subtitle}
                    </p>
                  </td>
                  <td className="p-5">
                    <p className="text-xs font-bold text-stone-800">{banner.buttonText}</p>
                    <p className="text-[10px] text-stone-400 flex items-center gap-1 mt-0.5">
                      <FiLink className="shrink-0" />
                      {banner.buttonLink}
                    </p>
                  </td>
                  <td className="p-5">
                    <span className="bg-stone-100 text-stone-700 font-bold text-sm px-3 py-1 rounded-lg">
                      #{banner.order}
                    </span>
                  </td>
                  <td className="p-5 text-right">
                    <div className="flex items-center justify-end gap-2">
                      <BannerFormModal onSuccess={fetchBanners} existingBanner={banner} />
                      <button
                        onClick={() => handleDeleteBanner(banner._id)}
                        className="p-2.5 text-rose-400 hover:text-rose-600 hover:bg-rose-50 rounded-xl transition-colors"
                      >
                        <FiTrash2 />
                      </button>
                    </div>
                  </td>
                </tr>
              ))}
              {banners.length === 0 && (
                <tr>
                  <td colSpan="5" className="p-12 text-center text-stone-500">
                    No banners yet.
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

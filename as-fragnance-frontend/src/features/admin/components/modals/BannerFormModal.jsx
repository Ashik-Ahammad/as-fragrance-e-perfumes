"use client";
import React, { useState } from "react";
import Image from "next/image";
import { FiPlus, FiX, FiEdit2 } from "react-icons/fi";
import { toast } from "sonner";
import { addBanner, updateBanner } from "@/services/bannerService";
import { uploadImageToImgBB } from "@/utils/imgbbUpload";

export default function BannerFormModal({ onSuccess, existingBanner = null }) {
  const isEdit = !!existingBanner;
  const [open, setOpen] = useState(false);
  const [saving, setSaving] = useState(false);
  const [imageFile, setImageFile] = useState(null);
  
  const defaultForm = {
    title: "",
    subtitle: "",
    description: "",
    imageUrl: "",
    buttonText: "Shop Now",
    buttonLink: "/shop",
    align: "left",
    order: 0,
  };
  
  const [form, setForm] = useState(defaultForm);

  const handleOpen = () => {
    if (isEdit) {
      setForm({
        title: existingBanner.title || "",
        subtitle: existingBanner.subtitle || "",
        description: existingBanner.description || "",
        imageUrl: existingBanner.imageUrl || "",
        buttonText: existingBanner.buttonText || "Shop Now",
        buttonLink: existingBanner.buttonLink || "/shop",
        align: existingBanner.align || "left",
        order: existingBanner.order ?? 0,
      });
    } else {
      setForm(defaultForm);
    }
    setImageFile(null);
    setOpen(true);
  };

  const handleSave = async () => {
    if (!form.title || (!form.imageUrl && !imageFile)) return toast.error("Title and Image required");
    setSaving(true);
    const loadingToast = toast.loading("Saving banner...");

    try {
      let finalImageUrl = form.imageUrl;
      if (imageFile) {
        toast.loading("Uploading image...", { id: loadingToast });
        finalImageUrl = await uploadImageToImgBB(imageFile);
      }

      const payload = { ...form, imageUrl: finalImageUrl };

      if (isEdit) {
        await updateBanner(existingBanner._id, payload);
        toast.success("Banner updated!", { id: loadingToast });
      } else {
        await addBanner(payload);
        toast.success("Banner added!", { id: loadingToast });
      }
      setOpen(false);
      onSuccess();
    } catch {
      toast.error("Failed to save banner", { id: loadingToast });
    } finally {
      setSaving(false);
    }
  };

  const inp = "w-full bg-stone-50 border border-stone-200 rounded-xl px-4 py-2.5 text-sm outline-none focus:border-amber-400 transition-colors";
  const lbl = "text-[10px] font-bold text-stone-500 uppercase tracking-widest block mb-1.5";

  return (
    <>
      <button
        onClick={handleOpen}
        className={`flex items-center gap-2 ${isEdit ? "p-2 text-stone-400 hover:text-amber-600 hover:bg-amber-50 rounded-xl border border-transparent hover:border-amber-100 transition-colors" : "bg-stone-900 text-white px-5 py-2.5 rounded-xl text-sm font-bold hover:bg-amber-600 transition-colors shadow-md"}`}
      >
        {isEdit ? <FiEdit2 /> : <><FiPlus className="text-lg" /> Add Banner</>}
      </button>
      
      {open && (
        <div
          className="fixed inset-0 z-50 bg-black/50 backdrop-blur-sm flex items-center justify-center p-4"
          onClick={() => setOpen(false)}
        >
          <div
            className="bg-white rounded-3xl shadow-2xl w-full max-w-lg p-6 space-y-4 max-h-[90vh] overflow-y-auto"
            onClick={(e) => e.stopPropagation()}
          >
            <div className="flex justify-between items-center">
              <h2 className="font-bold text-stone-900 text-lg">
                {isEdit ? "Edit Banner" : "Add New Banner"}
              </h2>
              <button onClick={() => setOpen(false)} className="p-2 hover:bg-stone-100 rounded-xl">
                <FiX />
              </button>
            </div>
            {form.imageUrl && (
              <div className="relative w-full h-36 rounded-2xl overflow-hidden bg-stone-100">
                <Image
                  src={form.imageUrl}
                  alt="preview"
                  fill
                  className="object-cover object-top"
                  unoptimized
                  onError={() => {}}
                />
              </div>
            )}
            <div className="grid grid-cols-2 gap-3">
              <div className="col-span-2">
                <label className={lbl}>Banner Image File</label>
                <input
                  type="file"
                  accept="image/*"
                  onChange={(e) => {
                    const file = e.target.files[0];
                    if (file) {
                      setImageFile(file);
                      setForm({ ...form, imageUrl: URL.createObjectURL(file) });
                    }
                  }}
                  className="block w-full text-sm text-stone-500 file:mr-3 file:py-2.5 file:px-4 file:rounded-xl file:border-0 file:text-[10px] file:uppercase file:tracking-wider file:font-bold file:bg-white file:border file:border-stone-200 file:text-stone-700 hover:file:bg-amber-50 hover:file:text-amber-700 hover:file:border-amber-200 cursor-pointer transition-all bg-stone-50 rounded-xl px-2 py-1.5"
                />
              </div>
              <div className="col-span-2">
                <label className={lbl}>Title</label>
                <input className={inp} placeholder="Vampire Blood" value={form.title} onChange={(e) => setForm({ ...form, title: e.target.value })} />
              </div>
              <div className="col-span-2">
                <label className={lbl}>Subtitle</label>
                <input className={inp} placeholder="OUR #1 BEST SELLER" value={form.subtitle} onChange={(e) => setForm({ ...form, subtitle: e.target.value })} />
              </div>
              <div className="col-span-2">
                <label className={lbl}>Description</label>
                <textarea className={inp} rows={2} value={form.description} onChange={(e) => setForm({ ...form, description: e.target.value })} />
              </div>
              <div>
                <label className={lbl}>Button Text</label>
                <input className={inp} placeholder="Buy Now" value={form.buttonText} onChange={(e) => setForm({ ...form, buttonText: e.target.value })} />
              </div>
              <div>
                <label className={lbl}>Button Link</label>
                <input className={inp} placeholder="/shop" value={form.buttonLink} onChange={(e) => setForm({ ...form, buttonLink: e.target.value })} />
              </div>
              <div>
                <label className={lbl}>Text Align</label>
                <select className={inp} value={form.align} onChange={(e) => setForm({ ...form, align: e.target.value })}>
                  <option value="left">Left</option>
                  <option value="center">Center</option>
                </select>
              </div>
              <div>
                <label className={lbl}>Order</label>
                <input type="number" className={inp} value={form.order} onChange={(e) => setForm({ ...form, order: Number(e.target.value) })} />
              </div>
            </div>
            <button
              onClick={handleSave}
              disabled={saving}
              className="w-full py-3 bg-stone-900 text-white rounded-xl font-bold uppercase tracking-widest text-xs hover:bg-amber-600 transition-colors disabled:opacity-50"
            >
              {saving ? "Saving..." : isEdit ? "Update Banner" : "Add Banner"}
            </button>
          </div>
        </div>
      )}
    </>
  );
}

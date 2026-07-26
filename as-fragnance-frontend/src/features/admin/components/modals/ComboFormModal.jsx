"use client";
import React, { useState } from "react";
import Image from "next/image";
import { FiPlus, FiX, FiEdit2, FiCheckCircle } from "react-icons/fi";
import { toast } from "sonner";
import { addCombo, updateCombo } from "@/services/comboService";
import { uploadImageToImgBB } from "@/utils/imgbbUpload";

export default function ComboFormModal({ onSuccess, perfumes = [], existingCombo = null }) {
  const isEdit = !!existingCombo;
  const [open, setOpen] = useState(false);
  const [saving, setSaving] = useState(false);
  const [selectedPerfumeIds, setSelectedPerfumeIds] = useState([]);
  const [imageFile, setImageFile] = useState(null);
  
  const defaultForm = {
    title: "",
    description: "",
    imageUrl: "",
    price: "",
    originalPrice: "",
    badge: "",
  };
  
  const [form, setForm] = useState(defaultForm);

  const handleOpen = () => {
    if (isEdit) {
      setForm({
        title: existingCombo.title || "",
        description: existingCombo.description || "",
        imageUrl: existingCombo.imageUrl || "",
        price: existingCombo.price || "",
        originalPrice: existingCombo.originalPrice || "",
        badge: existingCombo.badge || "",
      });
      setSelectedPerfumeIds(existingCombo.items?.map((i) => i.productId) || []);
    } else {
      setForm(defaultForm);
      setSelectedPerfumeIds([]);
    }
    setImageFile(null);
    setOpen(true);
  };

  const togglePerfume = (perfume) => {
    setSelectedPerfumeIds((prev) =>
      prev.includes(perfume._id) ? prev.filter((id) => id !== perfume._id) : [...prev, perfume._id]
    );
  };

  const handleSave = async () => {
    if (!form.title || !form.price) return toast.error("Title and Price required");
    setSaving(true);
    const loadingToast = toast.loading("Saving combo...");
    
    const items = selectedPerfumeIds.map((id) => {
      const p = perfumes.find((p) => p._id === id);
      return {
        productId: p._id,
        name: p.perfumeTitle,
        imageUrl: p.imageUrl || "",
      };
    });

    try {
      let finalImageUrl = form.imageUrl;
      if (imageFile) {
        toast.loading("Uploading image...", { id: loadingToast });
        finalImageUrl = await uploadImageToImgBB(imageFile);
      }

      const payload = { ...form, imageUrl: finalImageUrl, items };
      if (isEdit) {
        await updateCombo(existingCombo._id, payload);
        toast.success("Combo updated!", { id: loadingToast });
      } else {
        await addCombo(payload);
        toast.success("Combo created!", { id: loadingToast });
      }
      setOpen(false);
      onSuccess();
    } catch {
      toast.error("Failed to save combo", { id: loadingToast });
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
        {isEdit ? <FiEdit2 /> : <><FiPlus className="text-lg" /> Create Combo</>}
      </button>
      
      {open && (
        <div
          className="fixed inset-0 z-50 bg-black/50 backdrop-blur-sm flex items-center justify-center p-4"
          onClick={() => setOpen(false)}
        >
          <div
            className="bg-white rounded-3xl shadow-2xl w-full max-w-2xl p-6 space-y-4 max-h-[90vh] overflow-y-auto"
            onClick={(e) => e.stopPropagation()}
          >
            <div className="flex justify-between items-center">
              <h2 className="font-bold text-stone-900 text-lg">
                {isEdit ? "Edit Combo" : "Create Combo Deal"}
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
                  className="object-cover"
                  unoptimized
                  onError={() => {}}
                />
              </div>
            )}
            <div className="grid grid-cols-2 gap-3">
              <div className="col-span-2">
                <label className={lbl}>Combo Image File</label>
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
                <label className={lbl}>Combo Title</label>
                <input className={inp} placeholder="The Royal Combo" value={form.title} onChange={(e) => setForm({ ...form, title: e.target.value })} />
              </div>
              <div className="col-span-2">
                <label className={lbl}>Description</label>
                <textarea className={inp} rows={2} value={form.description} onChange={(e) => setForm({ ...form, description: e.target.value })} />
              </div>
              <div>
                <label className={lbl}>Combo Price (BDT)</label>
                <input type="number" className={inp} value={form.price} onChange={(e) => setForm({ ...form, price: e.target.value })} />
              </div>
              <div>
                <label className={lbl}>Original Price (optional)</label>
                <input type="number" className={inp} value={form.originalPrice} onChange={(e) => setForm({ ...form, originalPrice: e.target.value })} />
              </div>
              <div className="col-span-2">
                <label className={lbl}>Badge</label>
                <input className={inp} value={form.badge} onChange={(e) => setForm({ ...form, badge: e.target.value })} />
              </div>
            </div>
            <div>
              <label className={lbl}>Select Perfumes ({selectedPerfumeIds.length} selected)</label>
              <div className="grid grid-cols-2 gap-2 max-h-52 overflow-y-auto pr-1 mt-1">
                {perfumes.map((p) => {
                  const selected = selectedPerfumeIds.includes(p._id);
                  return (
                    <div
                      key={p._id}
                      onClick={() => togglePerfume(p)}
                      className={`flex items-center gap-3 p-3 rounded-xl border cursor-pointer transition-all ${selected ? "border-amber-400 bg-amber-50" : "border-stone-200 bg-stone-50 hover:border-stone-300"}`}
                    >
                      <div className="relative w-10 h-10 rounded-lg overflow-hidden shrink-0 bg-stone-100">
                        <Image src={p.imageUrl || "/assets/defaultPerfumeImage.png"} alt={p.perfumeTitle} fill className="object-cover" />
                      </div>
                      <p className="text-xs font-medium text-stone-800 line-clamp-2 flex-1">{p.perfumeTitle}</p>
                      {selected && <FiCheckCircle className="text-amber-500 shrink-0" />}
                    </div>
                  );
                })}
              </div>
            </div>
            <button
              onClick={handleSave}
              disabled={saving}
              className="w-full py-3 bg-stone-900 text-white rounded-xl font-bold uppercase tracking-widest text-xs hover:bg-amber-600 transition-colors disabled:opacity-50"
            >
              {saving ? "Saving..." : isEdit ? "Update Combo" : "Create Combo"}
            </button>
          </div>
        </div>
      )}
    </>
  );
}

"use client";
import React, { useState } from "react";
import { FiEdit3, FiPlus, FiTrash2, FiSave, FiX } from "react-icons/fi";
import { FaBangladeshiTakaSign } from "react-icons/fa6";
import { toast } from "sonner";
import { authClient } from "@/lib/auth-client";
import { uploadImageToImgBB } from "@/utils/imgbbUpload";

export function EditModal({ perfume, onSuccess }) {
  const [open, setOpen] = useState(false);
  const [saving, setSaving] = useState(false);
  const [form, setForm] = useState({
    perfumeTitle: perfume?.perfumeTitle || "",
    category: perfume?.category || "",
    price: perfume?.price || "",
    stock: perfume?.stock || "",
    imageUrl: perfume?.imageUrl || "",
    topNotes: perfume?.topNotes || "",
    middleNotes: perfume?.middleNotes || "",
    baseNotes: perfume?.baseNotes || "",
    description: perfume?.description || "",
  });
  const [features, setFeatures] = useState(perfume?.features || []);
  const [imageFile, setImageFile] = useState(null);
  const [imagePreview, setImagePreview] = useState(perfume?.imageUrl || null);

  const categorySuggestions = [
    "Musk",
    "Oud",
    "Hawas Inspired",
    "Floral",
    "Woody",
    "Citrus",
    "Aquatic",
    "Spicy",
  ];
  const stockOptions = ["InStock", "PreOrder", "OutOfStock"];
  const stockLabels = {
    InStock: "In Stock",
    PreOrder: "Pre Order",
    OutOfStock: "Out Of Stock",
  };

  const handleOpen = () => {
    setForm({
      perfumeTitle: perfume?.perfumeTitle || "",
      category: perfume?.category || "",
      price: perfume?.price || "",
      stock: perfume?.stock || "",
      imageUrl: perfume?.imageUrl || "",
      topNotes: perfume?.topNotes || "",
      middleNotes: perfume?.middleNotes || "",
      baseNotes: perfume?.baseNotes || "",
      description: perfume?.description || "",
    });
    setFeatures(perfume?.features || []);
    setImageFile(null);
    setImagePreview(perfume?.imageUrl || null);
    setOpen(true);
  };

  const handleFeatureChange = (index, field, value) => {
    const updated = [...features];
    updated[index][field] = value;
    setFeatures(updated);
  };

  const handleAddFeature = () => {
    setFeatures([...features, { title: "", description: "" }]);
  };

  const handleRemoveFeature = (index) => {
    setFeatures(features.filter((_, i) => i !== index));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!form.perfumeTitle || !form.price)
      return toast.error("Title and Price are required");

    setSaving(true);
    const loadingToast = toast.loading("Updating fragrance...");

    try {
      const { data: tokenData } = await authClient.token();
      const jwtToken = tokenData?.token;
      if (!jwtToken) {
        toast.error("Auth failed. Please login again.", { id: loadingToast });
        return;
      }

      let finalImageUrl = form.imageUrl;
      if (imageFile) {
        toast.loading("Uploading new image...", { id: loadingToast });
        finalImageUrl = await uploadImageToImgBB(imageFile);
      }

      const payload = { ...form, imageUrl: finalImageUrl, features };

      const res = await fetch(
        `${process.env.NEXT_PUBLIC_SERVER_URL}/perfume/${perfume?._id}`,
        {
          method: "PATCH",
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${jwtToken}`,
          },
          body: JSON.stringify(payload),
        },
      );

      if (res.ok) {
        toast.success("Fragrance updated successfully! ✨", {
          id: loadingToast,
        });
        setOpen(false);
        if (onSuccess) onSuccess();
      } else {
        throw new Error("Failed");
      }
    } catch {
      toast.error("Something went wrong.", { id: loadingToast });
    } finally {
      setSaving(false);
    }
  };

  const inp =
    "w-full bg-stone-50 border border-stone-200 rounded-xl px-4 py-2.5 text-sm outline-none focus:border-amber-400 transition-colors text-stone-900 placeholder:text-stone-400";
  const lbl =
    "text-[10px] font-bold text-stone-500 uppercase tracking-widest block mb-1.5";

  return (
    <>

      <button
        onClick={handleOpen}
        className="flex items-center gap-2 px-4 py-2 bg-stone-50 border border-stone-200 text-stone-700 text-xs font-bold uppercase tracking-wider rounded-xl hover:bg-orange-50 hover:border-orange-200 hover:text-orange-600 transition-all cursor-pointer"
      >
        <FiEdit3 className="text-sm" /> Edit
      </button>

      {open && (
        <div
          className="fixed inset-0 z-50 bg-black/50 backdrop-blur-sm flex items-center justify-center p-4"
          onClick={() => setOpen(false)}
        >
          <div
            className="bg-white rounded-3xl shadow-2xl w-full max-w-2xl max-h-[90vh] overflow-y-auto"
            onClick={(e) => e.stopPropagation()}
          >

            <div className="flex items-center justify-between p-6 border-b border-stone-100 bg-stone-50/50 rounded-t-3xl sticky top-0 z-10">
              <h2 className="text-xl font-serif text-stone-900">
                Edit Perfume Details
              </h2>
              <button
                onClick={() => setOpen(false)}
                className="p-2 hover:bg-stone-100 rounded-xl transition-colors"
              >
                <FiX className="text-stone-500" />
              </button>
            </div>

            <form onSubmit={handleSubmit} className="p-6 sm:p-8 space-y-6">

              <div>
                <label className={lbl}>Perfume Title *</label>
                <input
                  required
                  className={inp}
                  placeholder="e.g. Hawas Ice EDP"
                  value={form.perfumeTitle}
                  onChange={(e) =>
                    setForm({ ...form, perfumeTitle: e.target.value })
                  }
                />
              </div>

              <div>
                <label className={lbl}>Category / Family *</label>
                <input
                  required
                  className={inp}
                  placeholder="Type or select below..."
                  value={form.category}
                  onChange={(e) =>
                    setForm({ ...form, category: e.target.value })
                  }
                />
                <div className="flex flex-wrap gap-2 mt-2">
                  {categorySuggestions.map((cat) => (
                    <button
                      key={cat}
                      type="button"
                      onClick={() => setForm({ ...form, category: cat })}
                      className={`text-[10px] font-bold uppercase tracking-wider px-3 py-1.5 rounded-full border transition-all ${
                        form.category === cat
                          ? "bg-amber-600 text-white border-amber-600"
                          : "bg-white text-stone-500 border-stone-200 hover:border-amber-400 hover:text-amber-600"
                      }`}
                    >
                      {cat}
                    </button>
                  ))}
                </div>
              </div>

              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label className={lbl}>Price (BDT) *</label>
                  <input
                    required
                    type="number"
                    className={inp}
                    placeholder="e.g. 1200"
                    value={form.price}
                    onChange={(e) =>
                      setForm({ ...form, price: e.target.value })
                    }
                  />
                </div>
                <div className="flex flex-col">
                  <label className={lbl}>Image File</label>
                  <div className="flex items-center gap-3">
                    {(imagePreview || form.imageUrl) && (
                      <div className="w-[42px] h-[42px] rounded-xl overflow-hidden border border-stone-200 shrink-0 shadow-sm bg-white">
                        <img src={imagePreview || form.imageUrl} alt="Preview" className="w-full h-full object-cover" />
                      </div>
                    )}
                    <input
                      type="file"
                      accept="image/*"
                      onChange={(e) => {
                        const file = e.target.files[0];
                        if (file) {
                          setImageFile(file);
                          setImagePreview(URL.createObjectURL(file));
                        } else {
                          setImageFile(null);
                          setImagePreview(form.imageUrl || null);
                        }
                      }}
                      className="block w-full text-sm text-stone-500 file:mr-3 file:py-2 file:px-4 file:rounded-xl file:border-0 file:text-[10px] file:uppercase file:tracking-wider file:font-bold file:bg-white file:border file:border-stone-200 file:text-stone-700 hover:file:bg-amber-50 hover:file:text-amber-700 hover:file:border-amber-200 cursor-pointer transition-all h-[42px] pt-1"
                    />
                  </div>
                </div>
              </div>

              <div>
                <label className={lbl}>Stock Status *</label>
                <input
                  required
                  className={inp}
                  placeholder="Select below..."
                  value={form.stock}
                  onChange={(e) => setForm({ ...form, stock: e.target.value })}
                />
                <div className="flex flex-wrap gap-2 mt-2">
                  {stockOptions.map((s) => (
                    <button
                      key={s}
                      type="button"
                      onClick={() => setForm({ ...form, stock: s })}
                      className={`text-[10px] font-bold uppercase tracking-wider px-3 py-1.5 rounded-full border transition-all ${
                        form.stock === s
                          ? "bg-amber-600 text-white border-amber-600"
                          : "bg-white text-stone-500 border-stone-200 hover:border-amber-400 hover:text-amber-600"
                      }`}
                    >
                      {stockLabels[s]}
                    </button>
                  ))}
                </div>
              </div>

              <div className="bg-stone-50 border border-stone-200 rounded-2xl p-5 space-y-4">
                <h3 className="text-sm font-bold text-stone-700 flex items-center gap-2">
                  🌸 Fragrance Pyramid
                </h3>
                <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                  <div>
                    <label className={lbl}>Top Notes</label>
                    <textarea
                      rows={3}
                      className={inp + " resize-none"}
                      placeholder="e.g. Bergamot, Lemon..."
                      value={form.topNotes}
                      onChange={(e) =>
                        setForm({ ...form, topNotes: e.target.value })
                      }
                    />
                  </div>
                  <div>
                    <label className={lbl}>Middle Notes</label>
                    <textarea
                      rows={3}
                      className={inp + " resize-none"}
                      placeholder="e.g. Jasmine, Rose..."
                      value={form.middleNotes}
                      onChange={(e) =>
                        setForm({ ...form, middleNotes: e.target.value })
                      }
                    />
                  </div>
                  <div>
                    <label className={lbl}>Base Notes</label>
                    <textarea
                      rows={3}
                      className={inp + " resize-none"}
                      placeholder="e.g. Musk, Amber..."
                      value={form.baseNotes}
                      onChange={(e) =>
                        setForm({ ...form, baseNotes: e.target.value })
                      }
                    />
                  </div>
                </div>
              </div>

              <div className="bg-amber-50/40 border border-amber-100 rounded-2xl p-5 space-y-4">
                <div className="flex items-center justify-between">
                  <h3 className="text-sm font-bold text-stone-700">
                    ⭐ Features & Benefits
                  </h3>
                  <button
                    type="button"
                    onClick={handleAddFeature}
                    className="flex items-center gap-1.5 text-xs font-bold text-amber-700 hover:text-white bg-amber-100 hover:bg-amber-500 px-3 py-1.5 rounded-full transition-all"
                  >
                    <FiPlus /> Add Feature
                  </button>
                </div>
                <div className="space-y-3">
                  {features.map((feature, index) => (
                    <div
                      key={index}
                      className="flex flex-col md:flex-row gap-2 items-start md:items-center bg-white p-3 rounded-xl border border-stone-100 shadow-xs"
                    >
                      <input
                        type="text"
                        placeholder="Feature Title"
                        value={feature.title}
                        onChange={(e) =>
                          handleFeatureChange(index, "title", e.target.value)
                        }
                        className="w-full md:w-1/3 bg-transparent text-sm font-semibold text-stone-800 placeholder:text-stone-400 px-2 py-1 outline-none border-b border-stone-200 md:border-b-0 md:border-r md:pr-3"
                      />
                      <input
                        type="text"
                        placeholder="Description"
                        value={feature.description}
                        onChange={(e) =>
                          handleFeatureChange(
                            index,
                            "description",
                            e.target.value,
                          )
                        }
                        className="flex-1 bg-transparent text-sm text-stone-600 placeholder:text-stone-400 px-2 py-1 outline-none"
                      />
                      <button
                        type="button"
                        onClick={() => handleRemoveFeature(index)}
                        className="p-2 text-rose-400 hover:text-rose-600 hover:bg-rose-50 rounded-xl transition-colors shrink-0"
                      >
                        <FiTrash2 />
                      </button>
                    </div>
                  ))}
                  {features.length === 0 && (
                    <p className="text-xs text-stone-400 text-center py-2">
                      No features yet. Add one!
                    </p>
                  )}
                </div>
              </div>

              <div>
                <label className={lbl}>General Scent Description *</label>
                <textarea
                  required
                  rows={4}
                  className={inp + " resize-none"}
                  placeholder="Describe the overall feeling, inspiration, and mood..."
                  value={form.description}
                  onChange={(e) =>
                    setForm({ ...form, description: e.target.value })
                  }
                />
              </div>

              <div className="flex justify-end gap-3 pt-4 border-t border-stone-100">
                <button
                  type="button"
                  onClick={() => setOpen(false)}
                  className="px-6 py-2.5 text-sm font-bold text-stone-600 bg-stone-100 hover:bg-stone-200 rounded-xl transition-colors"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  disabled={saving}
                  className="flex items-center gap-2 px-6 py-2.5 text-sm font-bold text-white bg-amber-600 hover:bg-amber-500 rounded-xl transition-colors disabled:opacity-50 shadow-md"
                >
                  <FiSave /> {saving ? "Saving..." : "Update Perfume"}
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </>
  );
}

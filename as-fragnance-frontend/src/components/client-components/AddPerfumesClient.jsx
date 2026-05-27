"use client";
import React, { useState } from "react";
import { motion } from "framer-motion";
import { useRouter } from "next/navigation";
import { Input, Label, TextArea, TextField, FieldError } from "@heroui/react";
import {
  FiBox,
  FiTag,
  FiAlignLeft,
  FiPackage,
  FiImage,
  FiFileText,
  FiPlus,
  FiTrash2,
  FiStar,
} from "react-icons/fi";
import { toast } from "sonner";
import { FaBangladeshiTakaSign } from "react-icons/fa6";
import { authClient } from "@/lib/auth-client";

const AddPerfumesClient = () => {
  const router = useRouter();

  const initialFeatures = [
    {
      title: "Long-lasting",
      description: "Boasts exceptional longevity, lingering on skin for hours.",
    },
    {
      title: "Projection",
      description: "Approximately 3 meters",
    },
  ];

  const [category, setCategory] = useState("");
  const [stock, setStock] = useState("");
  const [features, setFeatures] = useState(initialFeatures);

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

  const stockOptions = ["In Stock", "Pre Order", "Out Of Stock"];

  const fadeUp = {
    hidden: { opacity: 0, y: 30 },
    visible: {
      opacity: 1,
      y: 0,
      transition: { duration: 0.6, ease: "easeOut" },
    },
  };

  const onSubmit = async (e) => {
    e.preventDefault();

    const loadingToast = toast.loading("Adding your perfume...");

    const formData = new FormData(e.currentTarget);
    const perfumeData = Object.fromEntries(formData.entries());

    const finalPayload = {
      ...perfumeData,
      features,
    };

    try {
      const { data: tokenData } = await authClient.token();
      const jwtToken = tokenData?.token;

      if (!jwtToken) {
        toast.error("Authentication failed. Please login again.");
        return;
      }

      const res = await fetch(`${process.env.NEXT_PUBLIC_SERVER_URL}/perfume`, {
        method: "POST",
        headers: {
          "Content-type": "application/json",
          Authorization: `Bearer ${jwtToken}`,
        },
        body: JSON.stringify(finalPayload),
      });

      if (res.ok) {
        toast.success("Perfume added successfully! ✨", {
          id: loadingToast,
        });

        e.target.reset();
        setCategory("");
        setStock("");
        setFeatures(initialFeatures);
        router.refresh();
      } else {
        throw new Error("Failed to save data");
      }
    } catch (error) {
      console.error("Error submitting:", error);
      toast.error("Something went wrong!", {
        id: loadingToast,
      });
    }
  };

  const handleAddFeature = () => {
    setFeatures([
      ...features,
      {
        title: "",
        description: "",
      },
    ]);
  };

  const handleRemoveFeature = (index) => {
    setFeatures(features.filter((_, i) => i !== index));
  };

  const handleFeatureChange = (index, field, value) => {
    const updatedFeatures = [...features];
    updatedFeatures[index][field] = value;
    setFeatures(updatedFeatures);
  };

  const inputClass =
    "w-full bg-white/70 border border-stone-200 focus:bg-white focus:border-amber-500 rounded-xl shadow-sm transition-all h-[50px] min-h-[50px] px-4 text-sm text-stone-900 outline-none placeholder:text-stone-400";

  const labelClass =
    "flex items-center gap-2 text-xs font-bold text-stone-500 uppercase tracking-widest mb-2.5 transition-colors group-hover:text-amber-600 group-focus-within:text-amber-600";

  return (
    <div className="bg-[radial-gradient(ellipse_at_top,var(--tw-gradient-stops))] from-amber-100 via-rose-50 to-white min-h-screen w-full flex items-center justify-center py-24 px-4 sm:px-6 relative overflow-hidden text-stone-700 font-sans">

      <div className="absolute top-0 right-0 w-[600px] h-[600px] bg-amber-200/40 rounded-full blur-[140px] pointer-events-none"></div>
      <div className="absolute bottom-0 left-0 w-[600px] h-[600px] bg-rose-200/40 rounded-full blur-[140px] pointer-events-none"></div>

      <motion.div
        initial="hidden"
        animate="visible"
        variants={fadeUp}
        className="w-full max-w-4xl bg-white/50 backdrop-blur-md border border-white rounded-[2rem] shadow-xl shadow-stone-200/50 overflow-hidden relative z-10"
      >

        <div className="px-6 sm:px-12 pt-12 pb-8 border-b border-stone-200/50 text-center md:text-left">
          <h1 className="text-3xl sm:text-4xl font-serif text-stone-900 mb-2">
            Entry New Fragrance
          </h1>

          <p className="text-xs sm:text-sm text-stone-500 font-light tracking-wide">
            ADD A NEW MASTERPIECE PERFUME TO YOUR LUXURY PERFUME COLLECTION.
          </p>
        </div>

        <form
          onSubmit={onSubmit}
          className="px-6 sm:px-12 py-8 sm:py-10 space-y-8"
        >
          <div className="grid grid-cols-1 md:grid-cols-2 gap-x-8 gap-y-8">

            <div className="group md:col-span-2 w-full">
              <TextField
                name="perfumeTitle"
                isRequired
                className="flex flex-col w-full"
              >
                <Label className={labelClass}>
                  <FiBox className="text-sm transition-transform group-hover:scale-110" />
                  Perfume Title
                </Label>

                <Input
                  placeholder="e.g. Hawas Ice EDP"
                  className={inputClass}
                />

                <FieldError className="text-xs text-rose-500 mt-1.5" />
              </TextField>
            </div>

            <div className="group md:col-span-2 w-full">
              <TextField
                name="category"
                isRequired
                className="flex flex-col w-full"
              >
                <Label className={labelClass}>
                  <FiTag className="text-sm transition-transform group-hover:scale-110" />
                  Category / Family
                </Label>

                <Input
                  value={category}
                  onChange={(e) => setCategory(e.target.value)}
                  placeholder="Type a category or select from below..."
                  className={inputClass}
                />

                <div className="flex flex-wrap gap-2 mt-3">
                  {categorySuggestions.map((cat, idx) => (
                    <button
                      key={idx}
                      type="button"
                      onClick={() => setCategory(cat)}
                      className={`text-[10px] font-bold uppercase tracking-wider px-3 py-1.5 rounded-full border transition-all duration-300 ${
                        category === cat
                          ? "bg-amber-600 text-white border-amber-600 shadow-md"
                          : "bg-white/80 text-stone-500 border-stone-200 hover:border-amber-400 hover:text-amber-600 hover:bg-white"
                      }`}
                    >
                      {cat}
                    </button>
                  ))}
                </div>

                <FieldError className="text-xs text-rose-500 mt-1.5" />
              </TextField>
            </div>

            <div className="group md:col-span-2 w-full">
              <TextField
                name="price"
                type="number"
                isRequired
                className="flex flex-col w-full"
              >
                <Label className={labelClass}>
                  <FaBangladeshiTakaSign className="text-sm transition-transform group-hover:scale-110" />
                  Price (BDT)
                </Label>

                <Input
                  type="number"
                  placeholder="e.g. 1200"
                  className={inputClass}
                />

                <FieldError className="text-xs text-rose-500 mt-1.5" />
              </TextField>
            </div>

            <div className="group md:col-span-2 w-full flex flex-col">
              <TextField
                name="stock"
                isRequired
                className="flex flex-col w-full"
              >
                <Label className={labelClass}>
                  <FiPackage className="text-sm transition-transform group-hover:scale-110" />
                  Stock Status
                </Label>

                <Input
                  value={stock}
                  onChange={(e) => setStock(e.target.value)}
                  placeholder="Select status below..."
                  className={inputClass}
                />

                <div className="flex flex-wrap gap-2 mt-3">
                  {stockOptions.map((status, idx) => (
                    <button
                      key={idx}
                      type="button"
                      onClick={() => setStock(status)}
                      className={`text-[10px] font-bold uppercase tracking-wider px-3 py-1.5 rounded-full border transition-all duration-300 ${
                        stock === status
                          ? "bg-amber-600 text-white border-amber-600 shadow-md"
                          : "bg-white/80 text-stone-500 border-stone-200 hover:border-amber-400 hover:text-amber-600 hover:bg-white"
                      }`}
                    >
                      {status}
                    </button>
                  ))}
                </div>

                <FieldError className="text-xs text-rose-500 mt-1.5" />
              </TextField>
            </div>

            <div className="group md:col-span-2 w-full">
              <TextField
                name="imageUrl"
                type="url"
                className="flex flex-col w-full"
              >
                <Label className={labelClass}>
                  <FiImage className="text-sm transition-transform group-hover:scale-110" />
                  Product Image URL
                </Label>

                <Input
                  type="url"
                  placeholder="https://example.com/bottle.jpg"
                  className={inputClass}
                />

                <FieldError className="text-xs text-rose-500 mt-1.5" />
              </TextField>
            </div>

            <div className="md:col-span-2 bg-stone-50/60 border border-stone-200/60 p-6 sm:p-8 rounded-3xl space-y-6">
              <div className="flex items-center gap-3 border-b border-stone-200 pb-4 mb-2">
                <FiAlignLeft className="text-amber-600 text-xl" />
                <h3 className="text-lg font-serif text-stone-800">
                  Fragrance Pyramid
                </h3>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                <TextField
                  name="topNotes"
                  className="flex flex-col w-full group"
                >
                  <Label className="text-[10px] font-bold text-stone-500 uppercase tracking-widest mb-2 transition-colors group-focus-within:text-amber-600">
                    Top Notes
                  </Label>

                  <TextArea
                    placeholder="e.g. Bergamot: A zesty citrus..."
                    className="w-full bg-white/80 border border-stone-200 focus:bg-white focus:border-amber-500 rounded-xl shadow-sm transition-all min-h-[120px] p-4 text-sm text-stone-900 outline-none resize-none placeholder:text-stone-400"
                  />
                </TextField>

                <TextField
                  name="middleNotes"
                  className="flex flex-col w-full group"
                >
                  <Label className="text-[10px] font-bold text-stone-500 uppercase tracking-widest mb-2 transition-colors group-focus-within:text-amber-600">
                    Middle Notes
                  </Label>

                  <TextArea
                    placeholder="e.g. Jasmine: A delicate flower..."
                    className="w-full bg-white/80 border border-stone-200 focus:bg-white focus:border-amber-500 rounded-xl shadow-sm transition-all min-h-[120px] p-4 text-sm text-stone-900 outline-none resize-none placeholder:text-stone-400"
                  />
                </TextField>

                <TextField
                  name="baseNotes"
                  className="flex flex-col w-full group"
                >
                  <Label className="text-[10px] font-bold text-stone-500 uppercase tracking-widest mb-2 transition-colors group-focus-within:text-amber-600">
                    Base Notes
                  </Label>

                  <TextArea
                    placeholder="e.g. Musk: A sensual note..."
                    className="w-full bg-white/80 border border-stone-200 focus:bg-white focus:border-amber-500 rounded-xl shadow-sm transition-all min-h-[120px] p-4 text-sm text-stone-900 outline-none resize-none placeholder:text-stone-400"
                  />
                </TextField>
              </div>
            </div>

            <div className="md:col-span-2 bg-amber-50/40 border border-amber-100 p-6 sm:p-8 rounded-3xl space-y-6">
              <div className="flex flex-col sm:flex-row sm:items-center justify-between border-b border-amber-200/50 pb-4 gap-4">
                <div className="flex items-center gap-3">
                  <FiStar className="text-amber-600 text-xl" />
                  <h3 className="text-lg font-serif text-stone-800">
                    Features & Benefits
                  </h3>
                </div>

                <button
                  type="button"
                  onClick={handleAddFeature}
                  className="flex items-center justify-center gap-2 text-xs font-bold text-amber-700 hover:text-white uppercase tracking-wider bg-amber-100/60 hover:bg-amber-500 px-4 py-2 rounded-full transition-all"
                >
                  <FiPlus />
                  Add Feature
                </button>
              </div>

              <div className="space-y-4">
                {features.map((feature, index) => (
                  <div
                    key={index}
                    className="flex flex-col md:flex-row gap-0 md:gap-4 items-start md:items-center bg-white/80 p-2 rounded-2xl border border-stone-100 shadow-sm transition-all hover:border-amber-300"
                  >
                    <div className="w-full md:w-1/3">
                      <input
                        type="text"
                        placeholder="Feature Title"
                        value={feature.title}
                        onChange={(e) =>
                          handleFeatureChange(index, "title", e.target.value)
                        }
                        className="w-full bg-transparent border-none focus:ring-0 text-sm font-semibold text-stone-800 placeholder:text-stone-400 px-3 py-2 outline-none"
                        required
                      />
                    </div>

                    <div className="hidden md:block w-px h-8 bg-stone-200"></div>
                    <div className="block md:hidden w-full h-px bg-stone-100 my-1"></div>

                    <div className="w-full md:w-full flex items-center gap-2">
                      <input
                        type="text"
                        placeholder="Detail Description"
                        value={feature.description}
                        onChange={(e) =>
                          handleFeatureChange(
                            index,
                            "description",
                            e.target.value,
                          )
                        }
                        className="w-full bg-transparent border-none focus:ring-0 text-sm text-stone-600 placeholder:text-stone-400 px-3 py-2 outline-none"
                        required
                      />

                      <button
                        type="button"
                        onClick={() => handleRemoveFeature(index)}
                        className="p-2 text-rose-400 hover:text-rose-600 hover:bg-rose-50 rounded-xl transition-colors shrink-0"
                        title="Remove Feature"
                      >
                        <FiTrash2 className="text-lg" />
                      </button>
                    </div>
                  </div>
                ))}
              </div>
            </div>

            <div className="group md:col-span-2 w-full">
              <TextField
                name="description"
                isRequired
                className="flex flex-col w-full"
              >
                <Label className={labelClass}>
                  <FiFileText className="text-sm transition-transform group-hover:scale-110" />
                  General Scent Description
                </Label>

                <TextArea
                  placeholder="Describe the overall feeling, inspiration, and mood of the scent..."
                  className="w-full bg-white/70 border border-stone-200 focus:bg-white focus:border-amber-500 rounded-2xl shadow-sm transition-all min-h-[100px] p-4 text-sm text-stone-900 outline-none resize-none placeholder:text-stone-400"
                />

                <FieldError className="text-xs text-rose-500 mt-1.5" />
              </TextField>
            </div>
          </div>

          <div className="pt-8 border-t border-stone-200/50 flex justify-end">
            <motion.button
              whileHover={{ scale: 1.02 }}
              whileTap={{ scale: 0.98 }}
              type="submit"
              className="group w-full md:w-auto flex items-center justify-center gap-3 md:px-12 py-4 bg-amber-600 text-white rounded-xl font-bold tracking-widest uppercase text-xs hover:bg-amber-500 shadow-md hover:shadow-lg hover:shadow-amber-500/30 transition-all duration-300 hover:cursor-pointer"
            >
              Add Perfume
              <FiPlus className="text-lg transition-transform duration-300 group-hover:rotate-90" />
            </motion.button>
          </div>
        </form>
      </motion.div>
    </div>
  );
};

export default AddPerfumesClient;

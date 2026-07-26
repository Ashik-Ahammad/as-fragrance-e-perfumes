"use client";
import React, { useState } from "react";
import { uploadImageToImgBB } from "@/utils/imgbbUpload";
import {
  Modal,
  Button,
  Input,
  Label,
  TextField,
  TextArea,
} from "@heroui/react";
import {
  FiPlus,
  FiBox,
  FiTag,
  FiPackage,
  FiImage,
  FiFileText,
  FiSave,
} from "react-icons/fi";
import { FaBangladeshiTakaSign } from "react-icons/fa6";
import { toast } from "sonner";

export function AddPerfumeModal({ onSuccess }) {
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

  const [category, setCategory] = useState("Musk");
  const [stock, setStock] = useState("InStock");
  const [imageFile, setImageFile] = useState(null);
  const [imagePreview, setImagePreview] = useState(null);

  const onSubmit = async (e) => {
    e.preventDefault();
    const loadingToast = toast.loading("Adding new fragrance...");
    const formData = new FormData(e.currentTarget);
    
    // Remove the file object from formData if it exists to avoid polluting JSON
    formData.delete("imageFile");
    
    const newPerfume = Object.fromEntries(formData.entries());

    newPerfume.category = category;
    newPerfume.stock = stock;
    newPerfume.features = [];

    try {
      let uploadedImageUrl = "";
      if (imageFile) {
        toast.loading("Uploading image...", { id: loadingToast });
        uploadedImageUrl = await uploadImageToImgBB(imageFile);
      }
      
      newPerfume.imageUrl = uploadedImageUrl;

      toast.loading("Saving to database...", { id: loadingToast });
      const res = await fetch(`${process.env.NEXT_PUBLIC_SERVER_URL}/perfume`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(newPerfume),
      });

      if (res.ok) {
        toast.success("Fragrance added successfully! ✨", { id: loadingToast });
        // Reset state
        setImageFile(null);
        setImagePreview(null);
        if (onSuccess) onSuccess();
      } else throw new Error("Failed");
    } catch (error) {
      toast.error("Failed to add fragrance.", { id: loadingToast });
    }
  };

  const inputClass =
    "w-full bg-white border border-stone-200 focus:border-amber-500 rounded-xl px-4 h-[50px] text-sm outline-none";
  const labelClass =
    "flex items-center gap-2 text-xs font-bold text-stone-500 uppercase tracking-widest mb-2";

  return (
    <Modal>
      <Button className="bg-stone-900 text-white px-6 py-2.5 rounded-xl text-sm font-bold tracking-wide flex items-center gap-2 cursor-pointer hover:bg-amber-600 transition-colors hover:cursor-pointer">
        <FiPlus /> Add New Perfume
      </Button>
      <Modal.Backdrop>
        <Modal.Container placement="auto">
          <Modal.Dialog className="w-full max-w-2xl bg-white rounded-[2rem] border border-stone-100 overflow-hidden shadow-2xl">
            <Modal.CloseTrigger />
            <Modal.Header className="border-b border-stone-100 bg-stone-50/50 p-6">
              <Modal.Heading className="text-2xl font-serif text-stone-900">
                Add New Fragrance
              </Modal.Heading>
            </Modal.Header>
            <Modal.Body className="p-6 max-h-[70vh] overflow-y-auto">
              <form onSubmit={onSubmit} className="space-y-6">
                <TextField
                  name="perfumeTitle"
                  isRequired
                  className="flex flex-col w-full"
                >
                  <Label className={labelClass}>
                    <FiBox /> Title
                  </Label>
                  <Input
                    className={inputClass}
                    placeholder="e.g. Royal Amber"
                  />
                </TextField>

                <div className="grid grid-cols-2 gap-4">
                  <TextField
                    name="price"
                    type="number"
                    isRequired
                    className="flex flex-col w-full"
                  >
                    <Label className={labelClass}>
                      <FaBangladeshiTakaSign /> Price
                    </Label>
                    <Input className={inputClass} placeholder="e.g. 1500" />
                  </TextField>
                  <div className="flex flex-col w-full">
                    <Label className={labelClass}>
                      <FiImage /> Image File
                    </Label>
                    <div className="flex items-center gap-3">
                      {imagePreview && (
                        <div className="w-[50px] h-[50px] rounded-xl overflow-hidden border border-stone-200 shrink-0 shadow-sm">
                          <img src={imagePreview} alt="Preview" className="w-full h-full object-cover" />
                        </div>
                      )}
                      <input
                        type="file"
                        accept="image/*"
                        name="imageFile"
                        onChange={(e) => {
                          const file = e.target.files[0];
                          if (file) {
                            setImageFile(file);
                            setImagePreview(URL.createObjectURL(file));
                          } else {
                            setImageFile(null);
                            setImagePreview(null);
                          }
                        }}
                        className="block w-full text-sm text-stone-500 file:mr-3 file:py-3 file:px-4 file:rounded-xl file:border-0 file:text-xs file:font-semibold file:bg-stone-50 file:border file:border-stone-200 file:text-stone-700 hover:file:bg-amber-50 hover:file:text-amber-700 hover:file:border-amber-200 cursor-pointer transition-all"
                      />
                    </div>
                  </div>
                </div>

                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <Label className={labelClass}>
                      <FiTag /> Category
                    </Label>
                    <select
                      value={category}
                      onChange={(e) => setCategory(e.target.value)}
                      className={inputClass}
                    >
                      {categorySuggestions.map((c) => (
                        <option key={c} value={c}>
                          {c}
                        </option>
                      ))}
                    </select>
                  </div>
                  <div>
                    <Label className={labelClass}>
                      <FiPackage /> Stock
                    </Label>
                    <select
                      value={stock}
                      onChange={(e) => setStock(e.target.value)}
                      className={inputClass}
                    >
                      {stockOptions.map((s) => (
                        <option key={s} value={s}>
                          {s}
                        </option>
                      ))}
                    </select>
                  </div>
                </div>

                <TextField
                  name="description"
                  isRequired
                  className="flex flex-col w-full"
                >
                  <Label className={labelClass}>
                    <FiFileText /> Description
                  </Label>
                  <TextArea
                    className="w-full border border-stone-200 focus:border-amber-500 rounded-xl p-3 text-sm outline-none resize-none min-h-20"
                    placeholder="Scent details..."
                  />
                </TextField>

                <div className="border-t border-stone-100 mt-6 pt-5 flex justify-end gap-3 bg-stone-50/40 p-4 -mx-6 -mb-6">
                  <Button
                    slot="close"
                    variant="secondary"
                    className="px-5 py-2.5 text-xs font-bold uppercase rounded-xl border bg-white cursor-pointer hover:cursor-pointer"
                  >
                    Cancel
                  </Button>
                  <Button
                    slot="close"
                    type="submit"
                    className="flex items-center gap-2 px-6 py-2.5 bg-amber-600 text-white text-xs font-bold uppercase rounded-xl hover:bg-amber-500 cursor-pointer hover:cursor-pointer"
                  >
                    <FiSave /> Add Perfume
                  </Button>
                </div>
              </form>
            </Modal.Body>
          </Modal.Dialog>
        </Modal.Container>
      </Modal.Backdrop>
    </Modal>
  );
}

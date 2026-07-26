"use client";
import React, { useState, useEffect } from "react";
import { FiTag, FiPlus, FiTrash2 } from "react-icons/fi";
import { toast } from "sonner";
import { getCoupons, addCoupon, deleteCoupon } from "@/services/couponService";

export default function CouponManagement() {
  const [coupons, setCoupons] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [couponCode, setCouponCode] = useState("");
  const [discountPercent, setDiscountPercent] = useState("");
  const [isAddingCoupon, setIsAddingCoupon] = useState(false);

  const fetchCoupons = async () => {
    try {
      const data = await getCoupons();
      setCoupons(data);
    } catch (error) {
      toast.error("Failed to fetch coupons");
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    fetchCoupons();
  }, []);

  const handleAddCoupon = async (e) => {
    e.preventDefault();
    if (!couponCode || !discountPercent) return toast.error("Fill all fields");
    const percent = Number(discountPercent);
    if (isNaN(percent) || percent <= 0 || percent > 100) return toast.error("Discount: 1-100");
    
    setIsAddingCoupon(true);
    try {
      await addCoupon({ code: couponCode, discountPercent: percent });
      toast.success(`Coupon "${couponCode.toUpperCase()}" added!`);
      setCouponCode("");
      setDiscountPercent("");
      fetchCoupons();
    } catch {
      toast.error("Failed to add coupon");
    } finally {
      setIsAddingCoupon(false);
    }
  };

  const handleDeleteCoupon = async (id, code) => {
    if (!confirm(`Delete "${code}"?`)) return;
    try {
      await deleteCoupon(id);
      toast.success(`Coupon "${code}" deleted`);
      fetchCoupons();
    } catch {
      toast.error("Failed");
    }
  };

  const inp = "w-full bg-stone-50 border border-stone-200 rounded-xl px-4 py-3 text-sm outline-none focus:border-amber-400";
  const lbl = "text-[10px] font-bold text-stone-500 uppercase tracking-widest block mb-1.5";

  if (isLoading) return <div className="p-10 text-center">Loading Coupons...</div>;

  return (
    <div className="flex flex-col h-full">
      <div className="mb-6 shrink-0">
        <h1 className="text-2xl sm:text-3xl font-serif text-stone-900">
          Coupon Manager
        </h1>
      </div>
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 flex-1 overflow-hidden">
        <div className="lg:col-span-1">
          <div className="bg-white border border-stone-200 rounded-2xl shadow-sm p-6">
            <h2 className="text-base font-bold text-stone-900 mb-5 flex items-center gap-2">
              <FiPlus className="text-amber-600" /> Add New Coupon
            </h2>
            <form onSubmit={handleAddCoupon} className="space-y-4">
              <div>
                <label className={lbl}>Coupon Code</label>
                <input
                  type="text"
                  value={couponCode}
                  onChange={(e) => setCouponCode(e.target.value.toUpperCase())}
                  placeholder="e.g. SUMMER10"
                  className={inp + " font-mono font-bold tracking-widest uppercase"}
                  required
                />
              </div>
              <div>
                <label className={lbl}>Discount %</label>
                <input
                  type="number"
                  value={discountPercent}
                  onChange={(e) => setDiscountPercent(e.target.value)}
                  placeholder="10"
                  min="1"
                  max="100"
                  className={inp}
                  required
                />
              </div>
              <button
                type="submit"
                disabled={isAddingCoupon}
                className="w-full py-3 bg-stone-900 text-white rounded-xl font-bold uppercase tracking-widest text-xs hover:bg-amber-600 transition-colors disabled:opacity-50"
              >
                {isAddingCoupon ? "Adding..." : "Add Coupon"}
              </button>
            </form>
          </div>
        </div>
        <div className="lg:col-span-2 bg-white border border-stone-200 rounded-2xl shadow-sm overflow-hidden flex flex-col">
          <div className="p-5 border-b border-stone-100 flex items-center">
            <h2 className="text-base font-bold text-stone-900 flex items-center gap-2">
              <FiTag className="text-amber-600" /> Active Coupons
            </h2>
            <span className="ml-auto bg-amber-100 text-amber-700 text-xs font-bold px-2.5 py-1 rounded-full">
              {coupons.length} total
            </span>
          </div>
          <div className="overflow-y-auto flex-1">
            {coupons.length === 0 ? (
              <div className="p-12 text-center text-stone-400">
                <p>No coupons yet.</p>
              </div>
            ) : (
              <table className="w-full text-left">
                <thead className="bg-stone-50 sticky top-0">
                  <tr className="text-stone-500 text-[10px] uppercase tracking-widest">
                    <th className="px-6 py-4 font-bold">Code</th>
                    <th className="px-6 py-4 font-bold">Discount</th>
                    <th className="px-6 py-4 font-bold text-right">Delete</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-stone-100">
                  {coupons.map((c) => (
                    <tr key={c._id} className="hover:bg-stone-50">
                      <td className="px-6 py-4">
                        <span className="font-mono font-bold text-stone-900 bg-stone-100 px-3 py-1.5 rounded-lg tracking-widest text-sm">
                          {c.code}
                        </span>
                      </td>
                      <td className="px-6 py-4">
                        <span className="font-bold text-emerald-600 text-lg">
                          {c.discountPercent}%
                        </span>
                      </td>
                      <td className="px-6 py-4 text-right">
                        <button
                          onClick={() => handleDeleteCoupon(c._id, c.code)}
                          className="p-2.5 text-rose-400 hover:text-rose-600 hover:bg-rose-50 rounded-xl transition-colors"
                        >
                          <FiTrash2 />
                        </button>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}

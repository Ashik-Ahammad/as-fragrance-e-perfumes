"use client";
import React, { useEffect, useState } from "react";
import { authClient } from "@/lib/auth-client";
import {
  FiPackage,
  FiBox,
  FiTrash2,
  FiPlus,
  FiMapPin,
  FiPhone,
  FiCopy,
  FiTag,
  FiImage,
  FiEdit2,
  FiLink,
  FiGrid,
  FiCheckCircle,
  FiX,
  FiUsers,
  FiShield,
  FiUser,
  FiMail,
} from "react-icons/fi";
import { MdAdminPanelSettings } from "react-icons/md";
import { FaBangladeshiTakaSign } from "react-icons/fa6";
import { toast } from "sonner";
import Image from "next/image";
import Link from "next/link";
import { EditModal } from "@/components/EditModal";
import { DeleteModal } from "@/components/DeleteModal";

// ============================================================
// BANNER FORM MODAL
// ============================================================
function BannerFormModal({ onSuccess, getAuthHeaders, existingBanner = null }) {
  const isEdit = !!existingBanner;
  const [open, setOpen] = useState(false);
  const [saving, setSaving] = useState(false);
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
    setOpen(true);
  };

  const handleSave = async () => {
    if (!form.title || !form.imageUrl)
      return toast.error("Title and Image URL required");
    setSaving(true);
    try {
      const headers = await getAuthHeaders();
      const url = isEdit
        ? `${process.env.NEXT_PUBLIC_SERVER_URL}/banners/${existingBanner._id}`
        : `${process.env.NEXT_PUBLIC_SERVER_URL}/banners`;
      const method = isEdit ? "PATCH" : "POST";
      const res = await fetch(url, {
        method,
        headers,
        body: JSON.stringify(form),
      });
      if (res.ok) {
        toast.success(isEdit ? "Banner updated!" : "Banner added!");
        setOpen(false);
        onSuccess();
      } else throw new Error();
    } catch {
      toast.error("Failed to save banner");
    } finally {
      setSaving(false);
    }
  };

  const inp =
    "w-full bg-stone-50 border border-stone-200 rounded-xl px-4 py-2.5 text-sm outline-none focus:border-amber-400 transition-colors";
  const lbl =
    "text-[10px] font-bold text-stone-500 uppercase tracking-widest block mb-1.5";

  return (
    <>
      <button
        onClick={handleOpen}
        className={`flex items-center gap-2 ${isEdit ? "p-2 text-stone-400 hover:text-amber-600 hover:bg-amber-50 rounded-xl border border-transparent hover:border-amber-100 transition-colors" : "bg-stone-900 text-white px-5 py-2.5 rounded-xl text-sm font-bold hover:bg-amber-600 transition-colors shadow-md"}`}
      >
        {isEdit ? (
          <FiEdit2 />
        ) : (
          <>
            <FiPlus className="text-lg" /> Add Banner
          </>
        )}
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
              <button
                onClick={() => setOpen(false)}
                className="p-2 hover:bg-stone-100 rounded-xl"
              >
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
                <label className={lbl}>Image URL</label>
                <input
                  className={inp}
                  placeholder="https://..."
                  value={form.imageUrl}
                  onChange={(e) =>
                    setForm({ ...form, imageUrl: e.target.value })
                  }
                />
              </div>
              <div className="col-span-2">
                <label className={lbl}>Title</label>
                <input
                  className={inp}
                  placeholder="Vampire Blood"
                  value={form.title}
                  onChange={(e) => setForm({ ...form, title: e.target.value })}
                />
              </div>
              <div className="col-span-2">
                <label className={lbl}>Subtitle</label>
                <input
                  className={inp}
                  placeholder="OUR #1 BEST SELLER"
                  value={form.subtitle}
                  onChange={(e) =>
                    setForm({ ...form, subtitle: e.target.value })
                  }
                />
              </div>
              <div className="col-span-2">
                <label className={lbl}>Description</label>
                <textarea
                  className={inp}
                  rows={2}
                  value={form.description}
                  onChange={(e) =>
                    setForm({ ...form, description: e.target.value })
                  }
                />
              </div>
              <div>
                <label className={lbl}>Button Text</label>
                <input
                  className={inp}
                  placeholder="Buy Now"
                  value={form.buttonText}
                  onChange={(e) =>
                    setForm({ ...form, buttonText: e.target.value })
                  }
                />
              </div>
              <div>
                <label className={lbl}>Button Link</label>
                <input
                  className={inp}
                  placeholder="/shop"
                  value={form.buttonLink}
                  onChange={(e) =>
                    setForm({ ...form, buttonLink: e.target.value })
                  }
                />
              </div>
              <div>
                <label className={lbl}>Text Align</label>
                <select
                  className={inp}
                  value={form.align}
                  onChange={(e) => setForm({ ...form, align: e.target.value })}
                >
                  <option value="left">Left</option>
                  <option value="center">Center</option>
                </select>
              </div>
              <div>
                <label className={lbl}>Order</label>
                <input
                  type="number"
                  className={inp}
                  value={form.order}
                  onChange={(e) =>
                    setForm({ ...form, order: Number(e.target.value) })
                  }
                />
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

// ============================================================
// COMBO FORM MODAL
// ============================================================
function ComboFormModal({
  onSuccess,
  getAuthHeaders,
  perfumes = [],
  existingCombo = null,
}) {
  const isEdit = !!existingCombo;
  const [open, setOpen] = useState(false);
  const [saving, setSaving] = useState(false);
  const [selectedPerfumeIds, setSelectedPerfumeIds] = useState([]);
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
    setOpen(true);
  };

  const togglePerfume = (perfume) => {
    setSelectedPerfumeIds((prev) =>
      prev.includes(perfume._id)
        ? prev.filter((id) => id !== perfume._id)
        : [...prev, perfume._id],
    );
  };

  const handleSave = async () => {
    if (!form.title || !form.price)
      return toast.error("Title and Price required");
    setSaving(true);
    const items = selectedPerfumeIds.map((id) => {
      const p = perfumes.find((p) => p._id === id);
      return {
        productId: p._id,
        name: p.perfumeTitle,
        imageUrl: p.imageUrl || "",
      };
    });
    try {
      const headers = await getAuthHeaders();
      const url = isEdit
        ? `${process.env.NEXT_PUBLIC_SERVER_URL}/combos/${existingCombo._id}`
        : `${process.env.NEXT_PUBLIC_SERVER_URL}/combos`;
      const method = isEdit ? "PATCH" : "POST";
      const res = await fetch(url, {
        method,
        headers,
        body: JSON.stringify({ ...form, items }),
      });
      if (res.ok) {
        toast.success(isEdit ? "Combo updated!" : "Combo created!");
        setOpen(false);
        onSuccess();
      } else throw new Error();
    } catch {
      toast.error("Failed to save combo");
    } finally {
      setSaving(false);
    }
  };

  const inp =
    "w-full bg-stone-50 border border-stone-200 rounded-xl px-4 py-2.5 text-sm outline-none focus:border-amber-400 transition-colors";
  const lbl =
    "text-[10px] font-bold text-stone-500 uppercase tracking-widest block mb-1.5";

  return (
    <>
      <button
        onClick={handleOpen}
        className={`flex items-center gap-2 ${isEdit ? "p-2 text-stone-400 hover:text-amber-600 hover:bg-amber-50 rounded-xl border border-transparent hover:border-amber-100 transition-colors" : "bg-stone-900 text-white px-5 py-2.5 rounded-xl text-sm font-bold hover:bg-amber-600 transition-colors shadow-md"}`}
      >
        {isEdit ? (
          <FiEdit2 />
        ) : (
          <>
            <FiPlus className="text-lg" /> Create Combo
          </>
        )}
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
              <button
                onClick={() => setOpen(false)}
                className="p-2 hover:bg-stone-100 rounded-xl"
              >
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
                <label className={lbl}>Combo Image URL</label>
                <input
                  className={inp}
                  placeholder="https://..."
                  value={form.imageUrl}
                  onChange={(e) =>
                    setForm({ ...form, imageUrl: e.target.value })
                  }
                />
              </div>
              <div className="col-span-2">
                <label className={lbl}>Combo Title</label>
                <input
                  className={inp}
                  placeholder="The Royal Combo"
                  value={form.title}
                  onChange={(e) => setForm({ ...form, title: e.target.value })}
                />
              </div>
              <div className="col-span-2">
                <label className={lbl}>Description</label>
                <textarea
                  className={inp}
                  rows={2}
                  value={form.description}
                  onChange={(e) =>
                    setForm({ ...form, description: e.target.value })
                  }
                />
              </div>
              <div>
                <label className={lbl}>Combo Price (BDT)</label>
                <input
                  type="number"
                  className={inp}
                  value={form.price}
                  onChange={(e) => setForm({ ...form, price: e.target.value })}
                />
              </div>
              <div>
                <label className={lbl}>Original Price (optional)</label>
                <input
                  type="number"
                  className={inp}
                  value={form.originalPrice}
                  onChange={(e) =>
                    setForm({ ...form, originalPrice: e.target.value })
                  }
                />
              </div>
              <div className="col-span-2">
                <label className={lbl}>Badge</label>
                <input
                  className={inp}
                  value={form.badge}
                  onChange={(e) => setForm({ ...form, badge: e.target.value })}
                />
              </div>
            </div>
            <div>
              <label className={lbl}>
                Select Perfumes ({selectedPerfumeIds.length} selected)
              </label>
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
                        <Image
                          src={p.imageUrl || "/assets/defaultPerfumeImage.png"}
                          alt={p.perfumeTitle}
                          fill
                          className="object-cover"
                        />
                      </div>
                      <p className="text-xs font-medium text-stone-800 line-clamp-2 flex-1">
                        {p.perfumeTitle}
                      </p>
                      {selected && (
                        <FiCheckCircle className="text-amber-500 shrink-0" />
                      )}
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

// ============================================================
// MAIN ADMIN DASHBOARD
// ============================================================
export default function AdminDashboardClient({
  initialOrders,
  initialPerfumes,
}) {
  const { data: session } = authClient.useSession();
  const admin = session?.user;

  const [orders, setOrders] = useState(initialOrders || []);
  const [perfumes, setPerfumes] = useState(initialPerfumes || []);
  const [coupons, setCoupons] = useState([]);
  const [banners, setBanners] = useState([]);
  const [combos, setCombos] = useState([]);
  const [users, setUsers] = useState([]);
  const [activeTab, setActiveTab] = useState("orders");
  const [isMounted, setIsMounted] = useState(false);

  // Coupon form
  const [couponCode, setCouponCode] = useState("");
  const [discountPercent, setDiscountPercent] = useState("");
  const [isAddingCoupon, setIsAddingCoupon] = useState(false);

  // User role form
  const [roleEmail, setRoleEmail] = useState("");
  const [selectedRole, setSelectedRole] = useState("admin");
  const [isUpdatingRole, setIsUpdatingRole] = useState(false);

  // Using setTimeout prevents the cascading render issue in React Strict Mode
  useEffect(() => {
    setIsMounted(true);
    const timer = setTimeout(() => {
      refreshData();
    }, 0);
    return () => clearTimeout(timer);
  }, []);

  const getAuthHeaders = async () => {
    const { data: tokenData } = await authClient.token();
    return {
      Authorization: `Bearer ${tokenData?.token}`,
      "Content-Type": "application/json",
    };
  };

  const refreshData = async () => {
    try {
      const headers = await getAuthHeaders();
      const [orderRes, perfumeRes, couponRes, bannerRes, comboRes, userRes] =
        await Promise.all([
          fetch(`${process.env.NEXT_PUBLIC_SERVER_URL}/orders`, { headers }),
          fetch(`${process.env.NEXT_PUBLIC_SERVER_URL}/perfume`, {
            headers,
            cache: "force-cache",
          }),
          fetch(`${process.env.NEXT_PUBLIC_SERVER_URL}/coupons`, { headers }),
          fetch(`${process.env.NEXT_PUBLIC_SERVER_URL}/banners`),
          fetch(`${process.env.NEXT_PUBLIC_SERVER_URL}/combos`),
          fetch(`${process.env.NEXT_PUBLIC_SERVER_URL}/users`, { headers }),
        ]);
      if (orderRes.ok) setOrders(await orderRes.json());
      if (perfumeRes.ok) setPerfumes(await perfumeRes.json());
      if (couponRes.ok) setCoupons(await couponRes.json());
      if (bannerRes.ok) setBanners(await bannerRes.json());
      if (comboRes.ok) setCombos(await comboRes.json());
      if (userRes.ok) setUsers(await userRes.json());
    } catch {
      toast.error("Failed to refresh data.");
    }
  };

  const handleCopyPhone = (phone) => {
    if (!phone) return;
    navigator.clipboard.writeText(phone);
    toast.success(`${phone} copied!`);
  };

  const handleCopyComboId = (id, title) => {
    const link = `/combos/${id}`;
    navigator.clipboard.writeText(link);
    toast.success(`Link copied! → ${link}`);
  };

  const handleUpdateDeliveryStatus = async (orderId, newStatus) => {
    try {
      const headers = await getAuthHeaders();
      const res = await fetch(
        `${process.env.NEXT_PUBLIC_SERVER_URL}/orders/${orderId}/status`,
        {
          method: "PATCH",
          headers,
          body: JSON.stringify({ status: newStatus }),
        },
      );
      if (res.ok) {
        toast.success(`Delivery → ${newStatus}`);
        refreshData();
      } else throw new Error();
    } catch {
      toast.error("Failed to update delivery status");
    }
  };

  const handleUpdatePaymentState = async (orderId, newPaymentState) => {
    try {
      const headers = await getAuthHeaders();
      const res = await fetch(
        `${process.env.NEXT_PUBLIC_SERVER_URL}/orders/${orderId}/payment`,
        {
          method: "PATCH",
          headers,
          body: JSON.stringify({ paymentState: newPaymentState }),
        },
      );
      if (res.ok) {
        toast.success(`Payment → ${newPaymentState}`);
        refreshData();
      } else throw new Error();
    } catch {
      toast.error("Failed to update payment status");
    }
  };

  const handleDeleteOrder = async (orderId) => {
    if (!confirm("Delete this order?")) return;
    try {
      const headers = await getAuthHeaders();
      const res = await fetch(
        `${process.env.NEXT_PUBLIC_SERVER_URL}/orders/${orderId}`,
        { method: "DELETE", headers },
      );
      if (res.ok) {
        toast.success("Order deleted");
        refreshData();
      } else throw new Error();
    } catch {
      toast.error("Deletion failed");
    }
  };

  const handleAddCoupon = async (e) => {
    e.preventDefault();
    if (!couponCode || !discountPercent) return toast.error("Fill all fields");
    const percent = Number(discountPercent);
    if (isNaN(percent) || percent <= 0 || percent > 100)
      return toast.error("Discount: 1-100");
    setIsAddingCoupon(true);
    try {
      const headers = await getAuthHeaders();
      const res = await fetch(`${process.env.NEXT_PUBLIC_SERVER_URL}/coupons`, {
        method: "POST",
        headers,
        body: JSON.stringify({ code: couponCode, discountPercent: percent }),
      });
      if (res.ok) {
        toast.success(`Coupon "${couponCode.toUpperCase()}" added!`);
        setCouponCode("");
        setDiscountPercent("");
        refreshData();
      } else throw new Error();
    } catch {
      toast.error("Failed to add coupon");
    } finally {
      setIsAddingCoupon(false);
    }
  };

  const handleDeleteCoupon = async (id, code) => {
    if (!confirm(`Delete "${code}"?`)) return;
    try {
      const headers = await getAuthHeaders();
      await fetch(`${process.env.NEXT_PUBLIC_SERVER_URL}/coupons/${id}`, {
        method: "DELETE",
        headers,
      });
      toast.success(`Coupon "${code}" deleted`);
      refreshData();
    } catch {
      toast.error("Failed");
    }
  };

  const handleDeleteBanner = async (id) => {
    if (!confirm("Delete this banner?")) return;
    try {
      const headers = await getAuthHeaders();
      await fetch(`${process.env.NEXT_PUBLIC_SERVER_URL}/banners/${id}`, {
        method: "DELETE",
        headers,
      });
      toast.success("Banner deleted");
      refreshData();
    } catch {
      toast.error("Failed");
    }
  };

  const handleDeleteCombo = async (id) => {
    if (!confirm("Delete this combo?")) return;
    try {
      const headers = await getAuthHeaders();
      await fetch(`${process.env.NEXT_PUBLIC_SERVER_URL}/combos/${id}`, {
        method: "DELETE",
        headers,
      });
      toast.success("Combo deleted");
      refreshData();
    } catch {
      toast.error("Failed");
    }
  };

  const handleUpdateRole = async (e) => {
    e.preventDefault();
    if (!roleEmail) return toast.error("Enter an email");
    setIsUpdatingRole(true);
    try {
      const headers = await getAuthHeaders();
      const res = await fetch(
        `${process.env.NEXT_PUBLIC_SERVER_URL}/users/role`,
        {
          method: "PATCH",
          headers,
          body: JSON.stringify({ email: roleEmail, role: selectedRole }),
        },
      );
      const data = await res.json();
      if (res.ok) {
        toast.success(data.message || "Role updated!");
        setRoleEmail("");
        refreshData();
      } else {
        toast.error(data.message || "Failed to update role");
      }
    } catch {
      toast.error("Failed to update role");
    } finally {
      setIsUpdatingRole(false);
    }
  };

  if (!isMounted) return null;

  const navItems = [
    { key: "orders", icon: <FiPackage />, label: "Order Management" },
    { key: "perfumes", icon: <FiBox />, label: "Perfume Catalog" },
    { key: "coupons", icon: <FiTag />, label: "Coupon Manager" },
    { key: "banners", icon: <FiImage />, label: "Banner Control" },
    { key: "combos", icon: <FiGrid />, label: "Combo Deals" },
    { key: "users", icon: <FiUsers />, label: "User Management" },
  ];

  const inp =
    "w-full bg-stone-50 border border-stone-200 rounded-xl px-4 py-3 text-sm outline-none focus:border-amber-400";
  const lbl =
    "text-[10px] font-bold text-stone-500 uppercase tracking-widest block mb-1.5";

  return (
    <div className="min-h-screen bg-stone-50 flex flex-col md:flex-row font-sans">
      {/* Sidebar */}
      <aside className="w-full md:w-64 bg-white border-r border-stone-200 flex flex-col pt-24 md:pt-8 shadow-sm z-10 shrink-0">
        <div className="p-6 border-b border-stone-100 flex items-center gap-4">
          <div className="w-12 h-12 bg-amber-100 text-amber-700 rounded-full flex items-center justify-center text-xl font-bold">
            {admin?.name ? admin.name.substring(0, 2).toUpperCase() : "AD"}
          </div>
          <div>
            <h2 className="font-bold text-stone-800 text-sm">
              {admin?.name || "Admin Manager"}
            </h2>
            <p className="text-[10px] text-stone-500">
              {admin?.email || "admin@asfragrance.com"}
            </p>
            <span className="inline-flex items-center gap-1 text-[9px] font-bold uppercase text-amber-700 bg-amber-100 px-2 py-0.5 rounded-full mt-1">
              <MdAdminPanelSettings /> Admin
            </span>
          </div>
        </div>
        <nav className="flex-1 p-4 space-y-2">
          {navItems.map((item) => (
            <button
              key={item.key}
              onClick={() => setActiveTab(item.key)}
              className={`w-full flex items-center gap-3 px-4 py-3 rounded-xl text-sm font-medium transition-all cursor-pointer ${activeTab === item.key ? "bg-stone-900 text-white shadow-md" : "text-stone-600 hover:bg-stone-100"}`}
            >
              <span className="text-lg">{item.icon}</span> {item.label}
            </button>
          ))}
        </nav>
      </aside>

      {/* Main Content */}
      <main className="flex-1 p-4 sm:p-6 md:p-10 pt-8 md:pt-10 overflow-hidden flex flex-col h-screen">
        {/* ======= ORDERS ======= */}
        {activeTab === "orders" && (
          <div className="flex flex-col h-full">
            <div className="mb-6 shrink-0">
              <h1 className="text-2xl sm:text-3xl font-serif text-stone-900">
                Orders Terminal
              </h1>
            </div>
            <div className="bg-white border border-stone-200 rounded-2xl shadow-sm flex-1 overflow-hidden flex flex-col">
              <div className="overflow-x-auto flex-1">
                <table className="w-full text-left border-collapse min-w-[1000px]">
                  <thead className="bg-stone-100 sticky top-0 z-10">
                    <tr className="text-stone-600 text-xs uppercase tracking-widest">
                      <th className="p-5 font-bold whitespace-nowrap">
                        Order Details
                      </th>
                      <th className="p-5 font-bold whitespace-nowrap">
                        Customer Info
                      </th>
                      <th className="p-5 font-bold whitespace-nowrap">
                        Total Bill
                      </th>
                      <th className="p-5 font-bold whitespace-nowrap">
                        Payment Status
                      </th>
                      <th className="p-5 font-bold whitespace-nowrap">
                        Delivery Status
                      </th>
                      <th className="p-5 font-bold text-right whitespace-nowrap">
                        Delete
                      </th>
                    </tr>
                  </thead>
                  <tbody className="text-sm divide-y divide-stone-100">
                    {orders.map((order) => {
                      const currentPaymentState =
                        order.payment?.status || "Unpaid";
                      const currentDeliveryState =
                        order.paymentStatus || "Pending";
                      return (
                        <tr
                          key={order._id}
                          className="hover:bg-stone-50 transition-colors"
                        >
                          <td className="p-5 align-top">
                            <span className="font-mono font-bold text-stone-900 text-sm block mb-1">
                              {order.customOrderId}
                            </span>
                            <span className="text-xs text-stone-500">
                              {new Date(order.createdAt).toLocaleDateString(
                                "en-GB",
                                {
                                  day: "2-digit",
                                  month: "short",
                                  year: "numeric",
                                },
                              )}
                            </span>
                          </td>
                          <td className="p-5 align-top max-w-[250px]">
                            <p className="font-bold text-stone-900 text-sm">
                              {order.customer?.name}
                            </p>

                            <div className="flex flex-wrap gap-2 mt-1.5">
                              <div
                                onClick={() =>
                                  handleCopyPhone(order.customer?.phone)
                                }
                                className="inline-flex items-center gap-1.5 px-2.5 py-1 bg-amber-50 text-amber-700 text-xs font-semibold rounded-lg cursor-pointer hover:bg-amber-100 transition-colors border border-amber-200/50"
                              >
                                <FiPhone className="text-[10px]" />
                                {order.customer?.phone}
                                <FiCopy className="text-[10px] ml-1 opacity-70" />
                              </div>
                              {/* ✅ Added Email Display */}
                              {order.customer?.email && (
                                <div className="inline-flex items-center gap-1.5 px-2.5 py-1 bg-stone-100 text-stone-600 text-xs font-semibold rounded-lg border border-stone-200/60">
                                  <FiMail className="text-[10px]" />
                                  {order.customer.email}
                                </div>
                              )}
                            </div>

                            <p className="text-xs text-stone-500 mt-2 flex items-start gap-1.5 leading-relaxed pr-4">
                              <FiMapPin className="mt-0.5 text-stone-400 shrink-0" />
                              <span className="whitespace-normal line-clamp-2">
                                {order.customer?.address},{" "}
                                {order.customer?.thana},{" "}
                                {order.customer?.district}
                              </span>
                            </p>
                          </td>
                          <td className="p-5 align-top">
                            <p className="font-bold flex items-center text-stone-900 text-sm">
                              <FaBangladeshiTakaSign className="text-xs mr-0.5" />
                              {order.financials?.grandTotal}
                            </p>
                            <p className="text-[10px] font-bold text-stone-500 uppercase mt-1.5 tracking-widest border border-stone-200 w-max px-2.5 py-0.5 rounded-md bg-stone-50">
                              {order.payment?.method}
                            </p>

                            {/* TrxID Display Block */}
                            {order.payment?.transactionId && (
                              <div className="mt-2.5 bg-pink-50 border border-pink-100 rounded-lg p-2 w-max max-w-[150px]">
                                <span className="text-[8px] font-bold uppercase tracking-widest text-pink-500 block mb-0.5">
                                  TrxID
                                </span>
                                <span className="font-mono text-[11px] font-semibold text-pink-700 break-all leading-tight block">
                                  {order.payment.transactionId}
                                </span>
                              </div>
                            )}
                          </td>
                          <td className="p-5 align-top">
                            <select
                              value={currentPaymentState}
                              onChange={(e) =>
                                handleUpdatePaymentState(
                                  order._id,
                                  e.target.value,
                                )
                              }
                              className={`text-sm font-bold px-3 py-2 rounded-xl border outline-none cursor-pointer ${currentPaymentState === "Paid" ? "bg-emerald-50 text-emerald-700 border-emerald-200" : currentPaymentState === "Refunded" ? "bg-stone-100 text-stone-600 border-stone-300" : "bg-rose-50 text-rose-600 border-rose-200"}`}
                            >
                              <option value="Unpaid">Unpaid</option>
                              <option value="Paid">Paid</option>
                              <option value="Refunded">Refunded</option>
                            </select>
                          </td>
                          <td className="p-5 align-top">
                            <select
                              value={currentDeliveryState}
                              onChange={(e) =>
                                handleUpdateDeliveryStatus(
                                  order._id,
                                  e.target.value,
                                )
                              }
                              className={`text-sm font-bold px-3 py-2 rounded-xl border outline-none cursor-pointer ${currentDeliveryState === "Delivered" ? "bg-emerald-50 text-emerald-700 border-emerald-200" : currentDeliveryState === "Shipped" ? "bg-blue-50 text-blue-700 border-blue-200" : currentDeliveryState === "Processing" ? "bg-amber-50 text-amber-700 border-amber-200" : "bg-stone-100 text-stone-600 border-stone-200"}`}
                            >
                              <option value="Pending">Pending</option>
                              <option value="Processing">Processing</option>
                              <option value="Shipped">Shipped</option>
                              <option value="Delivered">Delivered</option>
                              <option value="Cancelled">Cancelled</option>
                            </select>
                          </td>
                          <td className="p-5 text-right align-top">
                            <button
                              onClick={() => handleDeleteOrder(order._id)}
                              className="p-2.5 text-rose-400 hover:text-rose-600 hover:bg-rose-50 rounded-xl cursor-pointer transition-colors"
                            >
                              <FiTrash2 className="text-lg" />
                            </button>
                          </td>
                        </tr>
                      );
                    })}
                    {orders.length === 0 && (
                      <tr>
                        <td
                          colSpan="6"
                          className="p-12 text-center text-stone-500"
                        >
                          No orders found.
                        </td>
                      </tr>
                    )}
                  </tbody>
                </table>
              </div>
            </div>
          </div>
        )}

        {/* ======= PERFUMES ======= */}
        {activeTab === "perfumes" && (
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
                      <tr
                        key={p._id}
                        className="hover:bg-stone-50 transition-colors"
                      >
                        <td className="p-5">
                          <div className="w-14 h-14 relative rounded-xl overflow-hidden border border-stone-200 bg-stone-50">
                            <Image
                              src={
                                p.imageUrl || "/assets/defaultPerfumeImage.png"
                              }
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
                            <EditModal perfume={p} onSuccess={refreshData} />
                            <DeleteModal perfume={p} onSuccess={refreshData} />
                          </div>
                        </td>
                      </tr>
                    ))}
                    {perfumes.length === 0 && (
                      <tr>
                        <td
                          colSpan="4"
                          className="p-12 text-center text-stone-500"
                        >
                          No perfumes found.
                        </td>
                      </tr>
                    )}
                  </tbody>
                </table>
              </div>
            </div>
          </div>
        )}

        {/* ======= COUPONS ======= */}
        {activeTab === "coupons" && (
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
                        onChange={(e) =>
                          setCouponCode(e.target.value.toUpperCase())
                        }
                        placeholder="e.g. SUMMER10"
                        className={
                          inp + " font-mono font-bold tracking-widest uppercase"
                        }
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
                          <th className="px-6 py-4 font-bold text-right">
                            Delete
                          </th>
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
                                onClick={() =>
                                  handleDeleteCoupon(c._id, c.code)
                                }
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
        )}

        {/* ======= BANNERS ======= */}
        {activeTab === "banners" && (
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
              <BannerFormModal
                onSuccess={refreshData}
                getAuthHeaders={getAuthHeaders}
              />
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
                          <p className="font-bold text-stone-900">
                            {banner.title}
                          </p>
                          <p className="text-xs text-amber-600 font-medium uppercase tracking-wide mt-0.5">
                            {banner.subtitle}
                          </p>
                        </td>
                        <td className="p-5">
                          <p className="text-xs font-bold text-stone-800">
                            {banner.buttonText}
                          </p>
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
                            <BannerFormModal
                              onSuccess={refreshData}
                              getAuthHeaders={getAuthHeaders}
                              existingBanner={banner}
                            />
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
                        <td
                          colSpan="5"
                          className="p-12 text-center text-stone-500"
                        >
                          No banners yet.
                        </td>
                      </tr>
                    )}
                  </tbody>
                </table>
              </div>
            </div>
          </div>
        )}

        {/* ======= COMBOS ======= */}
        {activeTab === "combos" && (
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
              <ComboFormModal
                onSuccess={refreshData}
                getAuthHeaders={getAuthHeaders}
                perfumes={perfumes}
              />
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
                              src={
                                combo.imageUrl ||
                                "/assets/defaultPerfumeImage.png"
                              }
                              alt={combo.title}
                              fill
                              className="object-cover"
                            />
                          </div>
                        </td>
                        <td className="p-5">
                          <p className="font-bold text-stone-900">
                            {combo.title}
                          </p>
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
                              <span className="text-stone-400 text-xs">
                                No items
                              </span>
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
                            onClick={() =>
                              handleCopyComboId(combo._id, combo.title)
                            }
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
                            <ComboFormModal
                              onSuccess={refreshData}
                              getAuthHeaders={getAuthHeaders}
                              perfumes={perfumes}
                              existingCombo={combo}
                            />
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
                        <td
                          colSpan="6"
                          className="p-12 text-center text-stone-500"
                        >
                          No combos yet. Create your first deal!
                        </td>
                      </tr>
                    )}
                  </tbody>
                </table>
              </div>
            </div>
          </div>
        )}

        {/* ======= USERS ======= */}
        {activeTab === "users" && (
          <div className="flex flex-col h-full">
            <div className="mb-6 shrink-0">
              <h1 className="text-2xl sm:text-3xl font-serif text-stone-900">
                User Management
              </h1>
              <p className="text-sm text-stone-500 mt-1">
                Assign or revoke admin roles
              </p>
            </div>
            <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 flex-1 overflow-hidden">
              {/* Role Update Form */}
              <div className="lg:col-span-1">
                <div className="bg-white border border-stone-200 rounded-2xl shadow-sm p-6 space-y-5">
                  <h2 className="text-base font-bold text-stone-900 flex items-center gap-2">
                    <FiShield className="text-amber-600" /> Update User Role
                  </h2>
                  <form onSubmit={handleUpdateRole} className="space-y-4">
                    <div>
                      <label className={lbl}>User Email</label>
                      <input
                        type="email"
                        required
                        value={roleEmail}
                        onChange={(e) => setRoleEmail(e.target.value)}
                        placeholder="user@example.com"
                        className={inp}
                      />
                    </div>
                    <div>
                      <label className={lbl}>Assign Role</label>
                      <div className="flex gap-2 mt-1">
                        <button
                          type="button"
                          onClick={() => setSelectedRole("admin")}
                          className={`flex-1 py-2.5 rounded-xl text-xs font-bold uppercase tracking-widest border transition-all ${selectedRole === "admin" ? "bg-amber-600 text-white border-amber-600" : "bg-stone-50 text-stone-600 border-stone-200 hover:border-amber-400"}`}
                        >
                          👑 Admin
                        </button>
                        <button
                          type="button"
                          onClick={() => setSelectedRole("user")}
                          className={`flex-1 py-2.5 rounded-xl text-xs font-bold uppercase tracking-widest border transition-all ${selectedRole === "user" ? "bg-stone-900 text-white border-stone-900" : "bg-stone-50 text-stone-600 border-stone-200 hover:border-stone-400"}`}
                        >
                          👤 User
                        </button>
                      </div>
                    </div>
                    <button
                      type="submit"
                      disabled={isUpdatingRole}
                      className="w-full py-3 bg-stone-900 text-white rounded-xl font-bold uppercase tracking-widest text-xs hover:bg-amber-600 transition-colors disabled:opacity-50"
                    >
                      {isUpdatingRole ? "Updating..." : "Update Role"}
                    </button>
                  </form>
                  <div className="bg-amber-50 border border-amber-200 rounded-xl p-4 text-xs text-amber-700 space-y-1">
                    <p className="font-bold">⚠️ Important:</p>
                    <p>
                      🛡️ Promoting a user to <b>Admin</b> grants full dashboard
                      access.{" "}
                    </p>
                    <p>
                      👤 Assigning the <b>User</b> role will revoke
                      administrative privileges.
                    </p>
                  </div>
                </div>
              </div>

              {/* Users List */}
              <div className="lg:col-span-2 bg-white border border-stone-200 rounded-2xl shadow-sm overflow-hidden flex flex-col">
                <div className="p-5 border-b border-stone-100 flex items-center">
                  <h2 className="text-base font-bold text-stone-900 flex items-center gap-2">
                    <FiUsers className="text-amber-600" /> All Users
                  </h2>
                  <span className="ml-auto bg-stone-100 text-stone-700 text-xs font-bold px-2.5 py-1 rounded-full">
                    {users.length} total
                  </span>
                </div>
                <div className="overflow-y-auto flex-1">
                  {users.length === 0 ? (
                    <div className="p-12 text-center text-stone-400">
                      <p>No users found.</p>
                    </div>
                  ) : (
                    <table className="w-full text-left">
                      <thead className="bg-stone-50 sticky top-0">
                        <tr className="text-stone-500 text-[10px] uppercase tracking-widest">
                          <th className="px-6 py-4 font-bold">User</th>
                          <th className="px-6 py-4 font-bold">Email</th>
                          <th className="px-6 py-4 font-bold">Role</th>
                          <th className="px-6 py-4 font-bold">Joined</th>
                        </tr>
                      </thead>
                      <tbody className="divide-y divide-stone-100">
                        {users.map((u) => (
                          <tr
                            key={u._id}
                            className="hover:bg-stone-50 transition-colors"
                          >
                            <td className="px-6 py-4">
                              <div className="flex items-center gap-3">
                                <div className="w-9 h-9 rounded-full bg-amber-100 text-amber-700 flex items-center justify-center font-bold text-sm shrink-0">
                                  {u.name
                                    ? u.name.charAt(0).toUpperCase()
                                    : "?"}
                                </div>
                                <p className="font-semibold text-stone-900 text-sm">
                                  {u.name || "—"}
                                </p>
                              </div>
                            </td>
                            <td className="px-6 py-4 text-stone-500 text-xs">
                              {u.email}
                            </td>
                            <td className="px-6 py-4">
                              {u.role === "admin" ? (
                                <span className="inline-flex items-center gap-1 text-[10px] font-bold text-amber-700 bg-amber-50 border border-amber-200 px-2.5 py-1 rounded-full">
                                  <MdAdminPanelSettings /> Admin
                                </span>
                              ) : (
                                <span className="inline-flex items-center gap-1 text-[10px] font-bold text-stone-600 bg-stone-100 border border-stone-200 px-2.5 py-1 rounded-full">
                                  <FiUser className="text-xs" /> User
                                </span>
                              )}
                            </td>
                            <td className="px-6 py-4 text-stone-400 text-xs">
                              {u.createdAt
                                ? new Date(u.createdAt).toLocaleDateString(
                                    "en-GB",
                                    {
                                      day: "2-digit",
                                      month: "short",
                                      year: "numeric",
                                    },
                                  )
                                : "—"}
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
        )}
      </main>
    </div>
  );
}

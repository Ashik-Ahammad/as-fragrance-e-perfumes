"use client";
import React, { useState } from "react";
import dynamic from "next/dynamic";
import { authClient } from "@/lib/auth-client";
import { FiPackage, FiBox, FiTag, FiImage, FiGrid, FiUsers } from "react-icons/fi";
import { MdAdminPanelSettings } from "react-icons/md";

// Lazy load feature components
const OrderManagement = dynamic(() => import("@/features/admin/components/OrderManagement"), { ssr: false, loading: () => <p>Loading Orders...</p> });
const PerfumeManagement = dynamic(() => import("@/features/admin/components/PerfumeManagement"), { ssr: false, loading: () => <p>Loading Perfumes...</p> });
const CouponManagement = dynamic(() => import("@/features/admin/components/CouponManagement"), { ssr: false, loading: () => <p>Loading Coupons...</p> });
const BannerManagement = dynamic(() => import("@/features/admin/components/BannerManagement"), { ssr: false, loading: () => <p>Loading Banners...</p> });
const ComboManagement = dynamic(() => import("@/features/admin/components/ComboManagement"), { ssr: false, loading: () => <p>Loading Combos...</p> });
const UserManagement = dynamic(() => import("@/features/admin/components/UserManagement"), { ssr: false, loading: () => <p>Loading Users...</p> });

const navItems = [
  { key: "orders", icon: <FiPackage />, label: "Order Management" },
  { key: "perfumes", icon: <FiBox />, label: "Perfume Catalog" },
  { key: "coupons", icon: <FiTag />, label: "Coupon Manager" },
  { key: "banners", icon: <FiImage />, label: "Banner Control" },
  { key: "combos", icon: <FiGrid />, label: "Combo Deals" },
  { key: "users", icon: <FiUsers />, label: "User Management" },
];

export default function AdminDashboardClient({ initialOrders, initialPerfumes }) {
  const { data: session } = authClient.useSession();
  const admin = session?.user;
  const [activeTab, setActiveTab] = useState("orders");

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
              className={`w-full flex items-center gap-3 px-4 py-3 rounded-xl text-sm font-medium transition-all cursor-pointer ${
                activeTab === item.key ? "bg-stone-900 text-white shadow-md" : "text-stone-600 hover:bg-stone-100"
              }`}
            >
              <span className="text-lg">{item.icon}</span> {item.label}
            </button>
          ))}
        </nav>
      </aside>

      {/* Main Content Area */}
      <main className="flex-1 p-4 sm:p-6 md:p-10 pt-8 md:pt-10 overflow-hidden flex flex-col h-screen">
        {activeTab === "orders" && <OrderManagement initialOrders={initialOrders} />}
        {activeTab === "perfumes" && <PerfumeManagement initialPerfumes={initialPerfumes} />}
        {activeTab === "coupons" && <CouponManagement />}
        {activeTab === "banners" && <BannerManagement />}
        {activeTab === "combos" && <ComboManagement />}
        {activeTab === "users" && <UserManagement />}
      </main>
    </div>
  );
}

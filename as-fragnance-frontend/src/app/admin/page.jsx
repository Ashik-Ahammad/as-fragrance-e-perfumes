export const dynamic = 'force-dynamic';
import React from "react";
import AdminDashboardClient from "@/components/client-components/AdminDashboardClient";

export const metadata = {
  title: "Admin Terminal | AS Fragrance",
  description: "Secure admin management dashboard.",
  robots: {
    index: false,
    follow: false,
  },
};

export default async function AdminPage() {
  let initialOrders = [];
  let initialPerfumes = [];

  try {
    const [orderRes, perfumeRes] = await Promise.all([
      fetch(`${process.env.NEXT_PUBLIC_SERVER_URL}/orders`, {
        cache: "no-store",
      }),
      fetch(`${process.env.NEXT_PUBLIC_SERVER_URL}/perfume`, {
        cache: "no-store",
      }),
    ]);

    if (orderRes.ok) initialOrders = await orderRes.json();
    if (perfumeRes.ok) initialPerfumes = await perfumeRes.json();
  } catch (error) {
    console.error("Failed to fetch initial admin data on server:", error);
  }

  return (
    <AdminDashboardClient
      initialOrders={initialOrders}
      initialPerfumes={initialPerfumes}
    />
  );
}

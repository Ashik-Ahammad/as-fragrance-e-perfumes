"use client";
import React, { useEffect, useState } from "react";
import { authClient } from "@/lib/auth-client";
import { Card } from "@heroui/react";
import {
  FiMail,
  FiUser,
  FiShoppingBag,
  FiPhone,
  FiMapPin,
  FiPackage,
  FiCalendar,
  FiCreditCard,
  FiBox,
  FiTruck,
} from "react-icons/fi";
import { FaBangladeshiTakaSign } from "react-icons/fa6";
import Image from "next/image";
import { toast } from "sonner";

const formatDate = (isoString) => {
  if (!isoString) return "Recently";
  const options = {
    year: "numeric",
    month: "short",
    day: "numeric",
    hour: "2-digit",
    minute: "2-digit",
  };
  return new Date(isoString).toLocaleDateString("en-US", options);
};

const ProfileClient = () => {

  const { data: session, isPending } = authClient.useSession();
  const user = session?.user;

  const [orders, setOrders] = useState([]);
  const [isMounted, setIsMounted] = useState(false);

  useEffect(() => {
    const timer = setTimeout(() => {
      setIsMounted(true);
    }, 0);
    return () => clearTimeout(timer);
  }, []);

  useEffect(() => {
    if (!isMounted) return;

    const handleOrders = async () => {
      const storedOrders = localStorage.getItem("as_guest_orders");

      if (user?.email) {

        if (storedOrders) {
          try {
            const { data: tokenData } = await authClient.token();
            const jwtToken = tokenData?.token;

            if (!jwtToken) {
              toast.error("Authentication failed. Please login again.");
              return;
            }

            const ordersToSync = JSON.parse(storedOrders);
            if (ordersToSync.length > 0) {
              const syncRes = await fetch(
                `${process.env.NEXT_PUBLIC_SERVER_URL}/orders/sync`,
                {
                  method: "POST",
                  headers: {
                    "Content-Type": "application/json",
                    Authorization: `Bearer ${jwtToken}`,
                  },
                  body: JSON.stringify({
                    email: user.email,
                    orders: ordersToSync,
                  }),
                },
              );

              if (syncRes.ok) {
                localStorage.removeItem("as_guest_orders");
              }
            }
          } catch (error) {
            console.error("Order sync failed:", error);
          }
        }

        try {
          const { data: tokenData } = await authClient.token();
          const jwtToken = tokenData?.token;

          if (!jwtToken) {
            toast.error("Authentication failed. Please login again.");
            return;
          }

          const dbRes = await fetch(
            `${process.env.NEXT_PUBLIC_SERVER_URL}/orders?email=${user.email}`,
            {
              headers: {
                Authorization: `Bearer ${jwtToken}`,
              },
            },
          );
          if (dbRes.ok) {
            const dbOrders = await dbRes.json();
            setOrders(dbOrders);
          }
        } catch (error) {
          console.error("Failed to fetch DB orders:", error);
        }
      } else {

        if (storedOrders) {
          try {
            const parsedOrders = JSON.parse(storedOrders);
            setOrders([...parsedOrders].reverse());
          } catch (error) {
            console.error("Failed parsing local orders:", error);
          }
        } else {
          setOrders([]);
        }
      }
    };

    handleOrders();
  }, [user, isMounted]);

  const recentOrderCustomer = orders.length > 0 ? orders[0].customer : null;
  const displayName =
    user?.name || recentOrderCustomer?.name || "Unregistered User";
  const displayEmail =
    user?.email || recentOrderCustomer?.email || "No email provided";
  const displayInitials = displayName.substring(0, 2).toUpperCase();

  if (isPending || !isMounted) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-[#fcfaf8]">
        <div className="w-8 h-8 border-2 border-stone-200 border-t-amber-500 rounded-full animate-spin"></div>
      </div>
    );
  }

  return (
    <div className="bg-[#fcfaf8] min-h-screen pt-24 pb-16 px-4 sm:px-6 lg:px-8 relative overflow-hidden">

      <div className="absolute top-0 left-1/4 w-[600px] h-[600px] bg-amber-100/30 rounded-full blur-[120px] pointer-events-none -translate-y-1/2"></div>

      <div className="max-w-7xl mx-auto relative z-10">
        <div className="mb-10">
          <h1 className="text-3xl md:text-4xl font-serif text-stone-900 mb-2">
            My Account
          </h1>
          <p className="text-sm text-stone-500 font-light tracking-wide">
            Manage your personal details and view recent fragrance dispatches.
          </p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">

          <div className="lg:col-span-4 flex flex-col gap-6">
            <Card className="bg-white/60 backdrop-blur-xl border border-white/80 shadow-[0_8px_30px_rgb(0,0,0,0.04)] rounded-[2rem] p-8 overflow-visible">
              <div className="flex flex-col items-center text-center">
                <div className="relative mb-5 flex items-center justify-center">
                  <div className="absolute inset-0 bg-amber-400 rounded-full blur-xl opacity-20"></div>
                  <div className="w-28 h-28 text-3xl bg-stone-50 text-stone-700 ring-4 ring-white shadow-lg relative z-10 rounded-full overflow-hidden flex items-center justify-center">
                    {user?.image ? (
                      <Image
                        src={user.image}
                        alt={displayName}
                        width={112}
                        height={112}
                        className="object-cover w-full h-full"
                        priority
                      />
                    ) : (
                      <span className="font-serif font-bold text-2xl text-stone-600 select-none">
                        {displayInitials}
                      </span>
                    )}
                  </div>
                </div>

                <h2 className="text-2xl font-serif text-stone-900 mb-1">
                  {displayName}
                </h2>
                <span className="px-3 py-1 bg-amber-50 text-amber-700 text-[9px] font-bold uppercase tracking-widest rounded-full border border-amber-100 mb-6">
                  {user ? "Verified Member" : "Guest Customer"}
                </span>

                <div className="w-full space-y-4">
                  <div className="flex items-center gap-3 p-3 bg-white rounded-xl border border-stone-100 shadow-sm text-left">
                    <div className="w-10 h-10 rounded-full bg-stone-50 flex items-center justify-center text-stone-400 shrink-0">
                      <FiUser className="text-lg" />
                    </div>
                    <div className="overflow-hidden">
                      <p className="text-[10px] font-bold uppercase tracking-widest text-stone-400">
                        Full Name
                      </p>
                      <p className="text-sm font-medium text-stone-800 truncate">
                        {displayName}
                      </p>
                    </div>
                  </div>
                  <div className="flex items-center gap-3 p-3 bg-white rounded-xl border border-stone-100 shadow-sm text-left">
                    <div className="w-10 h-10 rounded-full bg-stone-50 flex items-center justify-center text-stone-400 shrink-0">
                      <FiMail className="text-lg" />
                    </div>
                    <div className="overflow-hidden">
                      <p className="text-[10px] font-bold uppercase tracking-widest text-stone-400">
                        Email Address
                      </p>
                      <p className="text-sm font-medium text-stone-800 truncate">
                        {displayEmail}
                      </p>
                    </div>
                  </div>
                </div>
              </div>
            </Card>
          </div>

          <div className="lg:col-span-8 space-y-6">
            {orders.length === 0 ? (
              <div className="bg-white/40 backdrop-blur-md border-2 border-dashed border-stone-200 rounded-[2rem] min-h-130 flex flex-col items-center justify-center text-center p-8">
                <FiShoppingBag className="text-4xl text-stone-300 mb-4" />
                <h3 className="text-2xl font-serif text-stone-800 mb-2">
                  No Orders Found
                </h3>
                <p className="text-stone-500 text-sm font-light max-w-sm">
                  Your luxury perfume purchase logs are currently empty.
                </p>
              </div>
            ) : (
              <div className="space-y-6">
                <h3 className="text-xl font-serif text-stone-900 tracking-wide mb-2 flex items-center gap-2">
                  <FiPackage className="text-amber-600" /> Order History (
                  {orders.length})
                </h3>

                {orders.map((order, idx) => {
                  const status = order.paymentStatus || "Pending";

                  const getStatusColor = (s) => {
                    if (s === "Delivered")
                      return "bg-emerald-50 text-emerald-700 border-emerald-200";
                    if (s === "Shipped")
                      return "bg-blue-50 text-blue-700 border-blue-200";
                    if (s === "Cancelled")
                      return "bg-rose-50 text-rose-700 border-rose-200";
                    return "bg-amber-50 text-amber-700 border-amber-200";
                  };

                  return (
                    <Card
                      key={idx}
                      className="bg-white border border-stone-100 shadow-[0_4px_20px_rgba(0,0,0,0.02)] rounded-[2rem] p-6 sm:p-8 space-y-6"
                    >
                      <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4 pb-4 border-b border-stone-100">
                        <div>
                          <span className="text-[10px] font-bold text-stone-400 uppercase tracking-widest block mb-1">
                            Order Hash ID
                          </span>
                          <span className="font-mono text-xs font-semibold text-stone-700 bg-stone-50 px-3 py-1.5 rounded-lg border border-stone-200/60">
                            {order.customOrderId ||
                              `#ASF-ORD-${orders.length - idx}${new Date().getFullYear().toString().substring(2)}`}
                          </span>
                        </div>
                        <div className="flex flex-col items-end gap-2">
                          <span
                            className={`px-3 py-1 text-[10px] font-bold uppercase tracking-wider rounded-full border flex items-center gap-1.5 ${getStatusColor(status)}`}
                          >
                            {status === "Delivered" ? (
                              <FiPackage />
                            ) : status === "Shipped" ? (
                              <FiTruck />
                            ) : (
                              <FiCalendar />
                            )}
                            {status}
                          </span>

                          <span className="text-[10px] text-stone-400 flex items-center gap-1 mt-0.5">
                            Placed: {formatDate(order.createdAt)}
                          </span>
                        </div>
                      </div>

                      <div className="grid grid-cols-1 md:grid-cols-2 gap-6 bg-stone-50/60 p-5 rounded-2xl border border-stone-100">
                        <div className="space-y-3.5">
                          <h4 className="text-xs font-bold text-stone-400 uppercase tracking-wider flex items-center gap-1.5">
                            <FiMapPin /> Delivery Detail
                          </h4>
                          <div className="text-sm space-y-1">
                            <p className="text-stone-800 font-medium">
                              {order.customer?.name}
                            </p>
                            <p className="text-stone-500 font-light flex items-center gap-1.5 text-xs">
                              <FiPhone className="text-stone-400" />
                              {order.customer?.phone}
                            </p>
                            <p className="text-stone-700 font-light text-xs leading-relaxed max-w-xs pt-1">
                              {order.customer?.address}, {order.customer?.thana}
                              , {order.customer?.district}
                            </p>
                          </div>
                        </div>

                        <div className="space-y-3.5">
                          <h4 className="text-xs font-bold text-stone-400 uppercase tracking-wider flex items-center gap-1.5">
                            <FiCreditCard /> Payment Information
                          </h4>
                          <div className="text-sm space-y-2">
                            <div className="flex items-center gap-2">
                              <span className="text-xs text-stone-500">
                                Method:
                              </span>
                              <span className="text-xs font-bold uppercase tracking-wider text-stone-800 bg-white px-2 py-0.5 rounded border border-stone-200">
                                {order.payment?.method || "N/A"}
                              </span>
                            </div>
                            {order.payment?.transactionId && (
                              <div className="flex items-center gap-2">
                                <span className="text-xs text-stone-500">
                                  TrxID:
                                </span>
                                <span className="text-xs font-mono text-stone-700 bg-white px-2 py-0.5 rounded border border-stone-200 select-all">
                                  {order.payment.transactionId}
                                </span>
                              </div>
                            )}
                          </div>
                        </div>
                      </div>

                      <div className="pt-2">
                        <h4 className="text-xs font-bold text-stone-400 uppercase tracking-wider flex items-center gap-1.5 mb-3">
                          <FiBox /> Purchased Items
                        </h4>
                        <div className="space-y-3">
                          {order.items?.map((item, i) => (
                            <div
                              key={i}
                              className="flex justify-between items-center bg-white p-3 rounded-xl border border-stone-100 shadow-sm"
                            >
                              <div className="flex flex-col">
                                <span className="text-sm font-medium text-stone-800">
                                  {item.title}
                                </span>
                                <span className="text-[10px] text-stone-500 uppercase tracking-widest mt-0.5">
                                  {item.size}{" "}
                                  <span className="lowercase">x</span>{" "}
                                  {item.quantity}
                                </span>
                              </div>
                              <div className="flex items-center text-sm font-semibold text-stone-900 gap-0.5">
                                <FaBangladeshiTakaSign className="text-[10px]" />
                                <span>{item.price * item.quantity}</span>
                              </div>
                            </div>
                          ))}
                        </div>
                      </div>

                      <div className="pt-4 border-t border-dashed border-stone-200/80 flex flex-col gap-2">
                        <div className="flex justify-between items-center text-xs text-stone-500 px-3">
                          <span>Subtotal</span>
                          <div className="flex items-center gap-0.5">
                            <FaBangladeshiTakaSign className="text-[10px]" />
                            <span>{order.financials?.subtotal || 0}</span>
                          </div>
                        </div>
                        <div className="flex justify-between items-center text-xs text-stone-500 px-3">
                          <span>Delivery</span>
                          <div className="flex items-center gap-0.5">
                            <FaBangladeshiTakaSign className="text-[10px]" />
                            <span>{order.financials?.deliveryCharge || 0}</span>
                          </div>
                        </div>
                        {order.financials?.discount > 0 && (
                          <div className="flex justify-between items-center text-xs text-emerald-600 px-3">
                            <span>Discount</span>
                            <div className="flex items-center gap-0.5">
                              -<FaBangladeshiTakaSign className="text-[10px]" />
                              <span>{order.financials.discount}</span>
                            </div>
                          </div>
                        )}
                        <div className="flex justify-between items-center bg-stone-50/50 p-3 rounded-xl mt-1">
                          <span className="text-xs font-bold uppercase tracking-widest text-stone-500">
                            Total Bill
                          </span>
                          <div className="flex items-center text-lg font-bold text-stone-900 gap-0.5">
                            <FaBangladeshiTakaSign className="text-sm" />
                            <span>{order.financials?.grandTotal}</span>
                          </div>
                        </div>
                      </div>
                    </Card>
                  );
                })}
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default ProfileClient;

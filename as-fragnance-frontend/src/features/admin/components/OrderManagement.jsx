"use client";
import React, { useState, useEffect } from "react";
import { FiPhone, FiCopy, FiMapPin, FiMail, FiTrash2 } from "react-icons/fi";
import { FaBangladeshiTakaSign } from "react-icons/fa6";
import { toast } from "sonner";
import { getOrders, updateOrderStatus, updatePaymentStatus, deleteOrder } from "@/services/orderService";

export default function OrderManagement({ initialOrders = [] }) {
  const [orders, setOrders] = useState(initialOrders);
  const [isLoading, setIsLoading] = useState(!initialOrders.length);

  const fetchOrders = async () => {
    try {
      const data = await getOrders();
      setOrders(data);
    } catch (error) {
      toast.error("Failed to fetch orders");
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    if (!initialOrders.length) {
      fetchOrders();
    }
  }, [initialOrders]);

  const handleCopyPhone = (phone) => {
    if (!phone) return;
    navigator.clipboard.writeText(phone);
    toast.success(`${phone} copied!`);
  };

  const handleUpdateDeliveryStatus = async (orderId, newStatus) => {
    try {
      await updateOrderStatus(orderId, newStatus);
      toast.success(`Delivery → ${newStatus}`);
      fetchOrders();
    } catch {
      toast.error("Failed to update delivery status");
    }
  };

  const handleUpdatePaymentState = async (orderId, newPaymentState) => {
    try {
      await updatePaymentStatus(orderId, newPaymentState);
      toast.success(`Payment → ${newPaymentState}`);
      fetchOrders();
    } catch {
      toast.error("Failed to update payment status");
    }
  };

  const handleDeleteOrder = async (orderId) => {
    if (!confirm("Delete this order?")) return;
    try {
      await deleteOrder(orderId);
      toast.success("Order deleted");
      fetchOrders();
    } catch {
      toast.error("Deletion failed");
    }
  };

  if (isLoading) return <div className="p-10 text-center">Loading Orders...</div>;

  return (
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
                <th className="p-5 font-bold whitespace-nowrap">Order Details</th>
                <th className="p-5 font-bold whitespace-nowrap">Customer Info</th>
                <th className="p-5 font-bold whitespace-nowrap">Total Bill</th>
                <th className="p-5 font-bold whitespace-nowrap">Payment Status</th>
                <th className="p-5 font-bold whitespace-nowrap">Delivery Status</th>
                <th className="p-5 font-bold text-right whitespace-nowrap">Delete</th>
              </tr>
            </thead>
            <tbody className="text-sm divide-y divide-stone-100">
              {orders.map((order) => {
                const currentPaymentState = order.payment?.status || "Unpaid";
                const currentDeliveryState = order.paymentStatus || "Pending";
                return (
                  <tr key={order._id} className="hover:bg-stone-50 transition-colors">
                    <td className="p-5 align-top">
                      <span className="font-mono font-bold text-stone-900 text-sm block mb-1">
                        {order.customOrderId}
                      </span>
                      <span className="text-xs text-stone-500">
                        {new Date(order.createdAt).toLocaleDateString("en-GB", {
                          day: "2-digit",
                          month: "short",
                          year: "numeric",
                        })}
                      </span>
                    </td>
                    <td className="p-5 align-top max-w-[250px]">
                      <p className="font-bold text-stone-900 text-sm">
                        {order.customer?.name}
                      </p>
                      <div className="flex flex-wrap gap-2 mt-1.5">
                        <div
                          onClick={() => handleCopyPhone(order.customer?.phone)}
                          className="inline-flex items-center gap-1.5 px-2.5 py-1 bg-amber-50 text-amber-700 text-xs font-semibold rounded-lg cursor-pointer hover:bg-amber-100 transition-colors border border-amber-200/50"
                        >
                          <FiPhone className="text-[10px]" />
                          {order.customer?.phone}
                          <FiCopy className="text-[10px] ml-1 opacity-70" />
                        </div>
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
                          {order.customer?.address}, {order.customer?.thana}, {order.customer?.district}
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
                        onChange={(e) => handleUpdatePaymentState(order._id, e.target.value)}
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
                        onChange={(e) => handleUpdateDeliveryStatus(order._id, e.target.value)}
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
                  <td colSpan="6" className="p-12 text-center text-stone-500">
                    No orders found.
                  </td>
                </tr>
              )}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}

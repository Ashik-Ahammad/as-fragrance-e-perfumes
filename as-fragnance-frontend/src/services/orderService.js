import { apiGet, apiPost, apiPatch, apiDelete } from "./apiConfig";

export const getOrders = (email = "") => {
  const endpoint = email ? `/orders?email=${encodeURIComponent(email)}` : "/orders";
  return apiGet(endpoint);
};

export const createOrder = (orderData) => {
  return apiPost("/orders", orderData);
};

export const syncGuestOrders = (email, orders) => {
  return apiPost("/orders/sync", { email, orders });
};

export const updateOrderStatus = (id, status) => {
  return apiPatch(`/orders/${id}/status`, { status });
};

export const updatePaymentStatus = (id, paymentState) => {
  return apiPatch(`/orders/${id}/payment`, { paymentState });
};

export const deleteOrder = (id) => {
  return apiDelete(`/orders/${id}`);
};

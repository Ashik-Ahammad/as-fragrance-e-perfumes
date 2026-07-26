import { apiGet, apiPost, apiDelete } from "./apiConfig";

export const getCoupons = () => {
  return apiGet("/coupons");
};

export const addCoupon = (couponData) => {
  return apiPost("/coupons", couponData);
};

export const verifyCoupon = (code) => {
  return apiPost("/verify-coupon", { code });
};

export const deleteCoupon = (id) => {
  return apiDelete(`/coupons/${id}`);
};

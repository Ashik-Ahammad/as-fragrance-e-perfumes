import { apiGet, apiPost, apiPatch, apiDelete } from "./apiConfig";

export const getBanners = () => {
  return apiGet("/banners");
};

export const addBanner = (bannerData) => {
  return apiPost("/banners", bannerData);
};

export const updateBanner = (id, bannerData) => {
  return apiPatch(`/banners/${id}`, bannerData);
};

export const deleteBanner = (id) => {
  return apiDelete(`/banners/${id}`);
};

import { apiGet, apiPost, apiPatch, apiDelete } from "./apiConfig";

export const getPerfumes = (searchQuery = "") => {
  const endpoint = searchQuery ? `/perfume?search=${encodeURIComponent(searchQuery)}` : "/perfume";
  return apiGet(endpoint);
};

export const getPerfumeById = (id) => {
  return apiGet(`/perfume/${id}`);
};

export const addPerfume = (perfumeData) => {
  return apiPost("/perfume", perfumeData);
};

export const updatePerfume = (id, perfumeData) => {
  return apiPatch(`/perfume/${id}`, perfumeData);
};

export const deletePerfume = (id) => {
  return apiDelete(`/perfume/${id}`);
};

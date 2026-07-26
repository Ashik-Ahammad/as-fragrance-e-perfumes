import { apiGet, apiPost, apiPatch, apiDelete } from "./apiConfig";

export const getCombos = () => {
  return apiGet("/combos");
};

export const getComboById = (id) => {
  return apiGet(`/combos/${id}`);
};

export const addCombo = (comboData) => {
  return apiPost("/combos", comboData);
};

export const updateCombo = (id, comboData) => {
  return apiPatch(`/combos/${id}`, comboData);
};

export const deleteCombo = (id) => {
  return apiDelete(`/combos/${id}`);
};

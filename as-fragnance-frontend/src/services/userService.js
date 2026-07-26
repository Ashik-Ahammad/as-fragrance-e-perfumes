import { apiGet, apiPatch, apiDelete } from "./apiConfig";

export const getUsers = () => {
  return apiGet("/users");
};

export const updateUserRole = (email, role) => {
  return apiPatch("/users/role", { email, role });
};

export const deleteUser = (id) => {
  return apiDelete(`/users/${id}`);
};

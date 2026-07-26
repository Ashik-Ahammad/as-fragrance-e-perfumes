// src/services/apiConfig.js

const API_BASE_URL = process.env.NEXT_PUBLIC_SERVER_URL || "http://localhost:8888";

/**
 * Generic API Fetch Utility
 * Handles standard JSON requests, headers, and error parsing.
 * 
 * @param {string} endpoint API path (e.g., "/perfume")
 * @param {object} options Fetch options (method, body, headers)
 * @returns {Promise<any>}
 */
const apiFetch = async (endpoint, options = {}) => {
  const url = `${API_BASE_URL}${endpoint}`;
  
  const headers = {
    "Content-Type": "application/json",
    ...options.headers,
  };

let cachedToken = null;

  // Automatically attach auth token if available
  if (typeof window !== "undefined") {
    let token = localStorage.getItem("token") || cachedToken;
    
    if (!token) {
      try {
        // Fetch the HTTP-only cookie token from our Next.js API
        const tokenRes = await fetch("/api/get-token");
        const tokenData = await tokenRes.json();
        if (tokenData.token) {
          token = tokenData.token;
          cachedToken = token; // Cache in memory to prevent repeated calls
        }
      } catch (err) {
        console.error("Failed to fetch internal token", err);
      }
    }

    if (token && !headers["Authorization"]) {
      headers["Authorization"] = `Bearer ${token}`;
    }
  }

  const config = {
    ...options,
    headers,
  };

  if (config.body && typeof config.body === "object") {
    config.body = JSON.stringify(config.body);
  }

  try {
    const response = await fetch(url, config);
    const data = await response.json().catch(() => null);

    if (!response.ok) {
      throw new Error((data && data.message) || `API Error: ${response.status}`);
    }

    return data;
  } catch (error) {
    console.error(`[apiFetch] Error at ${endpoint}:`, error);
    throw error;
  }
};

export const apiGet = (endpoint, options) => apiFetch(endpoint, { method: "GET", ...options });
export const apiPost = (endpoint, body, options) => apiFetch(endpoint, { method: "POST", body, ...options });
export const apiPatch = (endpoint, body, options) => apiFetch(endpoint, { method: "PATCH", body, ...options });
export const apiPut = (endpoint, body, options) => apiFetch(endpoint, { method: "PUT", body, ...options });
export const apiDelete = (endpoint, options) => apiFetch(endpoint, { method: "DELETE", ...options });

export default apiFetch;

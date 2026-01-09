import axios from "axios";

const apiBaseUrl = process.env.NEXT_PUBLIC_API_BASE_URL || "http://localhost:8000";

export const apiClient = axios.create({
  baseURL: apiBaseUrl,
});

export const setAuthToken = (token: string | null) => {
  if (token) {
    apiClient.defaults.headers.common.Authorization = `Bearer ${token}`;
  } else {
    delete apiClient.defaults.headers.common.Authorization;
  }
};

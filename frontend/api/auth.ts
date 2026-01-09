import { apiClient } from "./client";

export const login = async (email: string, password: string) => {
  const response = await apiClient.post("/auth/login", { email, password });
  return response.data as { access_token: string };
};

export const register = async (email: string, password: string) => {
  const response = await apiClient.post("/auth/register", { email, password });
  return response.data;
};

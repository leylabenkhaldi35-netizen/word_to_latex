import { apiClient } from "./client";
import type { Project } from "../types/project";

export const fetchProjects = async (): Promise<Project[]> => {
  const response = await apiClient.get<Project[]>("/projects");
  return response.data;
};

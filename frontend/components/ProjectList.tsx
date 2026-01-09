"use client";

import { useEffect, useState } from "react";
import { fetchProjects } from "../api/projects";
import { useAuth } from "../context/AuthContext";
import type { Project } from "../types/project";

export default function ProjectList() {
  const { token } = useAuth();
  const [projects, setProjects] = useState<Project[]>([]);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    if (!token) {
      setProjects([]);
      return;
    }

    const loadProjects = async () => {
      try {
        const data = await fetchProjects();
        setProjects(data);
      } catch (err) {
        setError("Unable to load projects right now.");
      }
    };

    loadProjects();
  }, [token]);

  if (!token) {
    return (
      <div className="rounded-2xl border border-dashed border-slate-200 bg-white p-6 text-sm text-slate-500 dark:border-slate-800 dark:bg-slate-900 dark:text-slate-400">
        Sign in to view your projects.
      </div>
    );
  }

  if (error) {
    return (
      <div className="rounded-2xl border border-red-200 bg-red-50 p-6 text-sm text-red-700">
        {error}
      </div>
    );
  }

  if (!projects.length) {
    return (
      <div className="rounded-2xl border border-dashed border-slate-200 bg-white p-6 text-sm text-slate-500 dark:border-slate-800 dark:bg-slate-900 dark:text-slate-400">
        No projects yet. Create your first LaTeX workspace.
      </div>
    );
  }

  return (
    <div className="grid gap-4 md:grid-cols-2 xl:grid-cols-3">
      {projects.map((project) => (
        <div
          key={project.id}
          className="rounded-2xl border border-slate-200 bg-white p-5 shadow-sm transition hover:-translate-y-0.5 hover:shadow-md dark:border-slate-800 dark:bg-slate-900"
        >
          <h3 className="text-base font-semibold">{project.name}</h3>
          <p className="mt-1 text-xs text-slate-500 dark:text-slate-400">
            Updated {project.updated_at ?? "just now"}
          </p>
          <button className="mt-4 rounded-lg border border-slate-200 px-3 py-2 text-xs font-semibold text-slate-600 dark:border-slate-700 dark:text-slate-300">
            Open project
          </button>
        </div>
      ))}
    </div>
  );
}

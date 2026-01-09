"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { login, register } from "../api/auth";
import { useAuth } from "../context/AuthContext";

interface AuthFormProps {
  mode: "login" | "register";
}

export default function AuthForm({ mode }: AuthFormProps) {
  const router = useRouter();
  const { setToken } = useAuth();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState<string | null>(null);
  const [loading, setLoading] = useState(false);

  const handleSubmit = async (event: React.FormEvent) => {
    event.preventDefault();
    setError(null);
    setLoading(true);
    try {
      if (mode === "register") {
        await register(email, password);
      }
      const tokenResponse = await login(email, password);
      setToken(tokenResponse.access_token);
      router.push("/");
    } catch (err) {
      setError("Unable to authenticate. Please check your credentials.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <form
      onSubmit={handleSubmit}
      className="rounded-2xl border border-slate-200 bg-white p-6 shadow-sm dark:border-slate-800 dark:bg-slate-900"
    >
      <h1 className="text-2xl font-semibold">
        {mode === "login" ? "Sign in" : "Create an account"}
      </h1>
      <p className="mt-2 text-sm text-slate-500 dark:text-slate-400">
        {mode === "login"
          ? "Access your projects and continue writing."
          : "Start building collaborative LaTeX projects."}
      </p>
      <div className="mt-6 space-y-4">
        <div>
          <label className="text-xs font-semibold uppercase text-slate-500 dark:text-slate-400">
            Email
          </label>
          <input
            value={email}
            onChange={(event) => setEmail(event.target.value)}
            type="email"
            required
            className="mt-2 w-full rounded-lg border border-slate-200 bg-transparent px-3 py-2 text-sm outline-none focus:border-slate-400 dark:border-slate-700"
          />
        </div>
        <div>
          <label className="text-xs font-semibold uppercase text-slate-500 dark:text-slate-400">
            Password
          </label>
          <input
            value={password}
            onChange={(event) => setPassword(event.target.value)}
            type="password"
            required
            className="mt-2 w-full rounded-lg border border-slate-200 bg-transparent px-3 py-2 text-sm outline-none focus:border-slate-400 dark:border-slate-700"
          />
        </div>
      </div>
      {error ? (
        <div className="mt-4 rounded-lg border border-red-200 bg-red-50 p-3 text-sm text-red-700">
          {error}
        </div>
      ) : null}
      <button
        type="submit"
        disabled={loading}
        className="mt-6 w-full rounded-lg bg-slate-900 py-2 text-sm font-semibold text-white transition hover:bg-slate-800 disabled:opacity-60 dark:bg-slate-100 dark:text-slate-900"
      >
        {loading ? "Loading..." : mode === "login" ? "Sign in" : "Create account"}
      </button>
    </form>
  );
}

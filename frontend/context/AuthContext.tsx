"use client";

import { createContext, useContext, useEffect, useMemo, useState } from "react";
import { setAuthToken } from "../api/client";

interface AuthState {
  token: string | null;
  setToken: (token: string | null) => void;
}

const AuthContext = createContext<AuthState | undefined>(undefined);

export const AuthProvider = ({ children }: { children: React.ReactNode }) => {
  const [token, setTokenState] = useState<string | null>(null);

  useEffect(() => {
    const stored = window.localStorage.getItem("auth_token");
    if (stored) {
      setTokenState(stored);
      setAuthToken(stored);
    }
  }, []);

  const setToken = (newToken: string | null) => {
    setTokenState(newToken);
    setAuthToken(newToken);
    if (newToken) {
      window.localStorage.setItem("auth_token", newToken);
    } else {
      window.localStorage.removeItem("auth_token");
    }
  };

  const value = useMemo(() => ({ token, setToken }), [token]);

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
};

export const useAuth = () => {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error("useAuth must be used within AuthProvider");
  }
  return context;
};

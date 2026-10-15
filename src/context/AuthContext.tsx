"use client";

import { createContext, useContext, useState, useEffect, ReactNode } from "react";
import type { AppUser } from "@/types";

type Role = "elderly" | "companion" | "admin";

interface AuthUser {
  name: string;
  role: Role;
}

interface AuthContextValue {
  user: AuthUser | null;
  profile: AppUser | null;
  login: (name: string, role: Role) => void;
  logout: () => void;
  setProfile: (p: AppUser) => void;
}

const AuthContext = createContext<AuthContextValue>({
  user: null,
  profile: null,
  login: () => {},
  logout: () => {},
  setProfile: () => {},
});

export function AuthProvider({ children }: { children: ReactNode }) {
  const [user, setUser] = useState<AuthUser | null>(null);
  const [profile, setProfileState] = useState<AppUser | null>(null);

  // Rehydrate from localStorage on mount
  useEffect(() => {
    try {
      const stored = localStorage.getItem("ally_user");
      if (stored) setUser(JSON.parse(stored));
      const storedProfile = localStorage.getItem("ally_profile");
      if (storedProfile) setProfileState(JSON.parse(storedProfile));
    } catch {
      // ignore
    }
  }, []);

  const login = (name: string, role: Role) => {
    const u = { name, role };
    setUser(u);
    localStorage.setItem("ally_user", JSON.stringify(u));
  };

  const logout = () => {
    setUser(null);
    setProfileState(null);
    localStorage.removeItem("ally_user");
    localStorage.removeItem("ally_profile");
  };

  const setProfile = (p: AppUser) => {
    setProfileState(p);
    localStorage.setItem("ally_profile", JSON.stringify(p));
  };

  return (
    <AuthContext.Provider value={{ user, profile, login, logout, setProfile }}>
      {children}
    </AuthContext.Provider>
  );
}

export const useAuth = () => useContext(AuthContext);

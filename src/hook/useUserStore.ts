// useUserStore.ts
"use client";
import axiosInstance from "@/lib/axios";
import { jwtDecode } from "jwt-decode";
import { create } from "zustand";

export interface UserData {
  id: string | number;
  lastName: string;
  userType: string;
  role: string;
  token: string;
}

interface UserStore {
  user: UserData | null;
  login: (user: UserData) => void;
  logout: () => void;
  initUser: () => void;
}

export const useUserStore = create<UserStore>((set) => ({
  user: null,
  login: (user) => set({ user }),
  logout: async () => {
    const token = localStorage.getItem("token");
    if (token) {
      await axiosInstance.get(`/api/auth/logOut`);
      localStorage.removeItem("token");
      window.location.href = "/logOut";
    }
    set({ user: null });
  },
  initUser: () => {
    const token = localStorage.getItem("token");
    if (token) {
      try {
        const decoded = jwtDecode(token) as {
          id: string;
          lastName: string;
          userType: string;
          role: string;
        };
        set({
          user: {
            id: decoded.id,
            lastName: decoded.lastName,
            userType: decoded.userType,
            role: decoded.role,
            token,
          },
        });
      } catch (error) {
        console.error("Invalid token", error);
        set({ user: null });
      }
    }
  },
}));

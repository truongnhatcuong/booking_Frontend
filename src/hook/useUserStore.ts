import axiosInstance from "@/lib/axios";
import { jwtDecode } from "jwt-decode";
import { create } from "zustand";
import Cookies from "js-cookie";

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

const COOKIE_OPTIONS = {
  expires: 7,
  secure: true,
  sameSite: "strict" as const,
};

export const useUserStore = create<UserStore>((set) => ({
  user: null,
  login: (user) => {
    set({ user });
    localStorage.setItem("token", user.token);
    // Thêm: lưu vào cookie cho middleware đọc
    Cookies.set("token", user.token, COOKIE_OPTIONS);
  },

  logout: async () => {
    try {
      await axiosInstance.get(`/api/auth/logOut`);
    } catch {
      console.warn("Logout API failed, still clearing local");
    }
    localStorage.removeItem("token");
    // Thêm: xóa cookie
    Cookies.remove("token");
    set({ user: null });
    window.location.href = "/";
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
        const user = {
          id: decoded.id,
          lastName: decoded.lastName,
          userType: decoded.userType,
          role: decoded.role,
          token,
        };
        set({ user });
        // Thêm: sync cookie nếu chưa có (reload page)
        if (!Cookies.get("token")) {
          Cookies.set("token", token, COOKIE_OPTIONS);
        }
      } catch (error) {
        console.error("Invalid token", error);
        localStorage.removeItem("token");
        Cookies.remove("token");
        set({ user: null });
      }
    }
  },
}));

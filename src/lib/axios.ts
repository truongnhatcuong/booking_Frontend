import { useUserStore } from "@/hook/useUserStore";
import axios from "axios";
import Cookies from "js-cookie";

// ✅ Helper — chỉ chạy ở client
const isClient = typeof window !== "undefined";

const axiosInstance = axios.create({
  baseURL: process.env.NEXT_PUBLIC_URL_API,
  timeout: 30000,
  withCredentials: true,
});

const axiosRefresh = axios.create({
  baseURL: process.env.NEXT_PUBLIC_URL_API,
  timeout: 10000,
  withCredentials: true,
});

export const refreshAccessToken = async () => {
  try {
    const response = await axiosRefresh.post(`/api/auth/refresh-token`, {});
    const newAccessToken = response?.data?.accessToken;

    if (!newAccessToken) throw new Error("Không có access token mới");

    // ✅ Chỉ sync localStorage ở client
    if (isClient) {
      localStorage.setItem("token", newAccessToken);
    }

    Cookies.set("token", newAccessToken, {
      expires: 7,
      secure: true,
      sameSite: "strict",
    });

    const { user, login } = useUserStore.getState();
    if (user) {
      login({ ...user, token: newAccessToken });
    }

    return newAccessToken;
  } catch (error) {
    console.error("Không thể refresh token:", error);
    throw error;
  }
};

// ─── Request interceptor ──────────────────────────────────────────────────────
axiosInstance.interceptors.request.use(
  (config) => {
    // ✅ Ưu tiên: Zustand → localStorage (chỉ client) → Cookie
    const token =
      useUserStore.getState().user?.token ??
      (isClient ? localStorage.getItem("token") : null) ??
      Cookies.get("token"); // ✅ Cookie dùng được cả server lẫn client

    if (token && config.headers) {
      config.headers.Authorization = `Bearer ${token}`;
    }
    return config;
  },
  (error) => {
    console.error("[Request Error]", error);
    return Promise.reject(error);
  },
);

// ─── Response interceptor ─────────────────────────────────────────────────────
axiosInstance.interceptors.response.use(
  (response) => response,
  async (error) => {
    const originalRequest = error.config;
    const message =
      error.response?.data?.message ||
      error.message ||
      "Có lỗi xảy ra từ server!";

    if (error.response?.status === 401 && !originalRequest._retry) {
      originalRequest._retry = true;
      try {
        const newAccessToken = await refreshAccessToken();
        originalRequest.headers.Authorization = `Bearer ${newAccessToken}`;
        return axiosInstance(originalRequest);
      } catch (refreshError) {
        console.error("Refresh token thất bại:", refreshError);

        // ✅ Chỉ xóa localStorage và redirect ở client
        if (isClient) {
          localStorage.removeItem("token");
          Cookies.remove("token");
          window.location.href = "/signIn";
        }
      }
    }

    return Promise.reject({ ...error, message });
  },
);

export default axiosInstance;

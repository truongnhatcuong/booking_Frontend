import { useUserStore } from "@/hook/useUserStore";
import axios from "axios";
import Cookies from "js-cookie";

const axiosInstance = axios.create({
  baseURL: process.env.NEXT_PUBLIC_URL_API,
  timeout: 30000,
  withCredentials: true,
});

export const refreshAccessToken = async () => {
  try {
    const response = await axiosInstance.post(`/api/auth/refresh-token`, {});
    const newAccessToken = response?.data?.accessToken;

    localStorage.setItem("token", newAccessToken);
    Cookies.set("token", newAccessToken, {
      expires: 7,
      secure: true,
      sameSite: "strict",
    });

    // Sync zustand
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

axiosInstance.interceptors.request.use(
  (config) => {
    // Lấy từ zustand, fallback localStorage
    const token =
      useUserStore.getState().user?.token ?? localStorage.getItem("token");

    if (token && config.headers) {
      config.headers.Authorization = `Bearer ${token}`;
    }
    return config;
  },
  (error) => {
    console.error("[Request Error]", error);
    return error;
  },
);

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
        localStorage.removeItem("token");
        Cookies.remove("token");
        window.location.href = "/signIn";
      }
    }
    return Promise.reject({ ...error, message });
  },
);

export default axiosInstance;

/* eslint-disable @typescript-eslint/no-explicit-any */
"use client";

import axiosInstance from "@/lib/axios";
import { useState, ChangeEvent, useEffect } from "react";
import { toast } from "react-hot-toast";
import dynamic from "next/dynamic";
import { URL_API } from "@/lib/fetcher";

const FaceRegisterWidget = dynamic(() => import("./FaceRegisterWidget"), {
  ssr: false,
});

interface FormData {
  currentPassword: string;
  newPassword: string;
  confirmPassword: string;
}

const ProfileChangePassword = () => {
  const [loading, setLoading] = useState<boolean>(false);
  const [formData, setFormData] = useState<FormData>({
    currentPassword: "",
    newPassword: "",
    confirmPassword: "",
  });

  // Face state
  const [hasFace, setHasFace] = useState<boolean | null>(null);
  const [faceLoading, setFaceLoading] = useState(true);
  const [showFaceModal, setShowFaceModal] = useState(false);

  const token =
    typeof window !== "undefined" ? localStorage.getItem("token") : null;

  // Lấy trạng thái khuôn mặt
  useEffect(() => {
    if (!token) return;
    fetch(`${URL_API}/api/auth/face-descriptor/status`, {
      headers: { Authorization: `Bearer ${token}` },
    })
      .then((r) => r.json())
      .then((d) => setHasFace(d.hasFace))
      .catch(() => setHasFace(false))
      .finally(() => setFaceLoading(false));
  }, [token]);

  const handleDeleteFace = async () => {
    if (!confirm("Bạn có chắc muốn xóa khuôn mặt đã đăng ký?")) return;
    try {
      const res = await axiosInstance.delete(`/api/auth/face-descriptor`);
      if (res.data) {
        setHasFace(false);
        toast.success("Đã xóa khuôn mặt");
      }
    } catch {
      toast.error("Xóa thất bại");
    }
  };

  const handleChange = (e: ChangeEvent<HTMLInputElement>): void => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (formData.newPassword !== formData.confirmPassword) {
      toast.error("Mật khẩu không khớp");
      return;
    }
    try {
      setLoading(true);
      const res = await axiosInstance.post(
        `/api/auth/user/changePassword`,
        {
          currentPassword: formData.currentPassword,
          newPassword: formData.newPassword,
        },
        { withCredentials: true },
      );
      if (res.data) {
        toast.success("Thay Đổi Mật Khẩu Thành Công");
        setFormData({
          currentPassword: "",
          newPassword: "",
          confirmPassword: "",
        });
      }
    } catch (error: any) {
      toast.error(
        error?.response?.data?.message || "Failed to change password",
      );
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="w-full max-w-3xl mx-auto bg-white">
      {/* Header */}
      <div className="bg-amber-600 p-6 text-center">
        <h2 className="text-3xl font-bold text-white">Đổi Mật Khẩu</h2>
        <p className="text-amber-100 mt-2">
          Vui lòng nhập thông tin để thay đổi mật khẩu
        </p>
        <ul className="text-white text-sm mt-4 list-disc list-inside text-left mx-auto max-w-md">
          <li>Mật khẩu phải có ít nhất 6 ký tự</li>
          <li>Chứa ít nhất 1 chữ cái viết hoa</li>
          <li>Chứa ít nhất 1 số</li>
          <li>Mật khẩu mới và xác nhận phải trùng khớp</li>
        </ul>
      </div>

      <div className="p-8 space-y-8">
        {/* ── FACE SECTION ── */}
        <div
          className="rounded-2xl p-5 flex items-center gap-4"
          style={{ background: "#f9fafb", border: "1px solid #e5e7eb" }}
        >
          {/* Icon */}
          <div className="w-12 h-12 rounded-xl flex items-center justify-center flex-shrink-0 text-2xl bg-white shadow-sm border border-gray-100">
            👤
          </div>

          {/* Text */}
          <div className="flex-1 min-w-0">
            <div className="flex items-center gap-2 mb-0.5 flex-wrap">
              <span className="font-semibold text-gray-800">
                Nhận diện khuôn mặt
              </span>
              {faceLoading ? (
                <span className="text-xs px-2 py-0.5 rounded-full bg-gray-100 text-gray-400">
                  Đang kiểm tra...
                </span>
              ) : hasFace ? (
                <span
                  className="flex items-center gap-1 text-xs px-2 py-0.5 rounded-full"
                  style={{
                    background: "#dcfce7",
                    color: "#16a34a",
                    border: "1px solid #bbf7d0",
                  }}
                >
                  <span className="w-1.5 h-1.5 rounded-full bg-green-500 inline-block" />
                  Đã đăng ký
                </span>
              ) : (
                <span
                  className="flex items-center gap-1 text-xs px-2 py-0.5 rounded-full"
                  style={{
                    background: "#f3f4f6",
                    color: "#6b7280",
                    border: "1px solid #e5e7eb",
                  }}
                >
                  <span className="w-1.5 h-1.5 rounded-full bg-gray-400 inline-block" />
                  Chưa đăng ký
                </span>
              )}
            </div>
            <p className="text-sm text-gray-500">
              Đăng nhập nhanh không cần mật khẩu bằng khuôn mặt của bạn
            </p>
          </div>

          {/* Action */}
          <div className="flex-shrink-0">
            {faceLoading ? null : hasFace ? (
              <div className="flex gap-2">
                <button
                  onClick={() => setShowFaceModal(true)}
                  className="text-sm font-medium px-3 py-1.5 rounded-lg transition-all hover:scale-105"
                  style={{
                    background: "#fef3c7",
                    color: "#d97706",
                    border: "1px solid #fde68a",
                  }}
                >
                  Cập nhật
                </button>
                <button
                  onClick={handleDeleteFace}
                  className="text-sm font-medium px-3 py-1.5 rounded-lg transition-all hover:scale-105"
                  style={{
                    background: "#fee2e2",
                    color: "#dc2626",
                    border: "1px solid #fecaca",
                  }}
                >
                  Xóa
                </button>
              </div>
            ) : (
              <button
                onClick={() => setShowFaceModal(true)}
                className="text-sm font-semibold px-4 py-2 rounded-xl text-white transition-all hover:scale-105 hover:shadow-md"
                style={{
                  background: "linear-gradient(135deg,#f59e0b,#d97706)",
                }}
              >
                Đăng ký ngay
              </button>
            )}
          </div>
        </div>

        {/* ── DIVIDER ── */}
        <div className="flex items-center gap-3">
          <div className="flex-1 h-px bg-gray-200" />
          <span className="text-sm text-gray-400 font-medium">
            Đổi mật khẩu
          </span>
          <div className="flex-1 h-px bg-gray-200" />
        </div>

        {/* ── PASSWORD FORM ── */}
        <form onSubmit={handleSubmit} className="space-y-6">
          <div className="animate-fade-in">
            <label
              htmlFor="currentPassword"
              className="block text-lg font-medium text-gray-700 mb-2"
            >
              Mật khẩu hiện tại
            </label>
            <input
              type="password"
              id="currentPassword"
              name="currentPassword"
              value={formData.currentPassword}
              onChange={handleChange}
              className="w-full px-4 py-3 border-2 border-amber-300 rounded-xl focus:ring-2 focus:ring-amber-500 focus:border-amber-500 transition-all"
              required
              placeholder="Nhập mật khẩu hiện tại"
            />
          </div>

          <div className="animate-slide-in-left">
            <label
              htmlFor="newPassword"
              className="block text-lg font-medium text-gray-700 mb-2"
            >
              Mật khẩu mới
            </label>
            <input
              type="password"
              id="newPassword"
              name="newPassword"
              value={formData.newPassword}
              onChange={handleChange}
              className="w-full px-4 py-3 border-2 border-amber-300 rounded-xl focus:ring-2 focus:ring-amber-500 focus:border-amber-500 transition-all"
              required
              placeholder="Nhập mật khẩu mới"
            />
          </div>

          <div className="animate-slide-in-right">
            <label
              htmlFor="confirmPassword"
              className="block text-lg font-medium text-gray-700 mb-2"
            >
              Xác nhận mật khẩu mới
            </label>
            <input
              type="password"
              id="confirmPassword"
              name="confirmPassword"
              value={formData.confirmPassword}
              onChange={handleChange}
              className="w-full px-4 py-3 border-2 border-amber-300 rounded-xl focus:ring-2 focus:ring-amber-500 focus:border-amber-500 transition-all"
              required
              placeholder="Nhập lại mật khẩu mới"
            />
          </div>

          <button
            type="submit"
            disabled={loading}
            className={`w-full py-3 px-4 rounded-xl shadow-lg text-lg font-semibold text-white transition-all duration-300 transform hover:scale-[1.02] ${
              loading
                ? "bg-amber-400 cursor-not-allowed"
                : "bg-amber-600 hover:bg-amber-700"
            }`}
          >
            {loading ? (
              <span className="flex items-center justify-center">
                <svg
                  className="animate-spin -ml-1 mr-3 h-5 w-5 text-white"
                  xmlns="http://www.w3.org/2000/svg"
                  fill="none"
                  viewBox="0 0 24 24"
                >
                  <circle
                    className="opacity-25"
                    cx="12"
                    cy="12"
                    r="10"
                    stroke="currentColor"
                    strokeWidth="4"
                  />
                  <path
                    className="opacity-75"
                    fill="currentColor"
                    d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"
                  />
                </svg>
                Đang xử lý...
              </span>
            ) : (
              "Đổi Mật Khẩu"
            )}
          </button>
        </form>
      </div>

      {/* Face Register Modal */}
      {showFaceModal && token && (
        <FaceRegisterWidget
          token={token}
          isUpdate={!!hasFace}
          onSuccess={() => {
            setHasFace(true);
            setShowFaceModal(false);
            toast.success(
              hasFace
                ? "Cập nhật khuôn mặt thành công!"
                : "Đăng ký khuôn mặt thành công! 🎉",
            );
          }}
          onClose={() => setShowFaceModal(false)}
        />
      )}
    </div>
  );
};

export default ProfileChangePassword;

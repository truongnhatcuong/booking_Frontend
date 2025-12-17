"use client";

import React, { useMemo, useState } from "react";
import {
  MiniStatsDashboard,
  MiniStatsTablePayload,
} from "../../components/statistical/MiniStatsDashboard";
import axiosInstance from "@/lib/axios";

type ApiResponse = {
  success: boolean;
  data?: {
    text?: MiniStatsTablePayload;
  };
  error?: string;
};

export default function MiniStatsChat() {
  const [message, setMessage] = useState<string>("tổng quan năm nay");
  const [payload, setPayload] = useState<MiniStatsTablePayload | null>(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const quickQuestions = useMemo(
    () => [
      "Tổng quan hôm nay",
      "Tổng quan tuần này",
      "Tổng quan tháng này",
      "Tổng quan năm nay",
      "Hôm nay thanh toán theo hình thức nào?",
      "Top 5 khách đặt nhiều nhất hôm nay",
      "Phòng 401 đang có ai ở?",
      "Tổng quan phòng 401 hôm nay",
    ],
    []
  );

  const onSubmit = async (q?: string) => {
    const msg = (q ?? message).trim();
    if (!msg) return;

    setLoading(true);
    setError(null);

    try {
      // ✅ axios POST đúng cú pháp
      const res = await axiosInstance.post<ApiResponse>(
        "/api/chatai/mini-stats",
        {
          message: msg,
        }
      );

      const p = res.data?.data?.text ?? null;
      if (p?.kind === "MINI_STATS_TABLE") {
        setPayload(p);
      } else {
        setPayload(null);
      }
    } catch (e: any) {
      setPayload(null);
      setError(e?.response?.data?.error || e?.message || "Gọi API thất bại.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="space-y-4 h-screen">
      {/* Chat input */}
      <div className="rounded-2xl border bg-white p-4 shadow-sm">
        <div className="flex flex-col gap-3 sm:flex-row sm:items-center">
          <input
            value={message}
            onChange={(e) => setMessage(e.target.value)}
            placeholder="Nhập câu hỏi... ví dụ: Tổng quan hôm nay / Phòng 401 đang có ai ở?"
            className="w-[90%] rounded-xl border px-4 py-3 outline-none focus:ring-2 focus:ring-black/10"
          />

          <button
            onClick={() => onSubmit()}
            disabled={loading || !message.trim()}
            className="rounded-xl bg-black px-5 py-3 text-white disabled:opacity-50"
          >
            {loading ? "Đang xử lý..." : "Gửi"}
          </button>
        </div>
        <div className="mt-3">
          <h1 className="text-base font-bold mx-2">những mẫu gợi ý cho bạn</h1>
          {/* Quick buttons */}
          <div className="mt-1 flex flex-wrap gap-2">
            {quickQuestions.map((q) => (
              <button
                key={q}
                onClick={() => {
                  setMessage(q);
                  onSubmit(q);
                }}
                className="rounded-full border px-3 py-1.5 text-sm hover:bg-gray-50"
                disabled={loading}
              >
                {q}
              </button>
            ))}
          </div>
        </div>

        {error && (
          <div className="mt-3 rounded-xl bg-red-50 px-4 py-3 text-sm text-red-700">
            {error}
          </div>
        )}
      </div>

      {/* Result */}
      {payload ? <MiniStatsDashboard payload={payload} /> : null}
    </div>
  );
}

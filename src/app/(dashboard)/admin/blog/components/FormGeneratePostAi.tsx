"use client";
import React, { useState } from "react";
import Modal from "react-modal";
import { PostData } from "../add/page";
import axios from "axios";
import { URL_API } from "@/lib/fetcher";
import { Button } from "@/components/ui/button";
import AiLoadingOverlay from "./AiLoadingOverlay";

interface PostProps {
  setPostData: React.Dispatch<React.SetStateAction<PostData>>;
}

Modal.setAppElement("#root");

const FormGeneratePostAi = ({ setPostData }: PostProps) => {
  const [isOpen, setIsOpen] = useState(false);
  const [topic, setTopic] = useState("");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const handleGenerate = async () => {
    if (!topic.trim()) {
      setError("Vui lòng nhập topic");
      return;
    }

    setLoading(true);
    setError(null);

    try {
      const res = await axios.post(`${URL_API}/api/chatai/generate-post`, {
        topic,
      });

      if (res.data) {
        setPostData(res.data.data);

        setTopic("");

        // 🔥 Hiện overlay loading trong 3s rồi mới đóng modal
        setTimeout(() => {
          setIsOpen(false);
        }, 3000);
      }
    } catch (err) {
      setError(err instanceof Error ? err.message : "An error occurred");
    } finally {
      // Giữ overlay hiển thị thêm 3 giây trước khi tắt hẳn
      setTimeout(() => {
        setLoading(false);
      }, 3000);
    }
  };

  const handleKeyPress = (e: React.KeyboardEvent) => {
    if (e.key === "Enter" && !loading) {
      handleGenerate();
    }
  };

  return (
    <div>
      <Button onClick={() => setIsOpen(true)}>Tạo Bài Viết Bằng Ai</Button>

      {/* ✅ Chỉ hiển thị Modal khi KHÔNG loading */}
      {!loading && (
        <Modal
          isOpen={isOpen}
          onRequestClose={() => setIsOpen(false)}
          className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 bg-white p-8 rounded-lg shadow-lg w-2xl"
          overlayClassName="fixed inset-0 bg-black/30 bg-opacity-50"
        >
          <div className="mb-4">
            <p className="text-base text-gray-500 font-semibold mb-1">
              Hướng dẫn:
            </p>
            <ul className="text-sm text-gray-600 list-disc list-inside">
              <li>Nhập tên địa điểm, chủ đề hoặc ý tưởng cho bài viết blog.</li>
              <li>
                Sử dụng từ khóa chính, ví dụ: &quot;danang – Thiên đường du lịch
                miền Trung&quot;.
              </li>
              <li>
                Hoặc các chủ đề ngắn gọn như: &quot;tên hình ảnh - nội dung
                promt bài viết&quot;.
              </li>
            </ul>
          </div>

          <div className="mb-4">
            <p className="text-base text-red-500 font-semibold mb-1">Lưu ý:</p>
            <ul className="text-sm text-gray-600 list-disc list-inside">
              <li>Chọn từ khóa chính hoặc địa danh nổi bật.</li>
              <li>Tránh nhập quá dài hoặc ký tự đặc biệt.</li>
              <li>có thể gây lỗi mất ảnh ngoài ý muốn.</li>
            </ul>
          </div>

          <div className="grid gap-4 py-4">
            <div className="grid gap-2">
              <textarea
                rows={6}
                placeholder="Ví dụ: cầu rồng - Khám phá thành phố đáng sống"
                value={topic}
                onChange={(e) => setTopic(e.target.value)}
                className="py-10 px-2 border"
              />
            </div>
            {error && <p className="text-sm text-red-500">{error}</p>}
          </div>

          <Button
            onClick={handleGenerate}
            disabled={loading}
            className="w-full"
            onKeyDown={handleKeyPress}
          >
            {loading ? "🔄 Đang tạo..." : "✨ Tạo bài viết bằng AI"}
          </Button>
        </Modal>
      )}

      {/* ✅ Overlay hiển thị khi đang loading */}
      {loading && <AiLoadingOverlay loading={loading} />}
    </div>
  );
};

export default FormGeneratePostAi;

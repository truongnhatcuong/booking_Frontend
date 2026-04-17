"use client";
import React, { useState } from "react";
import Modal from "react-modal";
import { PostData } from "../add/page";
import axios from "axios";
import { URL_API } from "@/lib/fetcher";
import { Button } from "@/components/ui/button";
import AiLoadingOverlay from "./AiLoadingOverlay";
import axiosInstance from "@/lib/axios";

interface PostProps {
  setPostData: React.Dispatch<React.SetStateAction<PostData>>;
}

Modal.setAppElement("#root");

const UNSPLASH_KEY = "SbfhmV7iVU5kw8YQRh0p7cwiMdKmWvgSuPj-l_j5bvk";

const FormGeneratePostAi = ({ setPostData }: PostProps) => {
  const [isOpen, setIsOpen] = useState(false);
  const [topic, setTopic] = useState("");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  // Kiểm tra ảnh
  const [checkKeyword, setCheckKeyword] = useState("");
  const [checkImages, setCheckImages] = useState<string[]>([]);
  const [checkLoading, setCheckLoading] = useState(false);

  const handleCheckImages = async () => {
    if (!checkKeyword.trim()) return;
    setCheckLoading(true);
    setCheckImages([]);
    try {
      const res = await axios.get(
        `https://api.unsplash.com/search/photos?query=${checkKeyword}&client_id=${UNSPLASH_KEY}`,
      );
      const urls = res.data.results.map((img: any) => img.urls.small);
      setCheckImages(urls);
    } catch {
      setCheckImages([]);
    } finally {
      setCheckLoading(false);
    }
  };

  const handleGenerate = async () => {
    if (!topic.trim()) {
      setError("Vui lòng nhập topic");
      return;
    }
    setLoading(true);
    setError(null);
    try {
      const res = await axiosInstance.post(`/api/chatai/generate-post`, {
        topic,
      });
      if (res.data) {
        setPostData(res.data.data);
        setTopic("");
        setTimeout(() => setIsOpen(false), 3000);
      }
    } catch (err) {
      setError(err instanceof Error ? err.message : "An error occurred");
    } finally {
      setTimeout(() => setLoading(false), 3000);
    }
  };

  const handleKeyPress = (e: React.KeyboardEvent) => {
    if (e.key === "Enter" && !loading) handleGenerate();
  };

  return (
    <div>
      <Button onClick={() => setIsOpen(true)}>Tạo Bài Viết Bằng Ai</Button>

      {!loading && (
        <Modal
          isOpen={isOpen}
          onRequestClose={() => setIsOpen(false)}
          className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 bg-white p-8 rounded-lg shadow-lg w-4xl max-h-[90vh] overflow-y-auto"
          overlayClassName="fixed inset-0 bg-black/30 bg-opacity-50"
        >
          {/* Hướng dẫn */}
          <div className="mb-4">
            <p className="text-base text-gray-500 font-semibold mb-1">
              Hướng dẫn:
            </p>
            <ul className="text-sm text-gray-600 list-disc list-inside">
              <li>
                Format:{" "}
                <em>từ khóa ảnh | nội dung bài viết | số thứ tự ảnh bìa</em>
              </li>
              <li>
                Ví dụ: <em>cầu rồng | Khám phá Đà Nẵng về đêm | 2</em> → dùng
                ảnh thứ 3 làm bìa
              </li>
              <li>Bỏ qua số thứ tự → mặc định dùng ảnh đầu tiên</li>
            </ul>
          </div>

          {/* Lưu ý */}
          <div className="mb-4">
            <p className="text-base text-red-500 font-semibold mb-1">Lưu ý:</p>
            <ul className="text-sm text-gray-600 list-disc list-inside">
              <li>Chọn từ khóa chính hoặc địa danh nổi bật.</li>
              <li>Tránh nhập quá dài hoặc ký tự đặc biệt.</li>
              <li>có thể gây lỗi mất ảnh ngoài ý muốn.</li>
            </ul>
          </div>

          {/* Kiểm tra ảnh */}
          <div className="mb-4 border-t pt-4">
            <p className="text-base text-gray-500 font-semibold mb-2">
              Kiểm tra ảnh theo từ khóa:
            </p>
            <div className="flex gap-2 mb-3">
              <input
                type="text"
                placeholder="Nhập từ khóa để xem ảnh..."
                value={checkKeyword}
                onChange={(e) => setCheckKeyword(e.target.value)}
                onKeyDown={(e) => e.key === "Enter" && handleCheckImages()}
                className="flex-1 px-3 py-1.5 border rounded-md text-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
              />
              <Button
                type="button"
                variant="outline"
                size="sm"
                onClick={handleCheckImages}
                disabled={checkLoading}
              >
                {checkLoading ? "Đang tải..." : "Kiểm tra"}
              </Button>
            </div>

            {checkImages.length > 0 && (
              <div className="grid grid-cols-4 gap-2 max-h-44 overflow-y-auto">
                {checkImages.map((url, idx) => (
                  <img
                    key={idx}
                    src={url}
                    alt={`img-${idx}`}
                    className="w-full h-20 object-cover rounded-md border"
                    onError={(e) => {
                      (e.target as HTMLImageElement).style.display = "none";
                    }}
                  />
                ))}
              </div>
            )}

            {checkImages.length === 0 && !checkLoading && checkKeyword && (
              <p className="text-sm text-red-400">Không tìm thấy ảnh</p>
            )}
          </div>

          {/* Topic input */}
          <div className="grid gap-4 py-4 border-t">
            <div className="grid gap-2">
              <textarea
                rows={6}
                placeholder="Ví dụ: cầu rồng | Khám phá vẻ đẹp biểu tượng Đà Nẵng về đêm"
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

      {loading && <AiLoadingOverlay loading={loading} />}
    </div>
  );
};

export default FormGeneratePostAi;

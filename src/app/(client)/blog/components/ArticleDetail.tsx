"use client";
import React from "react";
import Image from "next/image";
import useSWR from "swr";
import { formatDate } from "@/lib/formatDate";

interface Props {
  slug: string;
}
interface Article {
  id: string;
  title: string;
  publishedAt: string;
  content: string;
  coverImage: string;
  summary: string;
}

const ArticleDetail = ({ slug }: Props) => {
  const { data: article, isLoading } = useSWR<Article>(`/api/blog/${slug}`);
  if (isLoading) {
    <div>loading.....</div>;
  }

  if (!article)
    return <div className="text-center py-8">Bài viết không tồn tại</div>;

  // Hàm tạo HTML từ chuỗi content
  const createMarkup = () => {
    return { __html: article.content };
  };

  return (
    <div className="max-w-6xl mx-auto px-4 py-8">
      {/* Tiêu đề và thời gian */}
      <div className="mb-8">
        <h1 className="text-3xl md:text-4xl font-bold mb-4">{article.title}</h1>
        <p className="text-gray-500">
          Đăng ngày: {formatDate(article.publishedAt)}
        </p>
      </div>

      {/* Hình ảnh cover */}

      {article.coverImage && (
        <div className="relative h-64 md:h-96 w-full mb-8 rounded-lg overflow-hidden">
          <Image
            src={article.coverImage}
            alt={article.title}
            fill
            className="object-cover"
            sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
            priority
          />
        </div>
      )}

      {/* Tóm tắt */}
      <div className="mb-8 p-4 bg-gray-50 rounded-lg">
        <p className="italic text-gray-700">{article.summary}</p>
      </div>

      {/* Nội dung bài viết */}
      <div
        className="prose max-w-none prose-lg"
        dangerouslySetInnerHTML={createMarkup()}
      />
    </div>
  );
};

export default ArticleDetail;

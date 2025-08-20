"use client";
import React from "react";
import useSWR from "swr";
import CardBlog from "./components/CardBlog";

export interface Article {
  id: string;
  title: string;
  slug: string;
  summary: string;
  content: string;
  coverImage: string;
  published: boolean;
  publishedAt: string;
}

const Page = () => {
  const { data, isLoading } = useSWR(`/api/blog`);
  if (isLoading) {
    <div>loading.....</div>;
  }
  return (
    <div className="mt-5 text-center">
      <div className="inline-flex flex-col gap-3 mb-4 group ">
        <div className="flex items-center gap-2">
          <span className="inline-block text-xs font-semibold uppercase tracking-widest text-sky-500/90 bg-sky-100 dark:bg-sky-900/30 px-3 py-1.5 rounded-full">
            Blog • Tin tức & ưu đãi
          </span>
          <span className="h-2 w-2 bg-sky-400 rounded-full animate-pulse"></span>
        </div>

        <h1 className="relative w-fit text-4xl md:text-5xl  font-bold text-slate-800 dark:text-white tracking-tight">
          Bài Viết Của Khách Sạn
          <span className="absolute -bottom-3 left-0 h-1.5 w-full rounded-full bg-gradient-to-r from-sky-400 via-blue-500 to-indigo-600 transition-all duration-500 group-hover:w-4/5 group-hover:opacity-80"></span>
          <span className="absolute -bottom-3 left-0 h-1.5 w-1/3 rounded-full bg-gradient-to-r from-transparent via-white to-transparent opacity-70 blur-sm"></span>
        </h1>

        <p className="text-slate-600 dark:text-slate-300 mt-4 max-w-lg text-sm md:text-base">
          Khám phá những tin tức mới nhất và ưu đãi đặc biệt từ khách sạn chúng
          tôi
        </p>
      </div>

      <CardBlog data={data || []} />
    </div>
  );
};

export default Page;

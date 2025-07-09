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
    <div className="mt-14">
      <CardBlog data={data || []} />
    </div>
  );
};

export default Page;

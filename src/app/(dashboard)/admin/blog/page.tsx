"use client";
import React from "react";
import TableBlog from "./components/TableBlog";
import useSWR from "swr";

const page = () => {
  const { data, isLoading } = useSWR(`/api/blog/employee`);
  if (isLoading) return <>...</>;
  return (
    <div>
      <TableBlog posts={data || []} />
    </div>
  );
};

export default page;

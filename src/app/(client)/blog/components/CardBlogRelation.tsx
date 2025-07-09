"use client";
import React from "react";
import { Card, CardHeader, CardTitle, CardContent } from "@/components/ui/card";

import Image from "next/image";

import { Article } from "../page";
import Link from "next/link";

interface CardBlogProps {
  data: Article[];
  slug: string;
}
const CardBlogRelation = ({ data, slug }: CardBlogProps) => {
  return (
    <div className="space-x-3.5">
      {data
        .filter((item) => item.slug !== slug)
        .map((item) => (
          <Link
            key={item.id}
            className="w-full max-w-md"
            href={`/blog/${item.slug}`}
          >
            <Card className=" rounded-4xl  overflow-hidden shadow-lg hover:shadow-xl transition-shadow duration-300 ">
              {/* Phần hình ảnh */}
              <div className="flex ">
                <Image
                  src={item.coverImage || "/image"}
                  alt={item.coverImage || "lỗi"}
                  width={200}
                  height={200}
                  className="object-cover w-1/2"
                />

                <div className="w-1/2">
                  <CardHeader>
                    <CardTitle className="text-lg font-semibold line-clamp-2">
                      {item.title}
                    </CardTitle>
                  </CardHeader>
                  <CardContent>
                    <CardTitle>{item.summary.slice(0, 100)}</CardTitle>
                  </CardContent>
                </div>
              </div>
            </Card>
          </Link>
        ))}
    </div>
  );
};

export default CardBlogRelation;

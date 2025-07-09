import React from "react";
import { Card, CardHeader, CardTitle, CardFooter } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import Image from "next/image";
import { useRouter } from "next/navigation";
import { Article } from "../page";
interface CardBlogProps {
  data: Article[];
}

const CardBlog = ({ data }: CardBlogProps) => {
  const route = useRouter();
  return (
    <div className="grid md:grid-cols-4 container mx-auto gap-8">
      {data.map((item) => (
        <Card
          className="max-w-sm rounded-lg overflow-hidden shadow-lg hover:shadow-xl transition-shadow duration-300"
          key={item.id}
        >
          {/* Phần hình ảnh */}
          <div className="relative h-48 w-full">
            <Image
              src={item.coverImage || "/image"}
              alt={item.coverImage || "lỗi"}
              fill
              className="object-cover"
              sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
            />
          </div>

          {/* Phần nội dung */}
          <CardHeader>
            <CardTitle className="text-lg font-semibold line-clamp-2">
              {item.title}
            </CardTitle>
          </CardHeader>

          {/* Phần footer với nút xem thêm */}
          <CardFooter>
            <Button
              variant="outline"
              className="w-full cursor-pointer"
              onClick={() => route.push(`/blog/${item.slug}`)}
            >
              Xem thêm
            </Button>
          </CardFooter>
        </Card>
      ))}
    </div>
  );
};

export default CardBlog;

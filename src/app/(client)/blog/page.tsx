"use server";
import React from "react";
import CardBlog from "./components/CardBlog";
import MainArticle from "./components/MainArticle";
import CardBlogSub from "./components/CardBlogSub";
import axiosInstance from "@/lib/axios";

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

const PageBlog = async () => {
  // const { data, isLoading } = useSWR<Article[]>(`/api/blog`);

  // const sliceData = data?.slice(1, 5);

  // if (isLoading) {
  //   <div>loading.....</div>;
  // }
  const data = await axiosInstance
    .get<Article[]>("/api/blog")
    .then((res) => res.data);
  return (
    <div className="w-full">
      <div className="relative h-screen px-4 text-center  bg-[url(/image/bgNews.png)] bg-no-repeat bg-cover bg-center">
        <div className="absolute inset-0 bg-black/60"></div>
        <div className="flex justify-center items-center text-center h-full">
          <div className="relative max-w-4xl mx-auto">
            <h1 className="text-4xl md:text-6xl font-bold text-white mb-6 text-balance ">
              Khám Phá Thế Giới
              <span className="block text-transparent bg-clip-text bg-linear-to-r from-blue-400 to-green-600">
                Blogs
              </span>
            </h1>
            <p className="text-xl text-blue-100 mb-8 max-w-2xl mx-auto text-pretty">
              Chia sẻ kiến thức, kinh nghiệm và những xu hướng mới nhất trong du
              lịch khách sạn
            </p>
          </div>
        </div>
      </div>
      <section className="py-16 px-4 md:px-10 bg-white ">
        <div className="">
          <div className="text-center mb-12">
            <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">
              Bài Viết Mới Nhất
            </h2>
            <p className="text-gray-600 text-lg max-w-2xl mx-auto">
              Cập nhật những kiến thức và xu hướng mới nhất trong những chuyến
              du lịch
            </p>
          </div>
          <div className="">
            {data && data.length > 0 && (
              <div className="grid grid-cols-1 xl:grid-cols-3 lg:gap-5 ">
                <div className="col-span-2 mb-5">
                  <MainArticle article={data[0]} />
                </div>
                <div className="flex flex-col gap-10 ">
                  {data.slice(1, 5).map((item, index) => (
                    <CardBlogSub article={item} key={index} />
                  ))}
                </div>
              </div>
            )}
          </div>
        </div>
      </section>
      <div className="py-10   mx-4 lg:mx-10 ">
        <div className="flex flex-col md:flex-row text-center md:text-start justify-between mb-5">
          {" "}
          <h1 className="text-red-500 text-3xl font-bold uppercase">
            Bài Báo Liên Quan
          </h1>
          <p className="text-sm lg:text-base text-gray-700 leading-relaxed lg:max-w-[600px] text-center lg:text-right">
            Khám phá xu hướng du lịch đang định hình tương lai Du lịch 2025
            Những trào lưu bạn không thể bỏ lỡ Xu hướng dịch chuyển mới
          </p>
        </div>
        <CardBlog data={data || []} />
      </div>
    </div>
  );
};

export default PageBlog;

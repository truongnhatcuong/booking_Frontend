"use client";
import React, { useEffect } from "react";
import "swiper/css";
import "swiper/css/effect-coverflow";
import "swiper/css/pagination";
import { EffectCoverflow, Pagination } from "swiper/modules";
import { Swiper, SwiperSlide } from "swiper/react";
import { Button } from "@/components/ui/button";
import Image from "next/image";
import axios from "axios";

interface Highlight {
  id: number;
  title: string;
  description: string;
  image: string;
  icon: string;
  features: string[];
}

const HotelHighlightsCarousel = () => {
  const range = "Trang tính2!A2:H6"; // Phạm vi dữ liệu bạn muốn lấy
  const sheetId = process.env.NEXT_PUBLIC_GGSHEETID; // ID của Google Sheet từ .env
  const apiKey = process.env.NEXT_PUBLIC_API_GGSHEET; // API key của bạn từ .env
  const [highlights, setHighlights] = React.useState<Highlight[]>([]);
  useEffect(() => {
    // Chỉ gửi yêu cầu API một lần khi component mount

    const fetchData = async () => {
      try {
        const response = await axios.get(
          `https://sheets.googleapis.com/v4/spreadsheets/${sheetId}/values/${range}?key=${apiKey}`,
        );
        const transformedData = response.data.values.map(
          (row: Highlight[]) => ({
            id: row[0], // Giả sử cột A chứa ID
            title: row[1],
            description: row[2],
            image: row[3],
            icon: row[4],
            features: [row[5], row[6], row[7]].filter(Boolean), // Lọc bỏ các giá trị rỗng
          }),
        );
        setHighlights(transformedData);
      } catch (error) {
        console.error("Error fetching data from Google Sheets:", error);
      }
    };

    fetchData();
  }, []);

  return (
    <section className="py-15 bg-linear-to-br from-background to-muted bg-white mx-4 lg:mx-0">
      <div className=" ">
        <div className="text-center mb-12">
          <h2 className="text-4xl font-bold text-foreground mb-4 animate-fade-in-up">
            Tiện Nghi Đẳng Cấp
          </h2>
          <p className="text-lg text-muted-foreground max-w-2xl mx-auto animate-fade-in-up">
            Khám phá những tiện ích và dịch vụ cao cấp tại khách sạn của chúng
            tôi
          </p>
        </div>
        <Swiper
          effect={"coverflow"}
          grabCursor={true}
          centeredSlides={true}
          slidesPerView={"auto"}
          coverflowEffect={{
            rotate: 50,
            stretch: 0,
            depth: 100,
            modifier: 1,
            slideShadows: true,
          }}
          pagination={true}
          modules={[EffectCoverflow, Pagination]}
          className="mySwiper "
        >
          {highlights.map((highlight) => (
            <SwiperSlide key={highlight.id} className="relative  max-w-6xl">
              <div
                key={highlight.id}
                className=" w-screen md:w-full flex-shrink-0"
              >
                <div className="grid md:grid-cols-2 gap-4  ">
                  {/* Image section */}
                  <div className="relative overflow-hidden group h-80 lg:h-120 ">
                    <Image
                      width={1000}
                      height={1000}
                      src={highlight.image || "/placeholder.svg"}
                      alt={highlight.title}
                      className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110"
                    />
                    <div className="absolute inset-0 bg-linear-to-r from-primary/20 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
                  </div>

                  {/* Content section */}
                  <div className="  flex flex-col justify-center bg-card pb-8 px-4  ">
                    <div className="flex items-center gap-3 mb-6">
                      <div
                        className="text-2xl"
                        dangerouslySetInnerHTML={{ __html: highlight.icon }}
                      />

                      <h3 className="text-2xl md:text-3xl font-bold text-card-foreground animate-slide-in-right">
                        {highlight.title}
                      </h3>
                    </div>

                    <p className="text-muted-foreground text-lg mb-8 leading-relaxed animate-slide-in-right">
                      {highlight.description}
                    </p>

                    <div className="space-y-3 mb-8">
                      {highlight.features.map((feature, idx) => (
                        <div
                          key={idx}
                          className="flex items-center gap-3 animate-slide-in-right"
                        >
                          <div className="w-2 h-2 rounded-full bg-black" />
                          <span className="text-card-foreground">
                            {feature}
                          </span>
                        </div>
                      ))}
                    </div>

                    <Button className="self-start bg-primary hover:bg-primary/90 text-primary-foreground px-8 py-3 rounded-full transition-all duration-300 hover:shadow-lg hover:scale-105 relative overflow-hidden">
                      Tìm Hiểu Thêm
                    </Button>
                  </div>
                </div>
              </div>
            </SwiperSlide>
          ))}
        </Swiper>
      </div>
    </section>
  );
};

export default HotelHighlightsCarousel;

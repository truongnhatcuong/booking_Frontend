"use client";
import React, { useEffect, useState } from "react";
import { Navigation, Keyboard, Autoplay } from "swiper/modules";
import "swiper/css";
import "swiper/css/pagination";
import { Swiper, SwiperSlide } from "swiper/react";
import { HeroSection } from "../common/HeroSection";
import axios from "axios";
import Image from "next/image";

const Banner = () => {
  const range = "Trang tính1!A1:C3"; // Phạm vi dữ liệu bạn muốn lấy
  const sheetId = process.env.NEXT_PUBLIC_GGSHEETID; // ID của Google Sheet từ .env
  const apiKey = process.env.NEXT_PUBLIC_API_GGSHEET; // API key của bạn từ .env

  const [images, setImages] = useState([]); // Cập nhật state để chứa mảng ảnh

  useEffect(() => {
    // Chỉ gửi yêu cầu API một lần khi component mount

    const fetchData = async () => {
      try {
        const response = await axios.get(
          `https://sheets.googleapis.com/v4/spreadsheets/${sheetId}/values/${range}?key=${apiKey}`,
        );
        setImages(response.data.values[0]);
      } catch (error) {
        console.error("Error fetching data from Google Sheets:", error);
      }
    };

    fetchData();
  }, []); // Chạy khi component mount (chỉ một lần)

  return (
    <Swiper
      keyboard={true}
      autoplay={{
        delay: 5000,
        disableOnInteraction: false,
      }}
      modules={[Navigation, Keyboard, Autoplay]}
      className="mySwiper w-screen h-[50%] lg:w-full "
    >
      {images.length > 0 ? (
        images.map((image, index) => (
          <SwiperSlide key={index}>
            {/* Đối với slide đầu tiên, sử dụng HeroSection */}
            {index === 0 ? (
              <HeroSection
                backgroundImage={image} // Sử dụng dữ liệu từ Google Sheets
                title="DTU HOTEL"
                description="Xin kính chào quý khách đến với DTU HOTEL - Nơi trải nghiệm đỉnh cao của sự sang trọng và tiện nghi giữa lòng thành phố sôi động. Hãy để chúng tôi chăm sóc bạn với dịch vụ hoàn hảo và không gian nghỉ dưỡng đẳng cấp."
                className="h-[50vh] xl:h-screen"
                variant="default"
              />
            ) : (
              <div className="relative h-[50vh] lg:h-screen w-full">
                <Image
                  src={image}
                  alt={`Banner ${index + 1}`}
                  fill
                  className="object-cover"
                />
              </div>
            )}
          </SwiperSlide>
        ))
      ) : (
        <div>Loading...</div> // Hiển thị "Loading" khi dữ liệu chưa được tải xong
      )}
    </Swiper>
  );
};

export default Banner;

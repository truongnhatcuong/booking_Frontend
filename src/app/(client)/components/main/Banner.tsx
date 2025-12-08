"use client";
import React from "react";
import { Navigation, Keyboard, Autoplay } from "swiper/modules";
import "swiper/css";
import "swiper/css/pagination";
import { Swiper, SwiperSlide } from "swiper/react";
import { HeroSection } from "../common/HeroSection";
import Image from "next/image";

const Banner = () => {
  return (
    <Swiper
      keyboard={true}
      autoplay={{
        delay: 5000,
        disableOnInteraction: false,
      }}
      modules={[Navigation, Keyboard, Autoplay]}
      className="mySwiper w-screen  h-[50%] lg:w-full xl:h-screen"
    >
      <SwiperSlide>
        <HeroSection
          backgroundImage="/image/banner1.jpg"
          title="DTU HOTEL"
          description="Xin kính chào quý khách đến với DTU HOTEL - Nơi trải nghiệm đỉnh cao của sự sang trọng và tiện nghi giữa lòng thành phố sôi động. Hãy để chúng tôi chăm sóc bạn với dịch vụ hoàn hảo và không gian nghỉ dưỡng đẳng cấp."
          className="h-[50vh] lg:h-screen"
          variant="default"
        />
      </SwiperSlide>

      <SwiperSlide>
        <div className="relative h-[50vh] lg:h-screen w-full">
          <Image
            src="/image/banner2.jpg"
            alt="Banner 2"
            fill
            className="object-cover"
          />
        </div>
      </SwiperSlide>

      <SwiperSlide>
        <div className="relative h-[50vh] lg:h-screen w-full">
          <Image
            src="/image/banner3.jpg"
            alt="Banner 3"
            fill
            className="object-cover"
          />
        </div>
      </SwiperSlide>
    </Swiper>
  );
};

export default Banner;

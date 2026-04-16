"use client";
import React from "react";
import useSWR from "swr";
import BookingDetails from "../components/UserBooking";
import { Swiper, SwiperSlide } from "swiper/react";
import { EffectFade, Navigation, Pagination } from "swiper/modules";
import "swiper/css";
import "swiper/css/effect-fade";
import "swiper/css/navigation";
import "swiper/css/pagination";
import { Booking } from "../components/profileBooking";

const Page = () => {
  const { data, isLoading } = useSWR(`/api/booking/bookingUser`);

  return (
    <>
      <Swiper
        spaceBetween={30}
        effect={"fade"}
        pagination={{ clickable: true }}
        fadeEffect={{ crossFade: true }}
        allowTouchMove={true} // 👈 quan trọng với fade
        navigation={true} // 👈 Bật mũi tên điều hướng
        modules={[EffectFade, Navigation, Pagination]}
        className="mySwiper"
      >
        {isLoading ? (
          <div className="text-center flex justify-center">Loading...</div>
        ) : data && data?.data?.length > 0 ? (
          <>
            {data?.data.map((item: Booking, index: number) => (
              <SwiperSlide key={index} className="w-full h-screen">
                <BookingDetails booking={item} />
              </SwiperSlide>
            ))}
          </>
        ) : (
          <>
            <SwiperSlide className="mt-10">
              <div className="flex items-center justify-center h-full">
                <p className="text-gray-500">hiện tại chưa có đơn đặt phòng</p>
              </div>
            </SwiperSlide>
          </>
        )}
      </Swiper>
    </>
  );
};

export default Page;

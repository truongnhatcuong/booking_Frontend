"use client";
import React from "react";
import useSWRInfinite from "swr/infinite";
import BookingDetails from "../components/UserBooking";
import { Swiper, SwiperSlide } from "swiper/react";
import { EffectCards, Navigation, Pagination } from "swiper/modules";
import "swiper/css";
import "swiper/css/effect-cards";
import "swiper/css/navigation";
import "swiper/css/pagination";
import { Booking } from "../components/profileBooking";
import { URL_API } from "@/lib/fetcher";

const getKey = (pageIndex: number, previousPageData: any) => {
  if (
    previousPageData &&
    (!previousPageData.data || previousPageData.data.length === 0)
  ) {
    return null;
  }
  return `${URL_API}/api/booking/bookingUser?page=${pageIndex + 1}&limit=5`;
};

const Page = () => {
  const { data, isLoading, size, setSize, isValidating } =
    useSWRInfinite(getKey);

  const bookings: Booking[] = data
    ? data.flatMap((page) => page.data || [])
    : [];

  const handleReachEnd = () => {
    setSize(size + 1);
  };

  if (isLoading && bookings.length === 0) {
    return (
      <div className="flex items-center justify-center h-screen">
        <div className="w-6 h-6 border-2 border-blue-600 border-t-transparent rounded-full animate-spin" />
      </div>
    );
  }

  if (!isLoading && bookings.length === 0) {
    return (
      <div className="flex flex-col items-center justify-center h-screen gap-3 text-gray-400">
        <svg
          width="48"
          height="48"
          viewBox="0 0 24 24"
          fill="none"
          stroke="currentColor"
          strokeWidth="1.5"
        >
          <rect x="3" y="4" width="18" height="18" rx="2" />
          <path d="M16 2v4M8 2v4M3 10h18" />
        </svg>
        <p className="text-sm">Hiện tại chưa có đơn đặt phòng nào</p>
      </div>
    );
  }

  return (
    <div className="flex items-center justify-center bg-gray-50 px-4">
      <Swiper
        effect="cards"
        grabCursor={true}
        modules={[EffectCards, Navigation, Pagination]}
        navigation={true}
        pagination={{ clickable: true }}
        onReachEnd={handleReachEnd}
        className="w-full max-w-6xl"
      >
        {bookings.map((item: Booking, index: number) => (
          <SwiperSlide
            key={item.id || index}
            className="rounded-2xl overflow-y-auto bg-white"
            style={{ maxHeight: "85vh" }}
          >
            <BookingDetails booking={item} />
          </SwiperSlide>
        ))}

        {isValidating && size > 1 && (
          <SwiperSlide className="rounded-2xl bg-white flex items-center justify-center">
            <div className="flex flex-col items-center gap-3 text-gray-400">
              <div className="w-6 h-6 border-2 border-blue-500 border-t-transparent rounded-full animate-spin" />
              <p className="text-sm">Đang tải thêm...</p>
            </div>
          </SwiperSlide>
        )}
      </Swiper>
    </div>
  );
};

export default Page;

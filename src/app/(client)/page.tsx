"use client"; // Marks this file as a Client Component

import React from "react";
import dynamic from "next/dynamic";

const DynamicComponentWithNoSSR = dynamic(
  () => import("./components/main/HotelMap"),
  { ssr: false },
);

import BeanHotel from "./components/main/BeanHotel";
import Banner from "./components/main/Banner";
import HotelShow from "./components/main/HotelShow";
import ShearchRoomPage from "./components/main/SearchRoom";
import ChatBoxAL from "./components/main/ChatBoxAl";
import HotelHighlightsCarousel from "./components/main/Hotel-Highlights";
import ChatBox from "./components/main/ChatBox";
import RoomTypeShowcase from "./components/main/RoomTypeShowcase";
import Footer2 from "./components/footer/foorter2";
import TestimonialCarousel from "./components/common/CustomerReviewed";

const Page = () => {
  return (
    <div className="">
      {" "}
      <Banner />
      <ShearchRoomPage />
      <BeanHotel />
      <RoomTypeShowcase />
      <HotelShow />
      <HotelHighlightsCarousel />
      <ChatBoxAL />
      <ChatBox />
      <DynamicComponentWithNoSSR />
      <TestimonialCarousel />
      <Footer2 />
    </div>
  );
};

export default Page;

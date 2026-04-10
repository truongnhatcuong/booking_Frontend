import React from "react";
import BeanHotel from "./components/main/BeanHotel";
import HotelShow from "./components/main/HotelShow";
import ShearchRoomPage from "./components/main/SearchRoom";
import ChatBoxAL from "./components/main/ChatBoxAl";
import ChatBox from "./components/main/ChatBox";
import RoomTypeShowcase from "./components/main/RoomTypeShowcase";
import Footer2 from "./components/footer/foorter2";
import TestimonialCarousel from "./components/common/CustomerReviewed";
import BannerServer from "./components/main/fetchBannerImages";
import HotelMapWrapper from "./components/main/HotelMapWrapper";
import HotelHighlightsServer from "./components/main/HotelHighlightsServer";

const Page = () => {
  return (
    <div className="">
      {" "}
      <BannerServer />
      <ShearchRoomPage />
      <BeanHotel />
      <RoomTypeShowcase />
      <HotelShow />
      <HotelHighlightsServer />
      <ChatBoxAL />
      <ChatBox />
      <HotelMapWrapper />
      <TestimonialCarousel />
      <Footer2 />
      {/* Thêm VoiceAssistant vào đây, nó sẽ hiển thị nút mic ở góc dưới bên phải */}
    </div>
  );
};

export default Page;

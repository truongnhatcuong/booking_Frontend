import React from "react";

import BeanHotel from "./components/header/BeanHotel";
import Banner from "./components/main/Banner";
import RoomShow from "./components/main/RoomShow";
import HotelShow from "./components/main/HotelShow";
import ShearchRoomPage from "./components/main/SearchRoom";
import CozeChat from "./components/main/ChatBoxAl";

const page = () => {
  return (
    <div className="">
      {" "}
      <Banner />
      <ShearchRoomPage />
      <BeanHotel />
      <RoomShow />
      <HotelShow />
      <CozeChat />
    </div>
  );
};

export default page;

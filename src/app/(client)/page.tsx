/* eslint-disable react-hooks/exhaustive-deps */
"use client";
import React, { useEffect } from "react";

import BeanHotel from "./components/header/BeanHotel";
import Banner from "./components/main/Banner";
import RoomShow from "./components/main/RoomShow";
import HotelShow from "./components/main/HotelShow";
import ShearchRoomPage from "./components/main/SearchRoom";
import { jwtDecode } from "jwt-decode";
import ChatBoxAL from "./components/main/ChatBoxAl";

const Page = () => {
  function isTokenEpire(token: string | null) {
    if (!token) return true;
    const decode: { exp: number } = jwtDecode(token);
    console.log("thời gian còn lại", decode.exp);

    return decode.exp * 1000 < Date.now();
  }

  function checkTokenAndRemove() {
    const token = localStorage.getItem("token");
    if (isTokenEpire(token)) {
      localStorage.removeItem("token");
      console.log("Token hết hạn → auto logout");
    } else {
      console.log("Token hợp lệ");
    }
  }

  useEffect(() => {
    checkTokenAndRemove();
  }, []);
  return (
    <div className="">
      {" "}
      <Banner />
      <ShearchRoomPage />
      <BeanHotel />
      <RoomShow />
      <HotelShow />
      <ChatBoxAL />
    </div>
  );
};

export default Page;

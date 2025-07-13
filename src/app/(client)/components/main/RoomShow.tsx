"use client";
import React, { useState } from "react";

import useSWR from "swr";
import { fetcher, URL_API } from "@/lib/fetcher";
import ListRoom, { RoomCustomer } from "./ListRoom";
import ButtonSeclectType from "./ButtonSeclectType";

const RoomShow = () => {
  const [typeRoom, setTypeRoom] = useState("");
  const { data, isLoading } = useSWR<RoomCustomer[]>(
    `${URL_API}/api/room/customer?roomType=${typeRoom}`,
    fetcher
  );

  if (!data || isLoading) return <div>Đang tải dữ liệu...</div>;

  return (
    <div className="space-y-8 text-center pt-9">
      {/* Phòng Đơn */}
      <div>
        <ButtonSeclectType setTypeRoom={setTypeRoom} />
        <div className="text-5xl font-semibold regular mt-6">{typeRoom}</div>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 ">
          {data && data.length > 0 ? (
            data.map((room, index) => (
              <ListRoom roomtype={room} key={`single-${index}`} />
            ))
          ) : (
            <div>Phòng Không Có Sẵn</div>
          )}
        </div>
      </div>
    </div>
  );
};

export default RoomShow;

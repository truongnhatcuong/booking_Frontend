"use client";
import React, { useEffect, useState } from "react";

import { URL_API } from "@/lib/fetcher";
import ListRoom, { RoomCustomer } from "./ListRoom";
import ButtonSeclectType from "./ButtonSeclectType";
import axios from "axios";

const RoomShow = () => {
  const [typeRoom, setTypeRoom] = useState("");
  const [data, setData] = useState<RoomCustomer[]>([]);

  // const { data, isLoading } = useSWR<RoomCustomer[]>(
  //   `${URL_API}/api/room/customer?roomType=${typeRoom}`,
  //   fetcher
  // );
  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await axios.get(
          `${URL_API}/api/room/customer?roomType=${typeRoom ? typeRoom : ""}`
        );
        setData(response.data);
      } catch (error) {
        console.error("Error fetching room data:", error);
      }
    };

    fetchData();
  }, []);
  if (!data) return <div>Đang tải dữ liệu...</div>;

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
            <div className="">Phòng Không Có Sẵn</div>
          )}
        </div>
      </div>
    </div>
  );
};

export default RoomShow;

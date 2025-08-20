"use client";
import React, { useEffect, useState } from "react";

import { URL_API } from "@/lib/fetcher";
import ListRoom, { RoomCustomer } from "./ListRoom";
import ButtonSeclectType from "./ButtonSeclectType";
import axios from "axios";
import Link from "next/link";

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
  }, [typeRoom]);
  if (!data) return <div>Đang tải dữ liệu...</div>;

  return (
    <>
      {" "}
      <div className="py-6 text-2xl text-center my-4 uppercase roboto">
        Những chỗ nghỉ nổi bật được đề xuất cho quý khách
      </div>
      <div className="space-y-8 text-center ">
        {/* Phòng Đơn */}
        <div>
          <div className="flex justify-between items-center mb-5 mx-2">
            {" "}
            <ButtonSeclectType setTypeRoom={setTypeRoom} typeRoom={typeRoom} />
            {typeRoom && data.length > 0 && (
              <Link
                href={`/rooms/${data[0].roomTypeId}`}
                className="text-blue-600 font-semibold underline "
              >
                Xem thêm các phòng của ({typeRoom})
              </Link>
            )}
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 ">
            {data && data.length > 0 ? (
              data
                .slice(0, 4)
                .map((room, index) => (
                  <ListRoom roomtype={room} key={`single-${index}`} />
                ))
            ) : (
              <div className="">Phòng Không Có Sẵn</div>
            )}
          </div>
        </div>
      </div>
    </>
  );
};

export default RoomShow;

"use client";
import React, { useEffect, useRef, useState } from "react";
import SearchForm from "./SearchForm";
import RoomCard from "./RoomCard";
import axios from "axios";
import { URL_API } from "@/lib/fetcher";
import toast from "react-hot-toast";

const SearchRoomPage = () => {
  const [availableRooms, setAvailableRooms] = useState([]);
  const [loading, setLoading] = useState(true);

  const [searchParams, setSearchParams] = useState({
    checkInDate: "",
    checkOutDate: "",
    customer: 1,
    roomType: "",
  });
  const roomListRef = useRef<HTMLDivElement | null>(null);
  useEffect(() => {
    if (availableRooms.length > 0 && roomListRef.current) {
      roomListRef.current.scrollIntoView({ behavior: "smooth" });
    }
  }, [availableRooms]);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!searchParams.checkInDate || !searchParams.checkOutDate) {
      console.log("Thiếu ngày check-in hoặc check-out");
      toast.error(
        "Vui lòng chọn đầy đủ ngày nhận và ngày trả phòng trước khi tìm!"
      );
      return;
    }

    setLoading(true);

    try {
      const res = await axios.get(
        `${URL_API}/api/room/customer?customer=${searchParams.customer}&checkIn=${searchParams.checkInDate}&checkOut=${searchParams.checkOutDate}&roomType=${searchParams.roomType}`
      );
      if (res.data) {
        setAvailableRooms(res?.data || []);
        setLoading(false);
      }
    } catch (error) {
      console.log(error);
    } finally {
      setLoading(false);
    }
  };
  const handleReset = () => {
    setSearchParams({
      checkInDate: "",
      checkOutDate: "",
      customer: 1,
      roomType: "",
    });
    setAvailableRooms([]);
  };

  return (
    <div className="container mx-auto px-4 py-8">
      <h1 className="text-3xl font-bold text-gray-800 mb-6">Tìm phòng trống</h1>

      <SearchForm
        searchParams={searchParams}
        setSearchParams={setSearchParams}
        onSubmit={handleSubmit}
      />

      {!loading && (
        <div className="mt-8" ref={roomListRef}>
          {availableRooms.length > 0 ? (
            <>
              <div className="flex justify-between mx-8  items-center">
                <h2 className="text-xl font-semibold text-gray-700 mb-4">
                  Kết quả tìm kiếm ({availableRooms.length} phòng){" "}
                </h2>
                <button
                  onClick={handleReset}
                  className="bg-gray-200 hover:bg-gray-300 text-gray-700 px-4 py-2 mb-4  rounded shadow"
                >
                  Ẩn tìm kiếm
                </button>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                {availableRooms.map((room: any) => (
                  <RoomCard key={room?.id} room={room} />
                ))}
              </div>
            </>
          ) : (
            searchParams.checkInDate &&
            searchParams.checkOutDate && (
              <div className="text-center py-12">
                <p className="text-gray-600 text-lg">
                  Không tìm thấy phòng trống phù hợp
                </p>
              </div>
            )
          )}
        </div>
      )}
    </div>
  );
};

export default SearchRoomPage;

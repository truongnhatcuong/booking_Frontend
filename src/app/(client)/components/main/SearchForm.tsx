"use client";
import "react-datepicker/dist/react-datepicker.css";
import React, { useEffect, useState } from "react";
import useSWR from "swr";
import { URL_API } from "@/lib/fetcher";

interface IRoomType {
  id: string;
  name: string;
  maxOccupancy: number;
}

interface ISeearchForm {
  setSearchParams: (value: any) => void;
  searchParams: any;
  onSubmit: (e: React.FormEvent) => Promise<void>;
}
const SearchForm = ({
  searchParams,
  setSearchParams,
  onSubmit,
}: ISeearchForm) => {
  const { data: roomType } = useSWR(`${URL_API}/api/roomtype`);
  const [isSticky, setIsSticky] = useState(false);

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>
  ) => {
    const { name, value } = e.target;
    setSearchParams((prev: any) => ({
      ...prev,
      [name]: name === "customer" ? Number(value) : value,
    }));
  };

  useEffect(() => {
    const handleScroll = () => {
      if (window.innerWidth >= 768) {
        setIsSticky(window.scrollY > 1500);
      } else {
        setIsSticky(false);
      }
    };
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const selectedRoom = roomType?.find(
    (r: IRoomType) => r.id === searchParams.roomType
  );

  const maxOccupancy =
    selectedRoom?.maxOccupancy ||
    Math.max(...(roomType?.map((r: IRoomType) => r.maxOccupancy) || [1]));

  return (
    <div
      className={`max-w-4xl mx-auto my-8  bg-white rounded-lg shadow-md transition-all duration-300 
        ${
          isSticky
            ? "fixed -top-8 left-0 p-2 right-0 z-50 max-w-full  shadow-lg"
            : "p-6"
        }
      `}
    >
      <form
        className={`flex flex-col md:grid md:grid-cols-2 lg:grid-cols-4 gap-4 ${
          isSticky ? "text-sm" : ""
        }`}
        onSubmit={onSubmit}
      >
        <div className="flex flex-col">
          {!isSticky && (
            <label
              htmlFor="checkInDate"
              className="mb-2 font-medium text-gray-700"
            >
              Ngày nhận phòng
            </label>
          )}
          <input
            type="date"
            id="checkInDate"
            name="checkInDate"
            value={searchParams.checkInDate}
            onChange={handleChange}
            required
            className="p-3 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
            min={new Date().toISOString().split("T")[0]}
          />
        </div>

        <div className="flex flex-col">
          {!isSticky && (
            <label
              htmlFor="checkOutDate"
              className="mb-2 font-medium text-gray-700"
            >
              Ngày trả phòng
            </label>
          )}
          <input
            type="date"
            id="checkOutDate"
            name="checkOutDate"
            value={searchParams.checkOutDate}
            onChange={handleChange}
            disabled={!searchParams.checkInDate}
            min={searchParams.checkInDate}
            required
            className="p-3 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
          />
        </div>

        <div className="flex flex-col">
          {!isSticky && (
            <label
              htmlFor="customer"
              className="mb-2 font-medium text-gray-700"
            >
              Số Khách
            </label>
          )}
          <select
            id="customer"
            name="customer"
            value={searchParams.customer}
            onChange={handleChange}
            className="p-3 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
          >
            {[...Array(maxOccupancy)].map((_, i) => (
              <option key={i + 1} value={i + 1}>
                {i + 1} khách
              </option>
            ))}
          </select>
        </div>

        <div className="flex flex-col">
          {!isSticky && (
            <label
              htmlFor="roomType"
              className="mb-2 font-medium text-gray-700"
            >
              Loại phòng
            </label>
          )}
          <select
            id="roomType"
            name="roomType"
            value={searchParams.roomType}
            onChange={handleChange}
            className="p-3 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
          >
            <option value="">Tất cả</option>
            {roomType?.map((item: IRoomType) => (
              <option value={item.name} key={item.id}>
                {item.name}
              </option>
            ))}
          </select>
        </div>

        <button className="col-span-1 md:col-span-2 lg:col-span-4 bg-blue-600 hover:bg-blue-700 text-white font-medium py-3 px-4 rounded-md transition duration-200">
          Tìm phòng trống
        </button>
      </form>
    </div>
  );
};

export default SearchForm;

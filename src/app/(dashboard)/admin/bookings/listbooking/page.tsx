"use client";
import React, { useState, useMemo } from "react";

import { Filter } from "lucide-react";
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
import useSWR from "swr";

import { fetcher } from "@/lib/fetcher";
import TableListBooking, { IBooking } from "./components/TableListBooking";

const API_URL = process.env.NEXT_PUBLIC_URL_API;

const BookingManagementForm = () => {
  const [selectedRange, setSelectedRange] = useState<string>("");
  const [isNumber, setIsNumber] = useState<number | string>("");
  const { data, error } = useSWR<{ bookings: IBooking[] }>(
    `${API_URL}/api/booking?idNumber=${isNumber}`,
    fetcher
  );
  const filterBooking = useMemo(() => {
    if (!data?.bookings) return [];
    if (selectedRange === "") {
      return data.bookings;
    }
    if (selectedRange) {
      return data.bookings.filter(
        (booking) => booking.status === selectedRange
      );
    }
  }, [data, selectedRange]);

  return (
    <div className="container mx-auto p-6">
      <h2 className="text-3xl font-bold text-gray-800 mb-6">
        Quản lý đặt phòng
      </h2>

      {/* Filters */}
      <div className="bg-white p-4 rounded-lg shadow-md mb-6">
        <h3 className="text-lg font-semibold mb-4 flex items-center">
          <Filter size={20} className="mr-2 text-blue-600" />
          Bộ lọc
        </h3>
        <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">
              Trạng thái
            </label>
            <select
              name="status"
              className="w-full p-2 border rounded-lg focus:ring-2 focus:ring-blue-500"
              onChange={(e) => setSelectedRange(e.target.value)}
              value={selectedRange}
            >
              <option value="">Tất cả</option>
              <option value="PENDING">Đang chờ</option>
              <option value="CHECKED_IN">Đã Nhận Phòng</option>
              <option value="CHECKED_OUT">Đã Trả Phòng</option>
              <option value="CANCELLED">Đã hủy</option>
            </select>
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">
              Ngày nhận phòng
            </label>
            <DatePicker
              placeholderText="Chọn ngày"
              dateFormat="yyyy-MM-dd"
              className="w-full p-2 border rounded-lg focus:ring-2 focus:ring-blue-500"
            />
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">
              Ngày trả phòng
            </label>
            <DatePicker
              placeholderText="Chọn ngày"
              dateFormat="yyyy-MM-dd"
              className="w-full p-2 border rounded-lg focus:ring-2 focus:ring-blue-500"
            />
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">
              Tìm khách hàng
            </label>
            <input
              type="text"
              name="customerSearch"
              placeholder="Nhập tên hoặc ID khách hàng"
              className="w-full p-2 border rounded-lg focus:ring-2 focus:ring-blue-500"
              value={isNumber}
              onChange={(e) => setIsNumber(e.target.value)}
            />
          </div>
        </div>
      </div>

      {/* Bookings Table */}
      <TableListBooking booking={filterBooking || []} error={error} />
    </div>
  );
};

export default BookingManagementForm;

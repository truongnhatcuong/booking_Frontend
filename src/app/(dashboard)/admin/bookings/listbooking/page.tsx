"use client";
import React, { useState } from "react";
import "react-datepicker/dist/react-datepicker.css";
import useSWR from "swr";
import TableListBooking, { IBooking } from "./components/TableListBooking";
import FilterBooking from "./components/FilterBooking";

const API_URL = process.env.NEXT_PUBLIC_URL_API;

type Dates = {
  checkInDate: Date | null;
  checkOutDate: Date | null;
};

const BookingManagementForm = () => {
  const [isNumber, setIsNumber] = useState<number | string>("");
  const [status, setStatus] = useState<string>("");
  const [dates, setDates] = useState<Dates>({
    checkInDate: null,
    checkOutDate: null,
  });
  const { data } = useSWR<{ bookings: IBooking[] }>(
    `${API_URL}/api/booking?idNumber=${isNumber}&status=${status}&checkInDate=${dates.checkInDate}&checkOutDate=${dates.checkOutDate}`
  );

  console.log(dates);

  return (
    <div className="container mx-auto p-6 bg-white">
      <h2 className="text-3xl font-bold text-gray-800 mb-6">
        Quản lý đặt phòng
      </h2>
      <FilterBooking
        dates={dates}
        setDates={setDates}
        isNumber={isNumber}
        selectedRange={status}
        setIsNumber={setIsNumber}
        setSelectedRange={setStatus}
      />
      {/* Bookings Table */}
      <TableListBooking
        booking={data?.bookings || []}
        selectedStatus={status}
        setSelectedStatus={setStatus}
      />
    </div>
  );
};

export default BookingManagementForm;

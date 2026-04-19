"use client";
import { useState } from "react";
import Image from "next/image";
import { ChevronDown, ChevronUp } from "lucide-react";
import { calculateNights, formatDate } from "@/lib/formatDate";
import { formatPrice } from "@/lib/formatPrice";
import RemoveBooking from "./RemoveBooking";
import ReviewCusTomer from "./ReviewCusTomer";
import {
  translatePaymentMethod,
  translatePaymentStatus,
  translateStatus,
} from "@/lib/translate";
import { Booking } from "./profileBooking";

interface BookingDetailsProps {
  booking: Booking;
}

const statusStyles: Record<string, string> = {
  PENDING: "bg-amber-50 text-amber-800 border border-amber-200", // chờ
  CONFIRMED: "bg-blue-50 text-blue-800 border border-blue-200", // xác nhận
  CHECKED_IN: "bg-green-50 text-green-800 border border-green-200", // đang ở
  CHECKED_OUT: "bg-purple-50 text-purple-700 border border-purple-200", // đã xong
  CANCELLED: "bg-red-50 text-red-700 border border-red-200", // huỷ
};

const paymentStatusStyles: Record<string, string> = {
  COMPLETED: "bg-green-50 text-green-700",
  PENDING: "bg-amber-50 text-amber-700",
  REFUNDED: "bg-blue-50 text-blue-700",
  FAILED: "bg-red-50 text-red-700",
};

const BookingDetails = ({ booking }: BookingDetailsProps) => {
  const [expandedRoomIndex, setExpandedRoomIndex] = useState<number | null>(
    null,
  );

  return (
    <div className="max-w-4xl mx-auto px-4 lg:px-5 my-5 md:my-10">
      <div
        className="bg-white rounded-2xl overflow-hidden"
        style={{
          border: "0.5px solid rgba(0,0,0,0.1)",
          boxShadow: "0 1px 4px rgba(0,0,0,0.04)",
        }}
      >
        {/* ── Header ── */}
        <div className="flex justify-between items-start px-6 py-5 border-b border-gray-100">
          <div>
            <p className="text-xs font-medium tracking-widest text-gray-400 uppercase mb-1">
              Mã đặt phòng
            </p>
            <h1 className="text-lg font-semibold text-gray-900">
              #{booking.id.slice(0, 8).toUpperCase()}
            </h1>
            <span
              className={`inline-flex items-center gap-1.5 text-xs font-medium px-2.5 py-1 rounded-full mt-2 ${
                statusStyles[booking.status] ?? "bg-gray-100 text-gray-600"
              }`}
            >
              <span className="w-1.5 h-1.5 rounded-full bg-current opacity-70" />
              {translateStatus(booking.status)}
            </span>
          </div>

          <div className="flex flex-col gap-2 items-end mt-1">
            {booking?.status === "CHECKED_OUT" && (
              <ReviewCusTomer bookingId={booking.id} />
            )}
            {booking?.status === "PENDING" && (
              <RemoveBooking
                bookingId={booking.id}
                paymentMethod={booking?.payments[0]?.paymentMethod}
              />
            )}
          </div>
        </div>

        {/* ── Stay info ── */}
        <div className="grid grid-cols-3 px-6 py-5 border-b border-gray-100">
          {[
            {
              label: "Nhận phòng",
              value: formatDate(booking.checkInDate),
              sub: "Từ 14:00",
            },
            {
              label: "Trả phòng",
              value: formatDate(booking.checkOutDate),
              sub: "Trước 12:00",
            },
            {
              label: "Thời gian",
              value: `${calculateNights(booking.checkInDate, booking.checkOutDate)} đêm`,
              sub: `${booking.totalGuests} khách`,
            },
          ].map((item) => (
            <div key={item.label}>
              <p className="text-[11px] font-medium tracking-widest uppercase text-gray-400 mb-1.5">
                {item.label}
              </p>
              <p className="text-sm font-semibold text-gray-900">
                {item.value}
              </p>
              <p className="text-xs text-gray-400 mt-0.5">{item.sub}</p>
            </div>
          ))}
        </div>

        {/* ── Rooms ── */}
        <div className="px-6 py-5 border-b border-gray-100 space-y-3">
          <p className="text-[11px] font-medium tracking-widest uppercase text-gray-400 mb-3">
            Phòng đã đặt
          </p>

          {booking.bookingItems.map((item, index) => (
            <div key={index}>
              <div
                className="flex items-center gap-3 p-3 rounded-xl bg-gray-50"
                style={{ border: "0.5px solid rgba(0,0,0,0.07)" }}
              >
                <Image
                  src={item.room.images[0]?.imageUrl || "/placeholder-room.jpg"}
                  alt={item.room.roomNumber}
                  width={52}
                  height={52}
                  className="rounded-lg object-cover flex-shrink-0"
                />
                <div className="flex-1 min-w-0">
                  <p className="text-sm font-semibold text-gray-900 truncate">
                    {item.room.roomType.name}
                  </p>
                  <p className="text-xs text-gray-500 mt-0.5">
                    Phòng {item.room.roomNumber}
                  </p>
                  <button
                    onClick={() =>
                      setExpandedRoomIndex(
                        expandedRoomIndex === index ? null : index,
                      )
                    }
                    className="flex items-center gap-0.5 text-xs text-blue-600 mt-1.5 hover:text-blue-700 transition-colors"
                  >
                    {expandedRoomIndex === index
                      ? "Ẩn tiện nghi"
                      : "Xem tiện nghi"}
                    {expandedRoomIndex === index ? (
                      <ChevronUp className="h-3.5 w-3.5" />
                    ) : (
                      <ChevronDown className="h-3.5 w-3.5" />
                    )}
                  </button>
                </div>
                <div className="text-right flex-shrink-0">
                  <p className="text-sm font-semibold text-gray-900">
                    {formatPrice(Number(item.pricePerNight))}
                  </p>
                  <p className="text-[11px] text-gray-400 mt-0.5">/ đêm</p>
                </div>
              </div>

              {expandedRoomIndex === index && (
                <div
                  className="mt-2 p-3 rounded-xl bg-white"
                  style={{ border: "0.5px solid rgba(0,0,0,0.08)" }}
                >
                  <p className="text-xs font-medium text-gray-500 mb-2">
                    Tiện nghi phòng
                  </p>
                  <div className="flex flex-wrap gap-1.5">
                    {item.room.roomType.amenities.map((amenity, i) => (
                      <span
                        key={i}
                        className="text-xs font-medium px-2.5 py-1 rounded-full bg-blue-50 text-blue-700"
                      >
                        {amenity.amenity.name}
                      </span>
                    ))}
                  </div>
                </div>
              )}
            </div>
          ))}
        </div>

        {/* ── Payments ── */}
        <div className="px-6 py-5">
          <div className="flex justify-between items-center mb-3">
            <p className="text-[11px] font-medium tracking-widest uppercase text-gray-400">
              Chi tiết thanh toán
            </p>
            <p className="text-xs text-gray-500 font-medium">
              {(booking.customer?.user?.firstName || "") +
                " " +
                (booking.customer?.user?.lastName || "")}
            </p>
          </div>

          <div className="space-y-0 divide-y divide-gray-100">
            {booking.payments.map((payment, index) => (
              <div
                key={index}
                className="flex justify-between items-center py-3"
              >
                <div>
                  <p className="text-sm text-gray-700">
                    {translatePaymentMethod(payment.paymentMethod)}
                  </p>
                  <p className="text-xs text-gray-400 mt-0.5">
                    {formatDate(payment.paymentDate)}
                  </p>
                </div>
                <div className="flex items-center gap-3">
                  <p className="text-sm font-medium text-gray-900">
                    {formatPrice(Number(payment.amount))}
                  </p>
                  <span
                    className={`text-xs font-medium px-2.5 py-1 rounded-full ${
                      paymentStatusStyles[payment.status] ??
                      "bg-gray-50 text-gray-600"
                    }`}
                  >
                    {translatePaymentStatus(payment.status)}
                  </span>
                </div>
              </div>
            ))}
          </div>

          {/* Total */}
          <div className="flex justify-between items-center pt-4 mt-2 border-t border-gray-100">
            <p className="text-sm text-gray-500">Tổng thanh toán</p>
            <p className="text-2xl font-semibold text-blue-600">
              {formatPrice(Number(booking.totalAmount))}
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default BookingDetails;

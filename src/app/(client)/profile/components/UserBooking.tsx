"use client";
import Image from "next/image";
import { Home } from "lucide-react";
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

const statusConfig: Record<
  string,
  { label: string; dot: string; badge: string }
> = {
  PENDING: {
    label: "Chờ xác nhận",
    dot: "#f59e0b",
    badge: "bg-amber-50 text-amber-800 border border-amber-200",
  },
  CONFIRMED: {
    label: "Đã xác nhận",
    dot: "#4eff91",
    badge: "bg-blue-50 text-blue-800 border border-blue-200",
  },
  CHECKED_IN: {
    label: "Đang ở",
    dot: "#22c55e",
    badge: "bg-green-50 text-green-800 border border-green-200",
  },
  CHECKED_OUT: {
    label: "Đã trả phòng",
    dot: "#a78bfa",
    badge: "bg-purple-50 text-purple-700 border border-purple-200",
  },
  CANCELLED: {
    label: "Đã huỷ",
    dot: "#f87171",
    badge: "bg-red-50 text-red-700 border border-red-200",
  },
};

const paymentStatusStyles: Record<string, string> = {
  COMPLETED: "bg-green-100 text-green-800",
  PENDING: "bg-amber-100 text-amber-800",
  REFUNDED: "bg-blue-100 text-blue-800",
  FAILED: "bg-red-100 text-red-800",
};

const BookingDetails = ({ booking }: BookingDetailsProps) => {
  const nights = calculateNights(booking.checkInDate, booking.checkOutDate);
  const status = statusConfig[booking.status] ?? {
    label: booking.status,
    dot: "#94a3b8",
    badge: "bg-gray-100 text-gray-600",
  };
  const guestName =
    (booking.customer?.user?.firstName || "") +
    " " +
    (booking.customer?.user?.lastName || "");
  const initials = guestName
    .trim()
    .split(" ")
    .map((n) => n[0])
    .slice(0, 2)
    .join("")
    .toUpperCase();

  return (
    <div className="max-w-7xl mx-auto px-4 pb-10 cursor-grabbing">
      {/* ── Hero header ── */}
      <div
        className="relative rounded-2xl overflow-hidden mb-0"
        style={{
          background:
            "linear-gradient(135deg, #0f4c81 0%, #1a6fba 50%, #2589d4 100%)",
          minHeight: 172,
        }}
      >
        {/* subtle pattern */}
        <div
          className="absolute inset-0 opacity-[0.04]"
          style={{
            backgroundImage: `url("data:image/svg+xml,%3Csvg width='60' height='60' viewBox='0 0 60 60' xmlns='http://www.w3.org/2000/svg'%3E%3Cg fill='%23fff'%3E%3Cpath d='M36 34v-4h-2v4h-4v2h4v4h2v-4h4v-2h-4zm0-30V0h-2v4h-4v2h4v4h2V6h4V4h-4zM6 34v-4H4v4H0v2h4v4h2v-4h4v-2H6zM6 4V0H4v4H0v2h4v4h2V6h4V4H6z'/%3E%3C/g%3E%3C/svg%3E")`,
          }}
        />

        {/* top-right actions */}
        <div className="absolute top-5 right-5 flex flex-col gap-2 items-end z-10">
          {booking.status === "CHECKED_OUT" && (
            <ReviewCusTomer bookingId={booking.id} />
          )}
          {booking.status === "PENDING" && (
            <RemoveBooking
              bookingId={booking.id}
              paymentMethod={booking?.payments[0]?.paymentMethod}
            />
          )}
        </div>

        {/* booking info */}
        <div className="relative z-10 px-6 pt-6 pb-7">
          {/* status badge */}
          <span className="inline-flex items-center gap-2 bg-white/20 border border-white/30 text-white text-xs font-medium px-3 py-1 rounded-full mb-3">
            <span
              className="w-1.5 h-1.5 rounded-full"
              style={{ background: status.dot }}
            />
            {translateStatus(booking.status)}
          </span>
          <h1 className="text-[22px] font-semibold text-white tracking-tight">
            #{booking.id.slice(0, 8).toUpperCase()}
          </h1>
          <p className="text-white/70 text-[13px] mt-1">
            Mã đặt phòng · {nights} đêm · {booking.totalGuests} khách
          </p>
        </div>
      </div>

      {/* ── Card body ── */}
      <div
        className="relative z-10 bg-white rounded-2xl overflow-hidden -mt-4"
        style={{
          border: "0.5px solid rgba(0,0,0,0.08)",
          boxShadow: "0 2px 12px rgba(0,0,0,0.06)",
        }}
      >
        {/* Stay dates */}
        <div className="grid grid-cols-3 px-6 py-5 border-b border-gray-100">
          <div>
            <p className="text-[10px] font-medium tracking-widest uppercase text-gray-400 mb-2">
              Nhận phòng
            </p>
            <p className="text-base font-semibold text-gray-900">
              {formatDate(booking.checkInDate)}
            </p>
            <p className="text-xs text-gray-400 mt-1">Từ 14:00</p>
          </div>
          <div className="flex flex-col items-center justify-center">
            <div className="bg-blue-50 text-blue-700 rounded-xl px-3 py-1.5 text-center">
              <p className="text-sm font-semibold">{nights} đêm</p>
              <p className="text-[11px] opacity-80">
                {booking.totalGuests} khách
              </p>
            </div>
          </div>
          <div className="text-right">
            <p className="text-[10px] font-medium tracking-widest uppercase text-gray-400 mb-2">
              Trả phòng
            </p>
            <p className="text-base font-semibold text-gray-900">
              {formatDate(booking.checkOutDate)}
            </p>
            <p className="text-xs text-gray-400 mt-1">Trước 12:00</p>
          </div>
        </div>

        {/* Rooms */}
        <div className="px-6 py-5 border-b border-gray-100">
          <p className="text-[10px] font-medium tracking-widest uppercase text-gray-400 mb-4">
            Phòng đã đặt
          </p>
          <div className="space-y-3">
            {booking.bookingItems.map((item, index) => (
              <div
                key={index}
                className="flex gap-3 p-3 rounded-xl bg-gray-50"
                style={{ border: "0.5px solid rgba(0,0,0,0.07)" }}
              >
                <div className="w-[72px] h-[72px] rounded-xl overflow-hidden flex-shrink-0 bg-gray-200">
                  {item.room.images[0]?.imageUrl ? (
                    <Image
                      src={item.room.images[0].imageUrl}
                      alt={item.room.roomNumber}
                      width={72}
                      height={72}
                      className="object-cover w-full h-full"
                    />
                  ) : (
                    <div className="w-full h-full flex items-center justify-center">
                      <Home className="w-6 h-6 text-gray-400" />
                    </div>
                  )}
                </div>
                <div className="flex-1 min-w-0">
                  <p className="text-sm font-semibold text-gray-900 truncate">
                    {item.room.roomType.name}
                  </p>
                  <p className="text-xs text-gray-500 mt-0.5">
                    Phòng {item.room.roomNumber}
                  </p>
                  <div className="flex flex-wrap gap-1.5 mt-2">
                    {item.room.roomType.amenities.slice(0, 4).map((a, i) => (
                      <span
                        key={i}
                        className="text-[11px] px-2 py-0.5 rounded-full bg-blue-50 text-blue-700 font-medium"
                      >
                        {a.amenity.name}
                      </span>
                    ))}
                  </div>
                </div>
                <div className="text-right flex-shrink-0 pt-0.5">
                  <p className="text-sm font-semibold text-gray-900">
                    {formatPrice(Number(item.pricePerNight))}
                  </p>
                  <p className="text-[11px] text-gray-400 mt-0.5">/ đêm</p>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Payments */}
        <div className="px-6 py-5">
          <div className="flex justify-between items-center mb-4">
            <p className="text-[10px] font-medium tracking-widest uppercase text-gray-400">
              Chi tiết thanh toán
            </p>
            <div className="flex items-center gap-2">
              <div className="w-6 h-6 rounded-full bg-blue-50 flex items-center justify-center text-[10px] font-semibold text-blue-700">
                {initials}
              </div>
              <span className="text-xs text-gray-500">{guestName.trim()}</span>
            </div>
          </div>

          <div className="divide-y divide-gray-100">
            {booking.payments.map((payment, index) => (
              <div
                key={index}
                className="flex justify-between items-center py-3"
              >
                <div>
                  <p className="text-sm text-gray-800">
                    {translatePaymentMethod(payment.paymentMethod)}
                  </p>
                  <p className="text-xs text-gray-400 mt-0.5">
                    {formatDate(payment.paymentDate)}
                  </p>
                </div>
                <div className="flex items-center gap-2.5">
                  <p className="text-sm font-medium text-gray-900">
                    {formatPrice(Number(payment.amount))}
                  </p>
                  <span
                    className={`text-[11px] font-medium px-2.5 py-1 rounded-full ${
                      paymentStatusStyles[payment.status] ??
                      "bg-gray-100 text-gray-600"
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
            <p className="text-2xl font-semibold text-blue-700">
              {formatPrice(Number(booking.totalAmount))}
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default BookingDetails;

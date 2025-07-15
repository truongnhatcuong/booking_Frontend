import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { formatPrice } from "@/lib/formatPrice";
import React from "react";
import UpdateStatus from "./UpdateStatus";

export interface IBooking {
  id: string;
  checkInDate: string; // ISO string
  checkOutDate: string; // ISO string
  status: "PENDING" | "CONFIRMED" | "CANCELLED" | "CHECKED_IN" | "CHECKED_OUT";
  totalAmount: string; // String to match API
  totalGuests: number;
  bookingItems: {
    room: { roomNumber: number; roomType: { name: string; photoUrls: string } };
  }[];
  customer: {
    id: string;
    user: {
      firstName: string;
      lastName: string;
    };
  };
  payments: {
    id: string;
    status: "PENDING" | "COMPLETED" | "FAILED";
    paymentMethod: string;
  }[];
}
interface BookingProps {
  booking: IBooking[];
  error: boolean;
}

const TableListBooking = ({ booking, error }: BookingProps) => {
  function getCurrentBookingVisualStatus(
    checkIn: string,
    checkOut: string
  ): "check-in" | "in-use" | "check-out" | "clean" | null {
    const today = new Date();
    const checkInDate = new Date(checkIn);
    const checkOutDate = new Date(checkOut);

    // Normalize ngày để so sánh (bỏ phần giờ phút giây)
    const normalize = (date: Date) =>
      new Date(date.getFullYear(), date.getMonth(), date.getDate());

    const todayNorm = normalize(today);
    const checkInNorm = normalize(checkInDate);
    const checkOutNorm = normalize(checkOutDate);

    if (todayNorm.getTime() === checkInNorm.getTime()) {
      return "check-in";
    }

    if (todayNorm > checkInNorm && todayNorm < checkOutNorm) {
      return "in-use";
    }

    if (todayNorm.getTime() === checkOutNorm.getTime()) {
      return "check-out";
    }

    if (todayNorm.getTime() > checkOutNorm.getTime()) {
      return "clean";
    }

    return null;
  }

  return (
    <div className="bg-white rounded-lg shadow-md overflow-x-auto">
      <Table className="w-full divide-y divide-gray-200">
        <TableHeader className="bg-gray-50">
          <TableRow>
            <TableHead className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
              Mã đặt phòng
            </TableHead>
            <TableHead className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
              Khách hàng
            </TableHead>
            <TableHead className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
              Loại Phòng
            </TableHead>
            <TableHead className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
              Ngày nhận phòng - Ngày trả phòng
            </TableHead>
            <TableHead className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
              Tổng tiền
            </TableHead>
            <TableHead className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
              Trạng thái
            </TableHead>
            <TableHead className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
              Lịch
            </TableHead>
            <TableHead className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
              Thanh toán
            </TableHead>
            <TableHead className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
              Hành động
            </TableHead>
          </TableRow>
        </TableHeader>
        <TableBody className="bg-white divide-y divide-gray-200">
          {booking?.map((booking) => (
            <TableRow key={booking.id}>
              <TableCell className="px-6 py-4 whitespace-nowrap text-sm text-gray-900 *:flex items-center gap-2">
                #{booking.id.replace(/-/g, "").slice(0, 8)}
              </TableCell>
              <TableCell className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
                {booking.customer.user.firstName}{" "}
                {booking.customer.user.lastName}
              </TableCell>
              <TableCell className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
                {booking.bookingItems.map((item, index) => (
                  <p key={index}>
                    {item.room.roomType.name}{" "}
                    <span>({booking.totalGuests})</span>
                  </p>
                ))}
              </TableCell>

              <TableCell className="px-6 py-4 whitespace-nowrap text-sm text-gray-900 flex items-center gap-20 ">
                <p>
                  {" "}
                  {new Date(booking.checkInDate).toLocaleDateString("vi-VN")}
                </p>
                <p>
                  {new Date(booking.checkOutDate).toLocaleDateString("vi-VN")}
                </p>
              </TableCell>
              <TableCell className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
                {formatPrice(Number(booking.totalAmount))}
              </TableCell>
              <TableCell className="px-6 py-4 whitespace-nowrap text-sm">
                <span
                  className={`px-2 py-1 rounded-full text-xs font-semibold ${
                    booking.status === "CHECKED_OUT"
                      ? "bg-green-100 text-green-800"
                      : booking.status === "CHECKED_IN"
                      ? "bg-blue-100 text-blue-800"
                      : booking.status === "CANCELLED"
                      ? "bg-red-100 text-red-800"
                      : "bg-yellow-100 text-yellow-800"
                  }`}
                >
                  {booking.status}
                </span>
              </TableCell>
              <TableCell className="px-6 py-4 whitespace-nowrap text-sm">
                {booking.status === "CANCELLED"
                  ? null
                  : (() => {
                      const status = getCurrentBookingVisualStatus(
                        booking.checkInDate,
                        booking.checkOutDate
                      );

                      const color =
                        status === "check-in"
                          ? "bg-green-500"
                          : status === "in-use"
                          ? "bg-yellow-400"
                          : status === "check-out"
                          ? "bg-blue-500"
                          : status === "clean"
                          ? "bg-gray-400"
                          : "bg-transparent"; // fallback nếu null

                      return (
                        <div
                          className={`w-5 h-5 rounded-full ${color}`}
                          title={status ?? ""}
                        ></div>
                      );
                    })()}
              </TableCell>

              <td className="px-6 py-4 whitespace-nowrap text-sm">
                <span
                  className={`px-2 py-1 rounded-full text-xs font-semibold ${
                    booking.payments[0]?.status === "COMPLETED"
                      ? "bg-green-100 text-green-800"
                      : booking.payments[0]?.status === "PENDING"
                      ? "bg-yellow-100 text-yellow-800"
                      : "bg-red-100 text-red-800"
                  }`}
                >
                  {booking.payments[0]?.status || "N/A"}
                </span>
              </td>
              <td className="px-6 py-4 whitespace-nowrap text-sm">
                {booking.status !== "CHECKED_OUT" && (
                  <UpdateStatus id={booking.id} status={booking.status} />
                )}
              </td>
            </TableRow>
          ))}
        </TableBody>
      </Table>
      {error && (
        <p className="text-red-600 p-4">Lỗi khi tải danh sách đặt phòng</p>
      )}
      {!booking?.length && !error && (
        <p className="text-gray-600 p-4">
          Không có đặt phòng nào khớp với bộ lọc
        </p>
      )}
    </div>
  );
};

export default TableListBooking;

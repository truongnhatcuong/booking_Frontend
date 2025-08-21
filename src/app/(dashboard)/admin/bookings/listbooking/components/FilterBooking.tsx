import { Filter } from "lucide-react";
import React from "react";
import DatePicker from "react-datepicker";

interface IFilterBooking {
  setSelectedRange: (value: string) => void;
  selectedRange: string;
  setIsNumber: (value: string) => void;
  isNumber: string | number;
  setDates: React.Dispatch<React.SetStateAction<Dates>>;
  dates: Dates;
}

type Dates = {
  checkInDate: Date | null;
  checkOutDate: Date | null;
};

const FilterBooking = ({
  isNumber,
  selectedRange,
  setIsNumber,
  setSelectedRange,
  dates,
  setDates,
}: IFilterBooking) => {
  return (
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
            dateFormat="dd/MM/yyyy" // đổi định dạng ở đây
            className="w-full p-2 border rounded-lg focus:ring-2 focus:ring-blue-500"
            selected={dates.checkInDate}
            onChange={(date) =>
              setDates((prev) => ({
                ...prev,
                checkInDate: date,
              }))
            }
          />
        </div>
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1">
            Ngày trả phòng
          </label>
          <DatePicker
            placeholderText="Chọn ngày"
            dateFormat="dd/MM/yyyy" // đổi định dạng ở đây
            className="w-full p-2 border rounded-lg focus:ring-2 focus:ring-blue-500"
            selected={dates.checkOutDate}
            onChange={(date) =>
              setDates((prev) => ({
                ...prev,
                checkOutDate: date,
              }))
            }
            minDate={new Date(dates.checkInDate || new Date())} // Disable past dates
          />
        </div>
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1">
            Tìm khách hàng
          </label>
          <input
            type="text"
            name="customerSearch"
            placeholder="Nhập CCCD của khách hàng"
            className="w-full p-2 border rounded-lg focus:ring-2 focus:ring-blue-500"
            value={isNumber}
            onChange={(e) => setIsNumber(e.target.value)}
          />
        </div>
      </div>
    </div>
  );
};

export default FilterBooking;

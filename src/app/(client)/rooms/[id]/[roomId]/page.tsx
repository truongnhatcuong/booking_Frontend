/* eslint-disable @typescript-eslint/no-explicit-any */
"use client";
import { fetcher } from "@/lib/fetcher";
import React, { use, useEffect } from "react";
import useSWR from "swr";
import Image from "next/image";
import { Swiper, SwiperSlide } from "swiper/react";
import { Navigation, Pagination, EffectFade, Autoplay } from "swiper/modules";
import "swiper/css";
import "swiper/css/navigation";
import "swiper/css/pagination";
import "swiper/css/effect-fade";
import { formatPrice } from "@/lib/formatPrice";
import { Users, CheckCircle, Star } from "lucide-react";
import FormBooking from "../../components/FormBooking";

interface RoomData {
  room: {
    id: string;
    roomNumber: string;
    floor: number;
    status: RoomStatus;
    images: Array<{ imageUrl: string }>;
    roomType: {
      name: string;
      description: string;
      basePrice: string;
      maxOccupancy: number;
      amenities: Array<{ amenity: { name: string } }>;
    };
  };
}

enum RoomStatus {
  AVAILABLE = "AVAILABLE",
  OCCUPIED = "OCCUPIED",
  MAINTENANCE = "MAINTENANCE",
}

export function translateRoomStatus(status: RoomStatus): string {
  switch (status) {
    case RoomStatus.AVAILABLE:
      return "Còn trống";
    case RoomStatus.OCCUPIED:
      return "Đang có khách";
    case RoomStatus.MAINTENANCE:
      return "Đang bảo trì";
  }
}

interface FormData {
  checkInDate: Date | null;
  checkOutDate: Date | null;
  totalGuests: number;
  bookingSource: string;
  specialRequests: string;
  totalAmount: number;
  discountId: number | null;
  pricePerNight: number;
  roomId: string;
}
const Page = ({ params }: { params: Promise<{ roomId: string }> }) => {
  const { roomId } = use(params);

  const { data, isLoading } = useSWR<RoomData>(
    `${process.env.NEXT_PUBLIC_URL_API}/api/room/${roomId}`,
    fetcher
  );

  useEffect(() => {
    if (data?.room.roomType.basePrice) {
      setFormData((prev) => ({
        ...prev,
        pricePerNight: Number(data.room.roomType.basePrice),
      }));
    }
  }, [data]);

  const [formData, setFormData] = React.useState<FormData>({
    checkInDate: null,
    checkOutDate: null,
    totalGuests: 1,
    specialRequests: "",
    bookingSource: "WEBSITE",
    totalAmount: 0,
    discountId: null,
    pricePerNight: 0,
    roomId: roomId,
  });

  useEffect(() => {
    if (formData.checkInDate && formData.checkOutDate) {
      const checkIn = new Date(formData.checkInDate);
      const checkOut = new Date(formData.checkOutDate);
      const diffTime = Math.abs(checkOut.getTime() - checkIn.getTime());
      const diffDays = Math.ceil(diffTime / (1000 * 60 * 60 * 24));
      setFormData((prev) => ({
        ...prev,
        totalAmount: diffDays * Number(prev.pricePerNight),
      }));
    }
  }, [formData.checkInDate, formData.checkOutDate, formData.pricePerNight]);

  const handleFormChange = (
    e: React.ChangeEvent<
      HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement
    >
  ) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  if (isLoading)
    return (
      <div className="flex items-center justify-center h-screen">
        <div className="animate-pulse flex flex-col items-center">
          <div className="w-12 h-12 border-4 border-t-blue-600 border-blue-200 rounded-full animate-spin mb-4"></div>
          <p className="text-lg font-serif italic text-gray-600">
            Đang tải thông tin phòng...
          </p>
        </div>
      </div>
    );

  if (!data) return null;

  const { room } = data;

  return (
    <div className="container mx-auto px-4 py-12 max-w-[1400px]">
      <div className="bg-white rounded-2xl shadow-2xl overflow-hidden border border-gray-100">
        {/* Image Gallery - Full width, taller, with fade effect */}
        <div className="relative">
          <Swiper
            modules={[Navigation, Pagination, EffectFade, Autoplay]}
            effect="fade"
            navigation
            pagination={{ clickable: true, dynamicBullets: true }}
            autoplay={{ delay: 5000, disableOnInteraction: false }}
            loop={true}
            className="w-full h-[500px] lg:h-[600px]"
          >
            {room.images.map((image, index) => (
              <SwiperSlide key={index}>
                <div className="relative h-full w-full">
                  <div className="absolute inset-0 bg-gradient-to-t from-black/50 to-transparent z-10"></div>
                  <Image
                    src={image.imageUrl}
                    alt={`${room.roomType.name} - Phòng ${room.roomNumber}`}
                    fill
                    className="object-cover"
                    priority
                  />
                  <div className="absolute bottom-0 left-0 p-8 z-20 text-white">
                    <h1 className="text-4xl font-serif mb-2 tracking-wide">
                      {room.roomType.name}
                    </h1>
                    <p className="text-xl font-light opacity-90">
                      Phòng {room.roomNumber}, Tầng {room.floor}
                    </p>
                  </div>
                </div>
              </SwiperSlide>
            ))}
          </Swiper>
        </div>

        {/* Main Content */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8 p-8 lg:p-12">
          {/* Room Details */}
          <div className="lg:col-span-2 space-y-8">
            {/* Price and key details */}
            <div className="flex flex-col md:flex-row justify-between items-start md:items-center border-b pb-6 border-gray-200">
              <div>
                <p className="text-3xl font-bold text-gray-800">
                  {formatPrice(Number(room.roomType.basePrice))}
                  <span className="text-lg font-normal text-gray-500">
                    /đêm
                  </span>
                </p>
              </div>
              <div className="flex space-x-6 mt-4 md:mt-0">
                <div className="flex items-center">
                  <Users size={18} className="text-blue-600 mr-2" />
                  <span className="text-gray-700">
                    Tối đa {room.roomType.maxOccupancy} khách
                  </span>
                </div>
                <div className="flex items-center">
                  <Star size={18} className="text-amber-500 mr-2" />
                  <span className="text-gray-700">Phòng cao cấp</span>
                </div>
              </div>
            </div>

            {/* Description */}
            <div>
              <h2 className="text-2xl font-serif text-gray-800 mb-4">
                Giới thiệu
              </h2>
              <p className="text-gray-600 leading-relaxed text-lg">
                {room.roomType.description}
              </p>
            </div>

            {/* Amenities */}
            <div>
              <h2 className="text-2xl font-serif text-gray-800 mb-4">
                Tiện nghi phòng
              </h2>
              <div className="grid grid-cols-2 md:grid-cols-3 gap-4">
                {room.roomType.amenities.map((item, index) => (
                  <div key={index} className="flex items-center">
                    <CheckCircle
                      size={18}
                      className="text-blue-600 mr-3 flex-shrink-0"
                    />
                    <span className="text-gray-700">{item.amenity.name}</span>
                  </div>
                ))}
              </div>
            </div>

            {/* Policies */}
            <div>
              <h2 className="text-2xl font-serif text-gray-800 mb-4">
                Chính sách
              </h2>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div className="bg-gray-50 p-4 rounded-lg">
                  <h3 className="font-medium text-gray-800 mb-2">
                    Nhận phòng & Trả phòng
                  </h3>
                  <p className="text-gray-600">Nhận phòng: 14:00</p>
                  <p className="text-gray-600">Trả phòng: 12:00</p>
                </div>
                <div className="bg-gray-50 p-4 rounded-lg">
                  <h3 className="font-medium text-gray-800 mb-2">Hủy phòng</h3>
                  <p className="text-gray-600">Miễn phí hủy trước 3 ngày</p>
                </div>
              </div>
            </div>
          </div>

          {/* Booking Form */}
          <FormBooking
            room={room}
            handleFormChange={handleFormChange}
            formData={formData}
            setFormData={setFormData}
          />
        </div>
      </div>
    </div>
  );
};

export default Page;

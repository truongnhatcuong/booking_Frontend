"use client";
import { formatPrice } from "@/lib/formatPrice";
import Image from "next/image";
import Link from "next/link";

interface Iroom {
  room: {
    id: string;
    roomType: {
      id: string;
      maxOccupancy: number;
      basePrice: string;
      name: string;
    };
    images: { imageUrl: string }[];
  };
}
const RoomCard = ({ room }: Iroom) => {
  return (
    <div className="bg-white rounded-lg overflow-hidden shadow-md hover:shadow-lg transition-shadow duration-300">
      <div className="h-48 bg-gray-200 overflow-hidden">
        <Image
          src={room.images[0].imageUrl || "/images/room-placeholder.jpg"}
          alt={room.id}
          width={300}
          height={300}
          className="w-full h-full object-cover"
        />
      </div>

      <div>
        {/* tổng */}
        <div className="flex justify-between items-center">
          <div className="p-4">
            <h3 className="text-xl font-semibold text-gray-800 mb-2">
              {room.roomType.name}
            </h3>

            <div className="flex items-center mb-3">
              <span className="text-gray-700 font-medium mr-2">Sức chứa:</span>
              <span className="text-gray-600">
                {room.roomType.maxOccupancy} người
              </span>
            </div>
          </div>
          {/* giá */}
          <div className="flex items-center mb-4">
            <span className="text-gray-700 font-medium mr-2">Giá:</span>
            <span className="text-blue-600 font-bold">
              {formatPrice(Number(room.roomType.basePrice))} VND/đêm
            </span>
          </div>
        </div>

        <Link
          href={`/rooms/${room.roomType.id}/${room.id}`}
          className="block w-full bg-blue-600 hover:bg-blue-700 text-white text-center font-medium py-2 px-4 rounded transition duration-200"
        >
          Đặt ngay
        </Link>
      </div>
    </div>
  );
};

export default RoomCard;

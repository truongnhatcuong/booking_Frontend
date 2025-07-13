"use client";
import { HoverCardContent } from "@/components/ui/hover-card";
import { fetcher } from "@/lib/fetcher";
import { HoverCard, HoverCardTrigger } from "@radix-ui/react-hover-card";
import Link from "next/link";
import { usePathname } from "next/navigation";
import React, { useState } from "react";
import useSWR from "swr";

interface IListHeader {
  id: number;
  link: string;
  title: string;
  hasDropdown?: boolean;
}

interface IRoomtype {
  id: string;
  name: string;
}

const ListItems: IListHeader[] = [
  { id: 1, link: "/", title: "Trang Chủ" },
  { id: 2, link: "/about", title: "Giới Thiệu" },
  { id: 3, link: "#", title: "Phòng", hasDropdown: true },
  { id: 4, link: "/blog", title: "Bài viết " },
  { id: 5, link: "/imageshotel", title: "Thư Viện ảnh" },
];

const ListItem = () => {
  const pathname = usePathname();
  const { data, isLoading } = useSWR(
    `${process.env.NEXT_PUBLIC_URL_API}/api/roomtype`,
    fetcher
  );
  const [isMobileDropdownOpen, setIsMobileDropdownOpen] = useState(false);

  const toggleMobileDropdown = () => {
    setIsMobileDropdownOpen((prev) => !prev);
  };

  return (
    <div className="flex items-center md:flex-row flex-col space-x-2 md:space-x-0">
      {ListItems.map((item) =>
        item.hasDropdown ? (
          <div key={item.id} className="relative">
            {/* Desktop: HoverCard for md and larger */}
            <HoverCard>
              <HoverCardTrigger asChild className="hidden md:block">
                <div
                  className={`px-6 py-2 text-white text-base font-medium cursor-pointer hover:text-teal-500 ${
                    pathname === item.link ? "bg-teal-500 rounded-full" : ""
                  }`}
                >
                  {item.title}
                </div>
              </HoverCardTrigger>
              <HoverCardContent className="w-48 mt-2 p-2 bg-white shadow-lg rounded-lg hidden md:block">
                {isLoading && <p className="text-gray-500">Loading...</p>}
                {data && data.length > 0 ? (
                  <ul className="space-y-2">
                    {data.map((room: IRoomtype) => (
                      <li key={room.id}>
                        <Link
                          href={`/rooms/${room.id}`}
                          className="block text-gray-700 hover:bg-black/10 p-1.5 hover:border-l-4 hover:border-amber-400 transition-all duration-150 hover:ease-in-out"
                        >
                          {room.name}
                        </Link>
                      </li>
                    ))}
                  </ul>
                ) : (
                  !isLoading && (
                    <p className="text-gray-500">No rooms available.</p>
                  )
                )}
              </HoverCardContent>
            </HoverCard>

            {/* Mobile: Clickable dropdown for sm and smaller */}
            <div className="md:hidden">
              <button
                onClick={toggleMobileDropdown}
                className={`px-6 py-2 text-base font-medium ${
                  pathname === item.link
                    ? "bg-teal-500 rounded-full text-white"
                    : "text-white hover:text-teal-500"
                }`}
              >
                {item.title}
              </button>
              {isMobileDropdownOpen && (
                <div className="mt-2 p-2 bg-white shadow-lg rounded-lg w-full">
                  {isLoading && <p className="text-gray-500">Loading...</p>}
                  {data && data.length > 0 ? (
                    <ul className="space-y-2">
                      {data.map((room: IRoomtype) => (
                        <li key={room.id}>
                          <Link
                            href={`/rooms/${room.id}`}
                            className="block text-gray-700 hover:bg-black/10 p-1.5 hover:border-l-4 hover:border-amber-400 transition-all duration-150 hover:ease-in-out"
                            onClick={() => setIsMobileDropdownOpen(false)} // Close dropdown on click
                          >
                            {room.name}
                          </Link>
                        </li>
                      ))}
                    </ul>
                  ) : (
                    !isLoading && (
                      <p className="text-gray-500">No rooms available.</p>
                    )
                  )}
                </div>
              )}
            </div>
          </div>
        ) : (
          <Link
            href={item.link}
            key={item.id}
            className={`px-6 py-2 text-base font-medium ${
              pathname === item.link
                ? "bg-teal-500 rounded-full text-white"
                : "text-white hover:text-teal-500"
            }`}
          >
            {item.title}
          </Link>
        )
      )}
    </div>
  );
};

export default ListItem;

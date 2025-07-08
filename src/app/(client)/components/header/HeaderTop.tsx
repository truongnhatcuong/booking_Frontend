"use client";

import React, { useEffect, useState } from "react";
import Link from "next/link";
import AccountUser from "./AccountUser";
import useSWR from "swr";
import axios from "axios";
import { URL_API } from "@/lib/fetcher";

const HeaderTop = () => {
  const [token, setToken] = useState<string | null>(null);
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  useEffect(() => {
    const localToken = localStorage.getItem("token");
    setToken(localToken);
  }, []);
  const { data } = useSWR(
    token ? `${URL_API}/api/auth/user` : null,
    (url) =>
      axios
        .get(url, {
          headers: {
            Authorization: `Bearer ${token}`,
          },
          withCredentials: true,
        })
        .then((res) => res.data),
    {
      onError: (err) => {
        console.log("Custom handle error", err);
      },
      shouldRetryOnError: false, // Không tự retry nếu có lỗi
      revalidateOnFocus: false, // Không tự động revalidate khi focus lại trang
      revalidateOnReconnect: false, // Không tự động revalidate khi kết nối lại
    }
  );

  useEffect(() => {
    setIsLoggedIn(!!data);
  }, [data]);

  return (
    <div className="h-8 bg-black shadow-md">
      <div className="container mx-auto px-52">
        <div className="flex justify-center md:justify-between items-center h-full text-white pt-2">
          <div className="hidden md:block text-sm font-medium tracking-wide">
            Chào Mừng Bạn Đến Với Khách Sạn Của Chúng Tôi
          </div>

          <div className="flex items-center space-x-4 text-sm">
            {isLoggedIn ? (
              <AccountUser
                userType={data?.userType}
                lastName={data?.lastName}
              />
            ) : (
              <div className="flex items-center space-x-4 w-screen justify-center md:w-full">
                <Link href={"/signIn"}>
                  <button className="hover:text-yellow-200 transition-colors duration-200 cursor-pointer">
                    Đăng Nhập
                  </button>
                </Link>
                <div className="h-4 border-r border-white" />
                <Link href={"/signUp"}>
                  <button className="hover:text-yellow-200 transition-colors duration-200 cursor-pointer">
                    Đăng Kí
                  </button>
                </Link>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default HeaderTop;

"use client";
import React, { useEffect, useState } from "react";
import Link from "next/link";
import AccountUser from "./AccountUser";
import useSWR from "swr";
import axios from "axios";
import { URL_API } from "@/lib/fetcher";
import { useRouter } from "next/navigation";

const HeaderTop = () => {
  const [token, setToken] = useState<string | null>(null);
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const router = useRouter();
  useEffect(() => {
    if (router) {
      const savedToken = localStorage.getItem("token");
      setToken(savedToken);
    }
  }, [token, router]);

  const { data } = useSWR(token ? `${URL_API}/api/auth/user` : null, (url) =>
    axios
      .get(url, {
        withCredentials: true,
      })
      .then((res) => res.data)
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
              <div className="    ">
                {" "}
                <AccountUser
                  userType={data?.userType}
                  lastName={data?.lastName}
                />
              </div>
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

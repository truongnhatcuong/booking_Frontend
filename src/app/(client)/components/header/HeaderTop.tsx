"use client";
import React, { useEffect, useState } from "react";
import Link from "next/link";
import AccountUser from "./AccountUser";
import { useRouter } from "next/navigation";
import { jwtDecode } from "jwt-decode";

interface MyTokenPayload {
  userType: string;
  lastName: string;
}

const HeaderTop = () => {
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [userData, setUserData] = useState({
    userType: "",
    lastName: "",
  });
  const router = useRouter();
  useEffect(() => {
    const savedToken = localStorage.getItem("token");
    if (savedToken) {
      const decoded = jwtDecode<MyTokenPayload>(savedToken);
      setIsLoggedIn(true);
      setUserData({
        userType: decoded?.userType || "",
        lastName: decoded?.lastName || "",
      });
    } else {
      setIsLoggedIn(false);
      setUserData({
        userType: "",
        lastName: "",
      });
    }
  }, [router, isLoggedIn]);

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
                  setIsLoggedIn={setIsLoggedIn}
                  userType={userData.userType}
                  lastName={userData.lastName}
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

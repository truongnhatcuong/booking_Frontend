import React from "react";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import Link from "next/link";

interface AccountUserProps {
  userType: string | null;
  lastName: string | null;

  setIsLoggedIn: (value: boolean) => void;
}
const AccountUser = ({
  userType,
  lastName,

  setIsLoggedIn,
}: AccountUserProps) => {
  return (
    <div className="">
      <DropdownMenu>
        <DropdownMenuTrigger className="cursor-pointer ">
          Tài Khoản của {lastName ? lastName : "Bạn"}{" "}
        </DropdownMenuTrigger>
        <DropdownMenuContent>
          <DropdownMenuLabel>Thông Tin Tài Khoản</DropdownMenuLabel>
          <DropdownMenuSeparator />
          {userType === "EMPLOYEE" || userType === "ADMIN" ? (
            <Link href="/admin" className=" cursor-pointer">
              <DropdownMenuItem className="cursor-pointer hover:text-yellow-600 transition-colors duration-100">
                Quản Lý
              </DropdownMenuItem>
            </Link>
          ) : (
            <>
              <Link href="/profile" className=" cursor-pointer">
                <DropdownMenuItem className=" cursor-pointer">
                  Thông Tin
                </DropdownMenuItem>
              </Link>
              <Link href="/profile/bookings" className=" cursor-pointer">
                <DropdownMenuItem className=" cursor-pointer">
                  Đơn Đặt Phòng
                </DropdownMenuItem>
              </Link>
            </>
          )}
          <Link
            href="/logOut"
            onClick={() => {
              setIsLoggedIn(false);
              localStorage.removeItem("token");
            }}
          >
            <DropdownMenuItem className=" cursor-pointer">
              Đăng Xuất
            </DropdownMenuItem>
          </Link>
        </DropdownMenuContent>
      </DropdownMenu>
    </div>
  );
};

export default AccountUser;

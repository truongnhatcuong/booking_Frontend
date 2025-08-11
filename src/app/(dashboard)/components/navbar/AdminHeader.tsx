import Link from "next/link";
import React from "react";

const AdminHeader = () => {
  return (
    <div className="navbar bg-base-100 shadow-sm mb-5">
      <div className="flex-1">
        <a className="btn btn-ghost text-xl" href="/admin">
          Bảng Điều Khiển
        </a>
      </div>
      <div className="flex-none">
        <div className="dropdown dropdown-end">
          <div
            tabIndex={0}
            role="button"
            className="btn btn-ghost btn-circle avatar"
          >
            <div className="w-10 rounded-full">
              <div className="h-8 w-8 rounded-full bg-gray-200 flex items-center justify-center">
                <span className="text-sm font-medium">AD</span>
              </div>
            </div>
          </div>
          <ul
            tabIndex={0}
            className="menu menu-sm dropdown-content bg-base-100 rounded-box z-1 mt-3 w-52 p-2 shadow"
          >
            <li>
              <Link href={"#"} className="justify-between">
                Thông Tin Cá Nhân
                <span className="badge">New</span>
              </Link>
            </li>
            <li>
              <Link href={"#"}>Cài Đặt</Link>
            </li>
            <li>
              <Link href={"/"}>Đăng Xuất</Link>
            </li>
          </ul>
        </div>
      </div>
    </div>
  );
};

export default AdminHeader;

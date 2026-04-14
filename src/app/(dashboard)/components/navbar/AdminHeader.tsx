"use client";
import Link from "next/link";
import React from "react";
import { useSidebar } from "../../context/contextAdmin";
import {
  ChevronLeft,
  ChevronRightIcon as ChevronRightDouble,
} from "lucide-react";
import AdminNotifications from "../AdminNotifications";
import useAuth from "@/lib/authUser";
import { useUserStore } from "@/hook/useUserStore";

const AdminHeader = () => {
  const { user } = useAuth();
  const { logout, user: storedUser } = useUserStore();
  const { isCollapsed, toggleCollapse } = useSidebar();

  console.log("storedUser?.role", storedUser?.role);

  return (
    <div className="navbar bg-base-100 shadow-sm mb-5">
      <div>
        <button
          onClick={toggleCollapse}
          className="p-1 rounded-md hover:bg-gray-100 transition-colors"
        >
          {isCollapsed ? (
            <ChevronRightDouble className="h-7 w-7" />
          ) : (
            <ChevronLeft className="h-7 w-7" />
          )}
        </button>
      </div>
      <div className="flex-1">
        <Link className="btn btn-ghost text-xl" href="/admin">
          Trang Quản Trị
        </Link>
      </div>
      <div className="mx-6">
        <AdminNotifications />
      </div>
      <div className="flex items-center gap-3">
        <div>
          <p className="text-base font-bold">
            {user?.firstName} {user?.lastName}
          </p>
          <p className="text-xs text-gray-500">{user?.email}</p>
        </div>
        <div className="dropdown dropdown-end">
          <div
            tabIndex={0}
            role="button"
            className="btn btn-ghost btn-circle avatar"
          >
            <div className="w-10 rounded-full">
              <div className="h-8 w-8 rounded-full bg-gray-200 flex items-center justify-center">
                <span className="text-sm font-medium">
                  {user?.firstName?.charAt(0).toUpperCase()}
                </span>
              </div>
            </div>
          </div>
          <ul
            tabIndex={0}
            className="menu menu-sm dropdown-content bg-base-100 rounded-box z-1 mt-3 w-52 p-2 shadow"
          >
            <li>
              <Link href={"/admin/profile"} className="justify-between">
                Thông Tin Cá Nhân
                <span className="badge">New</span>
              </Link>
            </li>
            {storedUser?.role === "Quản Lý" && (
              <li>
                <Link
                  href={
                    "https://docs.google.com/spreadsheets/d/1-1k7Mcmh7pIX8qfXdpT-QVTf5dqaLn7Nw_GPcx7IaBY/edit?gid=0#gid=0"
                  }
                  target="_blank"
                >
                  Quản Lý Dữ Liệu
                </Link>
              </li>
            )}

            <li>
              <button onClick={logout}>Đăng Xuất</button>
            </li>
          </ul>
        </div>
      </div>
    </div>
  );
};

export default AdminHeader;

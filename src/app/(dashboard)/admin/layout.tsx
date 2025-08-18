"use client";
import type React from "react";
import { SidebarProvider, useSidebar } from "../context/contextAdmin";
import AdminSidebar from "../components/navbar/AdminSidebar";
import AdminHeader from "../components/navbar/AdminHeader";
import useAuth from "@/lib/authUser";
import { useEffect, useRef, useState } from "react";
import socket from "@/lib/socket";

interface UserInfo {
  userId: string;
  role: string;
}

// This component will dynamically adjust based on sidebar state
function MainContent({ children }: { children: React.ReactNode }) {
  const { isCollapsed, waitingCustomers } = useSidebar();
  const { loadingLog } = useAuth(["EMPLOYEE", "ADMIN"]);
  // const [waitingCustomers, setWaitingCustomers] = useState<string[]>(() => {
  //   try {
  //     return JSON.parse(localStorage.getItem("waiting_customers") || "[]");
  //   } catch {
  //     return [];
  //   }
  // });

  // useEffect(() => {
  //   if (!socket.connected) socket.connect();

  //   // 1️⃣ Khi server gửi danh sách chờ mới
  //   const handleWaitingList = (customers: string[]) => {
  //     setWaitingCustomers((prev) => {
  //       const merged = Array.from(new Set([...prev, ...customers]));
  //       localStorage.setItem("waiting_customers", JSON.stringify(merged));
  //       return merged;
  //     });
  //   };

  //   // 2️⃣ Khi có tin nhắn mới từ khách, push senderId vào danh sách chờ
  //   const handleNewMessage = (msg: { senderId: string }) => {
  //     setWaitingCustomers((prev) => {
  //       if (prev.includes(msg.senderId)) return prev;
  //       const updated = [...prev, msg.senderId];
  //       localStorage.setItem("waiting_customers", JSON.stringify(updated));
  //       return updated;
  //     });
  //   };

  //   socket.on("waiting_customers", handleWaitingList);
  //   socket.on("receive_message", handleNewMessage);

  //   return () => {
  //     socket.off("waiting_customers", handleWaitingList);
  //     socket.off("receive_message", handleNewMessage);
  //   };
  // }, []);

  if (loadingLog) {
    return <div>Đang kiểm tra quyền truy cập...</div>;
  }

  return (
    <main
      className={`transition-all duration-300 p-4 md:p-8 pt-16 md:pt-8 ${
        isCollapsed ? "md:ml-16" : "md:ml-64"
      }`}
    >
      {children}
    </main>
  );
}

export default function AdminLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <SidebarProvider>
      <div className="min-h-screen bg-gray-100">
        <AdminSidebar />

        <MainContent>
          <AdminHeader />
          {children}
        </MainContent>
      </div>
    </SidebarProvider>
  );
}

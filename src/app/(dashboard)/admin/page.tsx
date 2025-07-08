"use client";
import React from "react";
import CardStatistical from "../components/statistical/CardStatistical";
import useSWR from "swr";
import RevenueTotalMonth from "../components/statistical/RevenueTotalMonth";
import CustomerBarChart from "../components/statistical/CustomerBarChart";
import BookingResourceChart from "../components/statistical/BookingResourceChart";
import useAuth from "@/lib/authUser";

const Page = () => {
  const { data, isLoading } = useSWR("/api/dashboard/revenue-total-month");
  const { data: customerData, isLoading: isLoadingCustomers } = useSWR(
    "/api/dashboard/customer-count-by-month"
  );
  const { data: bookingResource, isLoading: isLoadingBookings } = useSWR(
    "/api/dashboard/revenue-online-offline"
  );
  const { loadingLog } = useAuth(["EMPLOYEE", "ADMIN"]);
  if (isLoading) {
    return (
      <div className="flex justify-center items-center h-screen">
        <p className="text-gray-500">Loading...</p>
      </div>
    );
  }
  if (isLoadingCustomers) {
    return (
      <div className="flex justify-center items-center h-screen">
        <p className="text-gray-500">Loading customer data...</p>
      </div>
    );
  }
  if (isLoadingBookings) {
    return (
      <div className="flex justify-center items-center h-screen">
        <p className="text-gray-500">Loading booking data...</p>
      </div>
    );
  }
  const formattedData = bookingResource.data?.map((item: any) => ({
    name: item.month,
    online: item.online,
    offline: item.offline,
  }));

  if (loadingLog) return "đang kiểm tra quyền truy cập";
  return (
    // <div>
    //   {" "}
    //   <CardStatistical />
    //   {/* biểu đồ doanh thu theo tháng và khách hàng */}
    //   <div className="grid grid-cols-1 md:grid-cols-[3fr_2fr] gap-2 items-center">
    //     <RevenueTotalMonth data={data || []} />
    //     <CustomerBarChart data={customerData.data || []} />
    //   </div>
    //   {/* biểu đồ doanh thu online offline */}
    //   <BookingResourceChart data={formattedData || null} />
    // </div>
    <div></div>
  );
};

export default Page;

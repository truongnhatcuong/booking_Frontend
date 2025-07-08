"use client";
import React from "react";
import ProfileChangePassword from "../components/ProfileChangePassword";
import useAuth from "@/lib/authUser";

const PageChangPassword = () => {
  const { loadingLog } = useAuth(["CUSTOMER"]);

  if (loadingLog) return <div>Đang kiểm tra quyền...</div>;
  return (
    <>
      <ProfileChangePassword />
    </>
  );
};

export default PageChangPassword;

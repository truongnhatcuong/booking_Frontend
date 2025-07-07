"use client";
import { URL_API } from "@/lib/fetcher";
import React from "react";
import useSWR from "swr";

const page = () => {
  const { data } = useSWR(
    `https://booking-backend-sage.vercel.app/api/room/customer`
  );
  console.log("là ", URL_API);

  console.log(data);

  return <div></div>;
};

export default page;

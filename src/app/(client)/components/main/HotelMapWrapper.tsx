// app/components/main/HotelMapWrapper.tsx
"use client";
import dynamic from "next/dynamic";

const HotelMap = dynamic(() => import("./HotelMap"), { ssr: false });

export default function HotelMapWrapper() {
  return <HotelMap />;
}

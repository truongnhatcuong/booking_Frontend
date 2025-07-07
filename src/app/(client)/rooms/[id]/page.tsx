"use client";
import React, { use } from "react";
import CardRoom from "../components/CardRoom";
import useSWR from "swr";
import { fetcher } from "@/lib/fetcher";

type RoomPageProps = {
  params: Promise<{ id: string }>;
};
export default function Page({ params }: RoomPageProps) {
  const { id } = use(params); // Unwrap params bằng React.use()

  const { data } = useSWR(
    `${process.env.NEXT_PUBLIC_URL_API}/api/room/roomtype/${id}`,
    fetcher
  );
  console.log("Data", data);

  if (!data) {
    return <div>Loading...</div>;
  }
  return <div>{<CardRoom room={data ? data.room : {}} />}</div>;
}

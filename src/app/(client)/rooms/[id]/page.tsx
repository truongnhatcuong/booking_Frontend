"use client";
import React, { use } from "react";
import CardRoom from "../components/CardRoom";
import useSWR from "swr";
import { HeroSection } from "../../components/common/HeroSection";

type RoomPageProps = {
  params: Promise<{ id: string }>;
};
export default function Page({ params }: RoomPageProps) {
  const { id } = use(params); // Unwrap params bằng React.use()

  const { data, isLoading } = useSWR(`/api/room/roomtype/${id}`);

  if (!data || isLoading) {
    return <div>Loading...</div>;
  }
  return (
    <div>
      <HeroSection
        title={data.room.name ?? ""}
        backgroundImage={data.room.photoUrls ?? ""}
        description={data.room.description ?? ""}
      />

      <CardRoom room={data ? data.room : {}} />
    </div>
  );
}

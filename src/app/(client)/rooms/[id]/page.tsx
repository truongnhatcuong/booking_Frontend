import CardRoom from "../components/CardRoom";
import { HeroSection } from "../../components/common/HeroSection";
import axiosInstance from "@/lib/axios";

export default async function Page({ params }: { params: { id: string } }) {
  const { id } = await params;

  const res = await axiosInstance.get(`/api/room/roomtype/${id}`);

  if (!res.data) {
    throw new Error("Failed to fetch room data");
  }
  const data = res.data;
  return (
    <div>
      <HeroSection
        title={data.room.name ?? ""}
        backgroundImage={data.room.photoUrls ?? ""}
        description={data.room.description ?? ""}
      />

      <CardRoom room={data.room} />
    </div>
  );
}

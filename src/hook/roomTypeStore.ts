import { create } from "zustand";

interface Amenity {
  id: string;
  name: string;
  description: string | null;
}

export interface IRoomType {
  id: string;
  name: string;
  description: string | null;
  maxOccupancy: number;
  photoUrls: string; // JSON string array<
  amenities: {
    amenity: Amenity;
  }[];
}

interface RoomTypeState {
  roomType: IRoomType[];
  setRoomTypes: (data: IRoomType[]) => void;
}

export const useRoomTypeStore = create<RoomTypeState>((set) => ({
  roomType: [],
  setRoomTypes: (data: IRoomType[]) => set({ roomType: data }),
}));

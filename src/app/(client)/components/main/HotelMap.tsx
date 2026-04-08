"use client";
import dynamic from "next/dynamic";
import { useEffect, useState } from "react";
import "leaflet/dist/leaflet.css";
import L from "leaflet";

// Dynamically import the MapContainer, Marker, and Popup to avoid SSR issues
const MapContainer = dynamic(
  () => import("react-leaflet").then((mod) => mod.MapContainer),
  { ssr: false },
);
const TileLayer = dynamic(
  () => import("react-leaflet").then((mod) => mod.TileLayer),
  { ssr: false },
);
const Marker = dynamic(
  () => import("react-leaflet").then((mod) => mod.Marker),
  { ssr: false },
);
const Popup = dynamic(() => import("react-leaflet").then((mod) => mod.Popup), {
  ssr: false,
});

export default function HotelMap() {
  const [icon, setIcon] = useState<L.Icon | null>(null);
  const [isClient, setIsClient] = useState(false); // Client-side check

  // Explicitly type position as LatLngTuple (latitude, longitude)
  const position: [number, number] = [16.07532073894757, 108.22268965344279]; // Hotel coordinates (Da Nang)

  useEffect(() => {
    if (typeof window !== "undefined") {
      setIsClient(true); // Mark as client-side
    }
  }, []);

  useEffect(() => {
    if (isClient) {
      const customIcon = new L.Icon({
        iconUrl:
          "https://cdnjs.cloudflare.com/ajax/libs/leaflet/1.7.1/images/marker-icon.png",
        shadowUrl:
          "https://cdnjs.cloudflare.com/ajax/libs/leaflet/1.7.1/images/marker-shadow.png",
        iconSize: [25, 41],
        iconAnchor: [12, 41],
      });
      setIcon(customIcon);
    }
  }, [isClient]);

  if (!icon || !isClient)
    return <div className="h-[500px] bg-gray-100 animate-pulse" />;

  return (
    <div className="h-[700px] w-full mx-4 lg:mx-0 -z-10 my-10">
      <MapContainer
        center={position} // `position` is now typed as LatLngTuple
        zoom={15}
        scrollWheelZoom={false}
        style={{ height: "100%", width: "100%" }}
      >
        <TileLayer
          attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
          url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
        />
        <Marker position={position} icon={icon}>
          <Popup>
            <div className="font-sans flex flex-col items-center gap-2">
              <h3 className="font-bold text-blue-600">DTU Hotel</h3>
              <p className="text-sm">Vị trí tuyệt vời ngay mặt sông!</p>
              <button
                className="bg-blue-500 hover:bg-blue-700 text-center text-white font-bold py-2 px-4 rounded"
                onClick={() => {
                  const url = `https://www.google.com/maps/dir/?api=1&destination=${position[0]},${position[1]}`;
                  window.open(url, "_blank");
                }}
              >
                Đi Đến
              </button>
            </div>
          </Popup>
        </Marker>
      </MapContainer>
    </div>
  );
}

// app/components/main/HotelHighlightsServer.tsx
import HotelHighlightsCarousel from "./Hotel-Highlights";

async function fetchHighlights() {
  const range = "Hotel-Highlights!A2:H6";
  const sheetId = process.env.NEXT_PUBLIC_GGSHEETID;
  const apiKey = process.env.NEXT_PUBLIC_API_GGSHEET;

  try {
    const res = await fetch(
      `https://sheets.googleapis.com/v4/spreadsheets/${sheetId}/values/${range}?key=${apiKey}`,
      { next: { revalidate: 3600 }, cache: "force-cache" },
    );
    const data = await res.json();
    return data.values.map((row: string[]) => ({
      id: row[0],
      title: row[1],
      description: row[2],
      image: row[3],
      icon: row[4],
      features: [row[5], row[6], row[7]].filter(Boolean),
    }));
  } catch (error) {
    console.error("Error fetching highlights:", error);
    return [];
  }
}

const HotelHighlightsServer = async () => {
  const highlights = await fetchHighlights();
  return <HotelHighlightsCarousel highlights={highlights} />;
};

export default HotelHighlightsServer;

// app/components/main/BannerServer.tsx  (Server Component - không có "use client")
import BannerClient from "./Banner";

async function fetchBannerImages(): Promise<string[]> {
  const range = "bannerHome!A2:C3";
  const sheetId = process.env.NEXT_PUBLIC_GGSHEETID;
  const apiKey = process.env.NEXT_PUBLIC_API_GGSHEET;

  try {
    const res = await fetch(
      `https://sheets.googleapis.com/v4/spreadsheets/${sheetId}/values/${range}?key=${apiKey}`,
      { next: { revalidate: 60 } }, // cache 1 tiếng, dùng 0 nếu muốn luôn mới
    );
    const data = await res.json();
    return data.values?.[0] ?? [];
  } catch (error) {
    console.error("Error fetching banner images:", error);
    return [];
  }
}

const BannerServer = async () => {
  const images = await fetchBannerImages();
  return <BannerClient images={images} />;
};

export default BannerServer;

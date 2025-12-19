import MiniStatsChat from "../../components/statistical/MiniStatsChat";
import ElegantTitle from "../../components/TitleDashboard/ElegantTitle";

export default function Page() {
  return (
    <main className="bg-white p-4 rounded-2xl">
      <ElegantTitle title="Thông Kê Doanh Thu" className="mb-5" />
      <MiniStatsChat />
    </main>
  );
}

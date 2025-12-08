import { Metadata } from "next";
import Footer from "./components/footer/Footer";
import Header from "./components/header/Header";
import HeaderTop from "./components/header/HeaderTop";

export const metadata: Metadata = {
  title: "XTRAVEL - Travel Agency",
  description: "Trang chủ của XTRAVEL",
  icons: {
    icon: "/logotittle.svg",
  },
};
export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <div className={`flex flex-col h-screen`}>
      <header>
        <HeaderTop />
        <Header />
      </header>
      <main className="flex-1">{children}</main>
      <footer>
        <Footer />
      </footer>
    </div>
  );
}

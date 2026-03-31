import React from "react";
import Link from "next/link";

const stats = [
  { value: "5+", label: "Hạng phòng sang trọng" },
  { value: "24/7", label: "Dịch vụ & hỗ trợ khách" },
  { value: "100%", label: "Hài lòng & tin tưởng" },
];

const AboutPage = () => {
  return (
    <section className="relative overflow-hidden bg-white py-10">
      {/* Soft background blobs */}
      <div className="pointer-events-none absolute inset-0 -z-10">
        <div className="absolute -top-40 -left-40 h-[500px] w-[500px] rounded-full bg-amber-50 blur-3xl" />
        <div className="absolute top-20 -right-40 h-[400px] w-[400px] rounded-full bg-rose-50 blur-3xl" />
        <div className="absolute bottom-0 left-1/2 -translate-x-1/2 h-64 w-3/4 rounded-full bg-yellow-50 blur-3xl" />
      </div>

      <div className="relative mx-auto max-w-7xl px-6 lg:px-10">
        {/* ── Badge + Heading ── */}
        <div className="mb-16 text-center">
          <span className="inline-flex items-center gap-2 rounded-full border  px-4 py-1.5 text-xs font-semibold uppercase tracking-[0.2em] text-amber-600">
            dtuHotel
            <span className="h-1.5 w-1.5 rounded-full bg-amber-400" />
            Since 2025
          </span>

          <h1 className="mt-6 text-3xl font-bold tracking-tight text-slate-900 md:text-5xl lg:text-6xl">
            Hãy đến{" "}
            <span className="relative inline-block">
              <span className="bg-gradient-to-r from-amber-400 via-yellow-400 to-rose-400 bg-clip-text text-transparent">
                dtuHotel
              </span>
              {/* underline accent */}
              <svg
                className="absolute -bottom-1 left-0 w-full"
                viewBox="0 0 200 8"
                fill="none"
                preserveAspectRatio="none"
              >
                <path
                  d="M0 6 Q50 1 100 5 Q150 9 200 4"
                  stroke="url(#u)"
                  strokeWidth="2.5"
                  strokeLinecap="round"
                />
                <defs>
                  <linearGradient
                    id="u"
                    x1="0"
                    y1="0"
                    x2="200"
                    y2="0"
                    gradientUnits="userSpaceOnUse"
                  >
                    <stop stopColor="#fbbf24" />
                    <stop offset="0.5" stopColor="#facc15" />
                    <stop offset="1" stopColor="#fb7185" />
                  </linearGradient>
                </defs>
              </svg>
            </span>{" "}
            để trải nghiệm sự khác biệt.
          </h1>

          <p className="mx-auto mt-5 max-w-2xl text-base leading-relaxed text-slate-500 md:text-lg">
            Khách sạn 5 sao đẳng cấp quốc tế, tọa lạc tại giao điểm của bốn quận
            trung tâm TP. Đà Nẵng — nơi năng động bậc nhất Đà Nẵng hoa lệ.
          </p>
        </div>

        {/* ── Main layout ── */}
        <div className="flex flex-col items-center gap-14 lg:flex-row lg:gap-16">
          {/* ── Left: text content ── */}
          <div className="flex-1 space-y-7">
            {/* Description */}
            <div className="rounded-3xl border border-slate-100 bg-slate-50/80 p-8 shadow-sm">
              {[
                "Với hệ thống phòng tiêu chuẩn và hạng sang được thiết kế tinh tế, dtuHotel mang đến không gian nghỉ dưỡng sang trọng, tiện nghi và riêng tư cho mọi kỳ nghỉ hay chuyến công tác của bạn.",
                "dtuHotel tích hợp đầy đủ dịch vụ cao cấp: nhà hàng, phòng hội nghị, hồ bơi, đưa đón sân bay, tour du lịch, sân golf và hỗ trợ vé máy bay với chất lượng hàng đầu.",
                "Đội ngũ nhân viên chuyên nghiệp, chu đáo, thân thiện luôn sẵn sàng đáp ứng mọi nhu cầu, mang đến trải nghiệm cá nhân hóa cho từng vị khách.",
                "Đến với dtuHotel là đến với sự tinh tế trong chất lượng, dịch vụ và cảm giác thân thuộc như đang ở chính ngôi nhà thứ hai của bạn.",
              ].map((text, i) => (
                <p
                  key={i}
                  className={`text-sm md:text-base leading-relaxed text-slate-600 ${i > 0 ? "mt-4 border-t border-slate-100 pt-4" : ""}`}
                >
                  {text}
                </p>
              ))}
            </div>

            {/* Stats */}
            <div className="grid grid-cols-3 gap-3">
              {stats.map((s) => (
                <div
                  key={s.value}
                  className="group rounded-2xl border border-amber-100 bg-gradient-to-b from-amber-50 to-white p-4 text-center shadow-sm transition hover:border-amber-300 hover:shadow-md"
                >
                  <div className="text-2xl font-bold text-amber-500 md:text-3xl">
                    {s.value}
                  </div>
                  <div className="mt-1.5 text-xs leading-snug text-slate-500">
                    {s.label}
                  </div>
                </div>
              ))}
            </div>

            {/* Service pills */}
            <div className="flex flex-wrap gap-2">
              {[
                "Nhà hàng",
                "Hồ bơi",
                "Hội nghị",
                "Đưa đón sân bay",
                "Tour du lịch",
                "Sân golf",
              ].map((s) => (
                <span
                  key={s}
                  className="rounded-full border border-slate-200 bg-white px-3.5 py-1 text-xs font-medium text-slate-600 shadow-sm"
                >
                  {s}
                </span>
              ))}
            </div>

            {/* CTA */}
            <div className="flex flex-wrap items-center gap-3 pt-1">
              <Link
                href="/rooms/18a8e9bc-b4e2-4597-9fd2-571eb3a32ead"
                className="group inline-flex items-center justify-center rounded-full bg-red-500  px-7 py-3 text-sm font-semibold text-white  transition hover:scale-[1.02] hover:shadow-xl "
              >
                Đặt phòng ngay
                <span className="ml-2 inline-block transition-transform group-hover:translate-x-1">
                  →
                </span>
              </Link>
              <Link
                href="/blog"
                className="inline-flex items-center justify-center rounded-full border border-slate-200 bg-white px-6 py-3 text-sm font-medium text-slate-600 shadow-sm transition hover:border-amber-300 hover:text-amber-600 hover:shadow-md"
              >
                Khám phá bài viết
              </Link>
            </div>
          </div>

          {/* ── Right: image ── */}
          <div className="flex-shrink-0">
            <div className="relative">
              {/* Outer glow */}
              <div className="absolute -inset-6 rounded-full  blur-2xl opacity-80" />

              {/* Dashed orbit ring */}
              <div className="absolute inset-0 rounded-full border-2 border-dashed border-amber-200 animate-[spin_18s_linear_infinite]" />

              {/* Image */}
              <div className="relative lg:h-[440px] lg:w-[440px] h-72 w-72 overflow-hidden rounded-full border-4 border-white shadow-2xl shadow-amber-100/60">
                <img
                  src="/image/alper-gio-thieu.webp"
                  alt="dtuHotel"
                  className="h-full w-full object-cover"
                />
              </div>

              {/* Badge: mở cửa */}
              <div className="absolute -top-3 left-6 flex items-center gap-2 rounded-full border border-green-100 bg-white px-3.5 py-1.5 shadow-md">
                <span className="h-2 w-2 animate-pulse rounded-full bg-green-400" />
                <span className="text-xs font-semibold text-slate-700">
                  Đang mở cửa
                </span>
              </div>

              {/* Badge: 5 sao */}
              <div className="absolute -bottom-3 right-6 flex items-center gap-1.5 rounded-full border border-amber-100 bg-white px-3.5 py-1.5 shadow-md">
                <span className="text-base leading-none text-amber-400">★</span>
                <span className="text-xs font-semibold text-slate-700">
                  5 sao quốc tế
                </span>
              </div>

              {/* Badge: Đà Nẵng */}
              <div className="absolute top-1/2 -right-6 -translate-y-1/2 flex items-center gap-1.5 rounded-full border border-sky-100 bg-white px-3 py-1.5 shadow-md">
                <span className="text-xs font-semibold text-sky-600">
                  📍 Đà Nẵng
                </span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default AboutPage;

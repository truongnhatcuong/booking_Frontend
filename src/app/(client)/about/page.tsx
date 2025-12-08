import React from "react";
import Link from "next/link";

const AboutPage = () => {
  return (
    <section className="relative overflow-hidden bg-gradient-to-b from-slate-950 via-slate-900 to-slate-950 py-12 md:py-20">
      {/* Background decor */}
      <div className="pointer-events-none absolute inset-0">
        <div className="absolute -left-24 -top-24 h-72 w-72 rounded-full bg-amber-500/20 blur-3xl" />
        <div className="absolute -right-32 top-40 h-80 w-80 rounded-full bg-rose-500/20 blur-3xl" />
        <div className="absolute inset-x-0 bottom-0 h-40 bg-gradient-to-t from-slate-950 to-transparent" />
      </div>

      <div className="relative mx-auto  px-4 lg:px-6">
        {/* Heading */}
        <div className="mb-10 text-center">
          <span className="inline-flex items-center gap-2 rounded-full border border-amber-400/30 bg-amber-400/5 px-3 py-1 text-xs font-semibold uppercase tracking-[0.25em] text-amber-300">
            dtuHotel
            <span className="h-1 w-1 rounded-full bg-amber-300" />
            Since 2025
          </span>
          <h1 className="mt-5 text-2xl md:text-4xl font-bold tracking-tight text-white">
            Hãy đến dtuHotel để{" "}
            <span className="bg-gradient-to-r from-amber-300 via-yellow-400 to-rose-300 bg-clip-text text-transparent">
              trải nghiệm sự khác biệt
            </span>
            .
          </h1>
          <p className="mx-auto mt-4 max-w-2xl text-sm md:text-base text-slate-300">
            Khách sạn 5 sao đẳng cấp quốc tế, tọa lạc tại giao điểm của bốn quận
            trung tâm TP. Đà Nẵng – nơi năng động bậc nhất Đà Nẵng hoa lệ.
          </p>
        </div>

        {/* Main content */}
        <div className="flex justify-around items-center">
          {/* Text block */}
          <div className="space-y-5 max-w-6xl ">
            <div className="rounded-2xl bg-white/5 p-6 shadow-[0_18px_60px_rgba(15,23,42,0.85)] ring-1 ring-white/10 backdrop-blur-xl">
              <p className="text-sm md:text-base leading-relaxed text-slate-100">
                Với hệ thống phòng tiêu chuẩn và hạng sang được thiết kế tinh
                tế, dtuHotel mang đến không gian nghỉ dưỡng sang trọng, tiện
                nghi và riêng tư cho mọi kỳ nghỉ hay chuyến công tác của bạn.
              </p>
              <p className="mt-3 text-sm md:text-base leading-relaxed text-slate-200">
                dtuHotel tích hợp đầy đủ dịch vụ cao cấp: nhà hàng, phòng hội
                nghị, hồ bơi, đưa đón sân bay, tour du lịch, sân golf và hỗ trợ
                vé máy bay với chất lượng hàng đầu, giúp hành trình của bạn trọn
                vẹn từng khoảnh khắc.
              </p>
              <p className="mt-3 text-sm md:text-base leading-relaxed text-slate-200">
                Đội ngũ nhân viên được tuyển chọn và đào tạo chuyên nghiệp, chu
                đáo, thân thiện luôn sẵn sàng đáp ứng mọi nhu cầu, mang đến trải
                nghiệm cá nhân hóa cho từng vị khách.
              </p>
              <p className="mt-3 text-sm md:text-base leading-relaxed text-slate-200">
                Đến với dtuHotel là đến với sự tinh tế trong chất lượng, dịch vụ
                và cảm giác thân thuộc như đang ở chính ngôi nhà thứ hai của
                bạn.
              </p>
            </div>

            {/* Highlight stats */}
            <div className="grid gap-4 sm:grid-cols-3">
              <div className="rounded-2xl border border-white/10 bg-white/5 px-4 py-3 text-center backdrop-blur-xl">
                <div className="text-lg md:text-2xl font-semibold text-amber-300">
                  5+
                </div>
                <div className="mt-1 text-xs md:text-sm text-slate-300">
                  Hạng phòng sang trọng
                </div>
              </div>
              <div className="rounded-2xl border border-white/10 bg-white/5 px-4 py-3 text-center backdrop-blur-xl">
                <div className="text-lg md:text-2xl font-semibold text-amber-300">
                  24/7
                </div>
                <div className="mt-1 text-xs md:text-sm text-slate-300">
                  Dịch vụ & hỗ trợ khách
                </div>
              </div>
              <div className="rounded-2xl border border-white/10 bg-white/5 px-4 py-3 text-center backdrop-blur-xl">
                <div className="text-lg md:text-2xl font-semibold text-amber-300">
                  100%
                </div>
                <div className="mt-1 text-xs md:text-sm text-slate-300">
                  Hài lòng & tin tưởng
                </div>
              </div>
            </div>

            {/* CTA */}
            <div className="flex flex-wrap items-center gap-3 pt-2">
              <Link
                href="/rooms/18a8e9bc-b4e2-4597-9fd2-571eb3a32ead"
                className="group inline-flex items-center justify-center rounded-full bg-gradient-to-r from-amber-400 via-yellow-400 to-rose-400 px-6 py-2.5 text-sm font-semibold text-slate-950 shadow-[0_18px_40px_rgba(251,191,36,0.45)] transition hover:shadow-[0_22px_60px_rgba(251,191,36,0.65)]"
              >
                Đặt phòng ngay
                <span className="ml-2 inline-block transition-transform group-hover:translate-x-0.5">
                  →
                </span>
              </Link>
              <Link
                href="/blog"
                className="inline-flex items-center justify-center rounded-full border border-white/20 bg-white/5 px-5 py-2 text-sm font-medium text-slate-100 backdrop-blur-lg transition hover:border-amber-300/60 hover:text-amber-100"
              >
                Khám phá bài viết của chúng tôi
              </Link>
            </div>
          </div>

          {/* Image / visual */}
          <div>
            {/* images cycle  rounder  */}
            <div className="relative flex justify-center px-4 lg:px-0">
              {/* Outer border circle */}
              <div className="border-4 border-red-500 rounded-full lg:w-150 lg:h-150 w-80 h-80 flex items-center justify-center relative max-w-full">
                {/* Main circular image - stays in center */}
                <div className="relative lg:w-125 lg:h-125 w-64 h-64 rounded-full overflow-hidden">
                  <img
                    src={"/image/alper-gio-thieu.webp"}
                    alt="Company team"
                    className="w-full h-full object-cover"
                  />
                </div>

                {/* Rotating dots container - */}
                <div className="absolute inset-0 animate-orbit overflow-hidden">
                  <div className="absolute lg:top-4 lg:left-6 lg:w-32 lg:h-32 w-12 h-12 top-2 left-8 bg-red-500 rounded-full opacity-50"></div>
                  <div className="absolute lg:top-10 lg:right-24 lg:w-10 lg:h-10 w-6 h-6 top-6 right-11 bg-red-500 rounded-full"></div>
                  <div className="absolute lg:bottom-5 lg:right-25 lg:w-13 lg:h-13 h-8 w-8 bottom-2 right-13 bg-red-500 rounded-full"></div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default AboutPage;

import type { Metadata } from "next";
import localFont from "next/font/local";
import { FirebaseAnalytics } from "@/components/FirebaseAnalytics";
import "./globals.css";

const popFont = localFont({
  src: "../font/ONE Mobile POP.ttf",
  display: "swap",
});

export const metadata: Metadata = {
  title: "할로윈 몬스터 짝꿍 테스트",
  description: "이름으로 알아보는 몬스터 짝꿍 궁합 테스트",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="ko">
      <body
        className={`${popFont.className} bg-neutral-950 h-dvh overflow-hidden flex items-center justify-center`}
      >
        <FirebaseAnalytics />
        <main className="no-scrollbar relative flex h-full w-full items-center justify-center overflow-hidden overscroll-none">
          <div className="relative h-full w-full max-w-[430px] overflow-hidden bg-black shadow-2xl md:h-[932px] md:rounded-[40px] md:border md:border-neutral-800">
            {children}
          </div>
        </main>
      </body>
    </html>
  );
}

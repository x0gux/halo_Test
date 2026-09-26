import type { Metadata, Viewport } from "next";
import localFont from "next/font/local";
import "./globals.css";

const popFont = localFont({
  src: "../font/ONE Mobile POP.ttf",
  display: "swap",
});

const SITE_URL = process.env.NEXT_PUBLIC_SITE_URL;
const NAVER_VERIFICATION = process.env.NEXT_PUBLIC_NAVER_VERIFICATION;

const TITLE = "할로윈 몬스터 짝꿍 테스트";
const DESCRIPTION =
  "이름만 입력하면 8종 할로윈 몬스터 궁합 결과를 바로 확인! 드라큘라·마녀·유령 중 나의 짝꿍은 누구? 친구·연인 궁합 테스트를 공유해 보세요.";

export const viewport: Viewport = {
  themeColor: "#000000",
  width: "device-width",
  initialScale: 1,
};

export const metadata: Metadata = {
  metadataBase: SITE_URL != null ? new URL(SITE_URL) : undefined,
  title: {
    default: `${TITLE} | 이름 궁합 확인`,
    template: `%s | ${TITLE}`,
  },
  description: DESCRIPTION,
  keywords: [
    "할로윈궁합테스트",
    "할로윈 궁합 테스트",
    "몬스터 궁합 테스트",
    "짝꿍 테스트",
    "이름 궁합",
    "이름 궁합 테스트",
    "할로윈 심리테스트",
    "할로윈 테스트",
    "할로윈 MBTI",
    "할로윈 몬스터 테스트",
    "커플 궁합 테스트",
    "친구 궁합 테스트",
  ],
  authors: [{ name: TITLE }],
  creator: TITLE,
  category: "entertainment",
  robots: { index: true, follow: true },
  manifest: "/manifest.json",
  appleWebApp: {
    capable: true,
    title: TITLE,
    statusBarStyle: "black-translucent",
  },
  formatDetection: { telephone: false },
  openGraph: {
    type: "website",
    locale: "ko_KR",
    siteName: TITLE,
    title: `${TITLE} | 이름 궁합 확인`,
    description: DESCRIPTION,
  },
  twitter: {
    card: "summary_large_image",
    title: `${TITLE} | 이름 궁합 확인`,
    description: DESCRIPTION,
  },
  verification: {
    google:
      process.env.NEXT_PUBLIC_GOOGLE_VERIFICATION ??
      "WxC9XCYGgpyXBf4Kql2ngi0NF4LtBHme31-ndCBkPcE",
    ...(NAVER_VERIFICATION != null && NAVER_VERIFICATION !== ""
      ? { other: { "naver-site-verification": NAVER_VERIFICATION } }
      : {}),
  },
};

const JSON_LD = {
  "@context": "https://schema.org",
  "@type": "WebApplication",
  name: TITLE,
  alternateName: ["할로윈궁합테스트", "몬스터 짝꿍 테스트"],
  applicationCategory: "EntertainmentApplication",
  operatingSystem: "Web",
  inLanguage: "ko",
  description: DESCRIPTION,
  offers: { "@type": "Offer", price: "0" },
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
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(JSON_LD) }}
        />
        <main className="no-scrollbar relative flex h-full w-full items-center justify-center overflow-hidden overscroll-none">
          <h1 className="sr-only">
            할로윈 몬스터 짝꿍 테스트 — 이름으로 알아보는 몬스터 궁합
          </h1>
          <div className="relative h-full w-full max-w-[430px] overflow-hidden bg-black shadow-2xl md:h-[932px] md:rounded-[40px] md:border md:border-neutral-800">
            {children}
          </div>
        </main>
      </body>
    </html>
  );
}

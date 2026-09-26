import type { Metadata } from "next";
import { headers } from "next/headers";
import { MatchApp } from "@/components/match/MatchApp";
import { getMatchResult } from "@/lib/calculator";

async function getBaseUrl(): Promise<string> {
  const h = await headers();
  const host =
    h.get("x-forwarded-host") ?? h.get("host") ?? "localhost:3000";
  const proto = h.get("x-forwarded-proto") ?? "http";
  return `${proto}://${host}`;
}

export async function generateMetadata({
  searchParams,
}: {
  searchParams: Promise<{ n1?: string; n2?: string }>;
}): Promise<Metadata> {
  const base = await getBaseUrl();
  const { n1 = "", n2 = "" } = await searchParams;
  const fallbackOg = `${base}/api/og`;

  if (!n1.trim() || !n2.trim()) {
    const title = "할로윈 몬스터 짝꿍 테스트";
    const description = "이름으로 알아보는 몬스터 짝꿍 궁합 테스트";
    return {
      title,
      description,
      metadataBase: new URL(base),
      openGraph: {
        title,
        description,
        images: [{ url: fallbackOg, width: 1200, height: 630 }],
      },
      twitter: {
        card: "summary_large_image",
        title,
        description,
        images: [fallbackOg],
      },
    };
  }

  const result = getMatchResult(n1.trim(), n2.trim());
  const title = `${n1.trim()}와 ${n2.trim()}의 궁합은 ${result.score}%!`;
  const description = `${result.monster1.name} × ${result.monster2.name} — ${result.chemiTitle}`;
  const og =
    `${base}/api/og?n1=${encodeURIComponent(n1.trim())}` +
    `&n2=${encodeURIComponent(n2.trim())}&v=2`;
  return {
    title,
    description,
    metadataBase: new URL(base),
    openGraph: {
      title,
      description,
      images: [{ url: og, width: 1200, height: 630 }],
    },
    twitter: {
      card: "summary_large_image",
      title,
      description,
      images: [og],
    },
  };
}

export default function Home() {
  return <MatchApp />;
}

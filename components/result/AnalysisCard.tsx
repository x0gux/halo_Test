import type { MatchResult } from "@/lib/calculator";

export function ScoreBoard({ score }: { score: number }) {
  return (
    <p className="mt-3 text-center text-[23px] font-black [@media(max-height:720px)]:mt-2 [@media(max-height:720px)]:text-[19px]">
      우리의 궁합은{" "}
      <span className="text-[#ff9d00] text-[52px] font-black align-middle [@media(max-height:720px)]:text-[34px]">{score}%</span>{" "}
      입니다!
    </p>
  );
}

export function AnalysisCard({ result }: { result: MatchResult }) {
  return (
    <div className="mx-8 mt-3 rounded-lg border-[1.5px] border-[#ff9d00] px-6 py-3 [@media(max-height:720px)]:mt-2 [@media(max-height:720px)]:py-2">
      <p className="text-center text-[22px] font-black text-[#ff9d00] [@media(max-height:720px)]:text-[17px]">
        {result.chemiTitle}
      </p>
      <p className="mt-3 text-center text-[17px] font-bold leading-snug whitespace-pre-line [@media(max-height:720px)]:mt-2 [@media(max-height:720px)]:text-[14px] max-[380px]:text-[14px]">
        {result.analysis}
      </p>
      <p className="mt-2 text-center text-[15px] text-white/70 leading-snug [@media(max-height:720px)]:mt-1 [@media(max-height:720px)]:text-[12px] max-[380px]:text-[12px]">
        ⚠️ {result.caution}
      </p>
    </div>
  );
}

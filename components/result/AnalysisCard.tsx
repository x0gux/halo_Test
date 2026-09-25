import type { MatchResult } from "@/lib/calculator";

export function ScoreBoard({ score }: { score: number }) {
  return (
    <p className="mt-4 text-center text-[22px] font-black">
      우리의 궁합은{" "}
      <span className="text-[#ff9d00] text-[44px] font-black align-middle">{score}%</span>{" "}
      입니다!
    </p>
  );
}

export function AnalysisCard({ result }: { result: MatchResult }) {
  return (
    <div className="mx-8 mt-3 rounded-lg border-[1.5px] border-[#ff9d00] px-6 py-4">
      <p className="text-center text-[20px] font-black text-[#ff9d00]">
        {result.chemiTitle}
      </p>
      <p className="mt-3 text-center text-[16px] font-bold leading-snug whitespace-pre-line">
        {result.analysis}
      </p>
      <p className="mt-2 text-center text-[14px] text-white/70 leading-snug">
        ⚠️ {result.caution}
      </p>
    </div>
  );
}

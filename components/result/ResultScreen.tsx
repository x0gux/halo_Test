import { useMemo } from "react";
import { getMatchResult } from "@/lib/calculator";
import { DisclaimerFooter } from "@/components/common/DisclaimerFooter";
import { StickerTitle } from "@/components/common/StickerTitle";
import { AnalysisCard, ScoreBoard } from "@/components/result/AnalysisCard";
import { MonsterCard } from "@/components/result/MonsterCard";
import { ShareButtons } from "@/components/result/ShareButtons";

interface ResultScreenProps {
  name1: string;
  name2: string;
  onRetry: () => void;
}

export function ResultScreen({ name1, name2, onRetry }: ResultScreenProps) {
  const result = useMemo(() => getMatchResult(name1, name2), [name1, name2]);

  return (
    <div className="flex flex-col h-full overflow-hidden bg-black text-white">
      <StickerTitle width={200} />

      <div className="flex min-h-0 shrink flex-row justify-center gap-8 px-8 pt-5 [@media(max-height:720px)]:pt-3">
        <MonsterCard role="상대방" monster={result.monster1} />
        <MonsterCard role="나" monster={result.monster2} />
      </div>

      <ScoreBoard score={result.score} />
      <AnalysisCard result={result} />

      <ShareButtons
        name1={name1}
        name2={name2}
        score={result.score}
        myMonsterName={result.monster2.name}
        partnerMonsterName={result.monster1.name}
        onRetry={onRetry}
      />

      <div className="flex-1 min-h-0" />
      <div className="pt-1">
        <DisclaimerFooter />
      </div>
    </div>
  );
}

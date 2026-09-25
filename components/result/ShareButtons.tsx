"use client";

import { useMemo, useState } from "react";
import { buildShareUrl, shareResult } from "@/lib/share";

interface ShareButtonsProps {
  name1: string;
  name2: string;
  score: number;
  myMonsterName: string;
  partnerMonsterName: string;
  onRetry: () => void;
}

export function ShareButtons({
  name1,
  name2,
  score,
  myMonsterName,
  partnerMonsterName,
  onRetry,
}: ShareButtonsProps) {
  const [copied, setCopied] = useState(false);
  const shareUrl = useMemo(() => buildShareUrl(name1, name2), [name1, name2]);

  const handleShare = async () => {
    const outcome = await shareResult({
      score,
      myMonsterName,
      partnerMonsterName,
      url: shareUrl,
    });
    if (outcome === "copied") {
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    }
  };

  return (
    <div className="flex gap-3 justify-center px-8 mt-4">
      <button
        onClick={handleShare}
        className="flex-1 py-3 rounded-lg bg-[#ff9d00] hover:bg-[#ffae26] text-white text-[18px] font-black transition-colors"
      >
        {copied ? "복사됨! ✓" : "링크 복사 / 공유하기"}
      </button>
      <button
        onClick={onRetry}
        className="flex-1 py-3 rounded-lg border border-white/30 hover:bg-white/10 text-white text-[18px] font-black transition-colors"
      >
        다시 하기
      </button>
    </div>
  );
}

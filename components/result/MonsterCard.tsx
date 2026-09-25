"use client";

import { useState } from "react";
import Image from "next/image";
import type { Monster } from "@/lib/monsters";

interface MonsterCardProps {
  role: string;
  monster: Monster;
}

export function MonsterCard({ role, monster }: MonsterCardProps) {
  const [failed, setFailed] = useState(false);

  return (
    <div className="flex min-h-0 flex-1 flex-col items-center">
      <p className="shrink-0 text-[18px] font-black [@media(max-height:720px)]:text-[16px]">{role}</p>
      <p className="mt-1 shrink-0 text-[24px] font-black text-[#ff9d00] [@media(max-height:720px)]:text-[20px]">
        {monster.name}
      </p>
      <div className="relative mt-2 h-[150px] min-h-0 w-full shrink">
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_center,rgba(255,157,0,0.16),transparent_70%)]" />
        {failed ? (
          <div className="flex h-full items-center justify-center text-[80px] leading-none">
            {monster.emoji}
          </div>
        ) : (
          <Image
            src={monster.imagePath}
            alt={monster.name}
            fill
            sizes="150px"
            unoptimized={monster.imagePath.endsWith(".svg")}
            className="object-contain"
            onError={() => setFailed(true)}
          />
        )}
      </div>
      <p className="mt-2 shrink-0 text-[13px] text-white/60 text-center">
        {monster.traits}
      </p>
    </div>
  );
}

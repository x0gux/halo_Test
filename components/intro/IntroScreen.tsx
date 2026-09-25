import Image from "next/image";
import { DisclaimerFooter } from "@/components/common/DisclaimerFooter";
import { OrangeButton } from "@/components/common/OrangeButton";
import { StickerTitle } from "@/components/common/StickerTitle";
import { ParticipantCounter } from "@/components/stats/ParticipantCounter";

export function IntroScreen({ onStart }: { onStart: () => void }) {
  return (
    <div className="relative flex flex-col h-full overflow-hidden bg-black">
      <Image
        src="/background.svg"
        alt=""
        fill
        priority
        unoptimized
        className="object-cover"
      />
      {/* 하단 가독성 그라데이션 */}
      <div className="absolute inset-0 bg-gradient-to-b from-transparent via-transparent to-black/90" />

      <div className="relative z-10 flex flex-col flex-1 min-h-0">
        <div className="pt-16">
          <StickerTitle />
        </div>
        <div className="flex-1" />
        <div className="flex justify-center pb-3">
          <OrangeButton onClick={onStart}>시작하기</OrangeButton>
        </div>
        <div className="flex justify-center pb-3 px-4">
          <ParticipantCounter />
        </div>
        <DisclaimerFooter dark />
      </div>
    </div>
  );
}

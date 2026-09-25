import Image from "next/image";

export function StickerTitle({ width = 280 }: { width?: number }) {
  return (
    <div className="flex justify-center px-6 pt-6">
      <Image
        src="/title.svg"
        alt="할로윈 몬스터 짝꿍 테스트"
        width={width}
        height={Math.round((width * 129) / 280)}
        priority
        unoptimized
        className="h-auto"
        style={{ width, height: "auto" }}
      />
    </div>
  );
}

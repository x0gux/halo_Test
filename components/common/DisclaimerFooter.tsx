export const DISCLAIMER = "모든데이터는 일회용으로 서버에 저장되지않습니다!";

export function DisclaimerFooter({ dark = false }: { dark?: boolean }) {
  return (
    <p
      className={`pb-5 text-center text-[15px] font-medium px-4 [@media(max-height:720px)]:pb-3 [@media(max-height:720px)]:text-[13px] ${
        dark ? "text-white/90" : "text-white/70"
      }`}
    >
      {DISCLAIMER}
    </p>
  );
}

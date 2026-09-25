/** 현재 URL 기준 공유 링크 생성 (?n1=&n2=) */
export function buildShareUrl(name1: string, name2: string): string {
  if (typeof window === "undefined") return "";
  const url = new URL(window.location.href.split("?")[0]);
  url.searchParams.set("n1", name1);
  url.searchParams.set("n2", name2);
  return url.toString();
}

/** 클립보드 복사 (execCommand 폴백 포함) */
export async function copyTextToClipboard(text: string): Promise<boolean> {
  try {
    await navigator.clipboard.writeText(text);
    return true;
  } catch {
    try {
      const ta = document.createElement("textarea");
      ta.value = text;
      document.body.appendChild(ta);
      ta.select();
      document.execCommand("copy");
      document.body.removeChild(ta);
      return true;
    } catch {
      return false;
    }
  }
}

interface SharePayload {
  score: number;
  myMonsterName: string;
  partnerMonsterName: string;
  url: string;
}

/** Web Share API 시도 후 실패/미지원 시 클립보드 복사로 폴백 */
export async function shareResult({
  score,
  myMonsterName,
  partnerMonsterName,
  url,
}: SharePayload): Promise<"shared" | "copied" | "failed"> {
  if (typeof navigator !== "undefined" && "share" in navigator) {
    try {
      await navigator.share({
        title: "할로윈 몬스터 짝꿍 테스트",
        text: `우리의 궁합은 ${score}%! 나는 ${myMonsterName}, 상대방은 ${partnerMonsterName}`,
        url,
      });
      return "shared";
    } catch {
      /* 사용자가 공유 취소한 경우 포함 → 복사로 폴백 */
    }
  }
  return (await copyTextToClipboard(url)) ? "copied" : "failed";
}

/** 쿼리스트링을 제거하고 경로만 남김 (다시 하기용) */
export function clearQueryParams(): void {
  if (typeof window === "undefined") return;
  window.history.replaceState(null, "", window.location.pathname);
}

/** 현재 URL에 결과 쿼리스트링 반영 */
export function syncQueryParams(name1: string, name2: string): void {
  if (typeof window === "undefined") return;
  const url = new URL(window.location.href.split("?")[0]);
  url.searchParams.set("n1", name1);
  url.searchParams.set("n2", name2);
  window.history.replaceState(null, "", url.toString());
}

import { MONSTERS, getMonsterByIndex, type Monster } from "./monsters";

export function getNameHash(name: string): number {
  return name.split("").reduce((acc, char) => acc + char.charCodeAt(0), 0);
}

// 입력 이름 기반 0~7 몬스터 인덱스 산출
export function getMonsterIndex(name: string): number {
  return getNameHash(name) % 8;
}

// 두 사람의 이름을 조합하여 0~100점 점수 산출
export function getCompatibilityScore(name1: string, name2: string): number {
  const hash1 = getNameHash(name1);
  const hash2 = getNameHash(name2);
  return Math.abs((hash1 * 31 + hash2 * 17) % 101);
}

export interface MatchResult {
  monster1: Monster;
  monster2: Monster;
  score: number;
  chemiTitle: string;
  analysis: string;
  caution: string;
}

export function getChemiTitle(score: number): string {
  if (score >= 90) return "별이 이어준 조합";
  if (score >= 75) return "합이 잘 맞는 사이";
  if (score >= 55) return "맞춰가면 되는 사이";
  if (score >= 35) return "노력이 필요한 조합";
  return "쉽지 않은 인연";
}

function hasBatchim(word: string): boolean {
  const code = word.charCodeAt(word.length - 1) - 0xac00;
  return code >= 0 && code <= 11171 && code % 28 !== 0;
}

function firstTrait(monster: Monster): string {
  return monster.traits.split(",")[0].trim();
}

function getInsight(score: number, a: string, b: string): string {
  const pair = `${a}${hasBatchim(a) ? "과" : "와"} ${b}의 만남.`;
  if (score >= 90)
    return `${pair} 서로 다른 것 같아도 핵심이 잘 맞습니다. 이 템포 그대로 가면 달이 차오르듯 깊어질 거예요.`;
  if (score >= 75)
    return `${pair} 함께 있으면 마음이 편해지는 사이입니다. 가끔 엇갈려도 금방 풀릴 거예요.`;
  if (score >= 55)
    return `${pair} 부딪힐 때도 있지만 맞춰가면 충분히 되는 사이입니다. 작은 배려가 마법처럼 통할 거예요.`;
  if (score >= 35)
    return `${pair} 생각보다 어렵겠지만, 잘하면 될지도 모릅니다. 서두르지 말고 한 걸음씩 다가가 보세요.`;
  return `${pair} 정반대에 가까워 쉽지는 않습니다. 기대치를 조금 낮추면 의외의 면이 보일 거예요.`;
}

export function getMatchResult(name1: string, name2: string): MatchResult {
  const monster1 = getMonsterByIndex(getMonsterIndex(name1));
  const monster2 = getMonsterByIndex(getMonsterIndex(name2));
  const score = getCompatibilityScore(name1, name2);

  const analysis = getInsight(
    score,
    firstTrait(monster1),
    firstTrait(monster2),
  );

  const caution =
    score >= 75
      ? "잘 맞는다고 방심은 금물이에요. 연락은 자주 하세요."
      : score >= 55
        ? "템포가 다르면 그때그때 미리 말해 주세요."
        : score >= 35
          ? "싸우면 그날 안에 풀고 주무세요."
          : "안 맞는다고 단정 짓기엔 이릅니다. 한 번 더 만나 보세요.";

  return {
    monster1,
    monster2,
    score,
    chemiTitle: getChemiTitle(score),
    analysis,
    caution,
  };
}

export { MONSTERS };

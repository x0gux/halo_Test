export interface Monster {
  id: string;
  name: string;
  traits: string;
  dialogue: string;
  imagePath: string;
  emoji: string;
}

export const MONSTERS: Monster[] = [
  {
    id: "dracula",
    name: "드라큘라",
    traits: "완벽주의, 예민함",
    dialogue: "각도 1도만 틀어져도 신경 쓰이거든?",
    imagePath: "/dracula.svg",
    emoji: "🧛",
  },
  {
    id: "werewolf",
    name: "늑대인간",
    traits: "감정파, 도파민",
    dialogue: "오늘 밤 보름달 떴다! 가자아아악!!",
    imagePath: "/werewolf.svg",
    emoji: "🐺",
  },
  {
    id: "frankenstein",
    name: "프랑켄슈타인",
    traits: "과묵함, 순정",
    dialogue: "말은 적게, 마음은 크고 깊게.",
    imagePath: "/frankenstein.svg",
    emoji: "🧟",
  },
  {
    id: "jack_o_lantern",
    name: "잭오랜턴",
    traits: "친구, 분위기메이커",
    dialogue: "사탕 안 줘도 파티는 계속된다!",
    imagePath: "/jack-o-lantern.svg",
    emoji: "🎃",
  },
  {
    id: "witch",
    name: "마녀",
    traits: "계산적, 야망가",
    dialogue: "네 마음도 내 연성 레시피에 들어있어.",
    imagePath: "/witch.svg",
    emoji: "🧙‍♀️",
  },
  {
    id: "mummy",
    name: "미라",
    traits: "집착, 애정결핍",
    dialogue: "절대 안 풀어줄 거야, 평생 내 곁에 있어.",
    imagePath: "/mummy.svg",
    emoji: "🧻",
  },
  {
    id: "grim_reaper",
    name: "저승사자",
    traits: "시니컬, 쿨가이",
    dialogue: "아이스 아메리카노 한 잔 마실 시간만 줘.",
    imagePath: "/grim-reaper.svg",
    emoji: "💀",
  },
  {
    id: "ghost",
    name: "유령",
    traits: "장난꾸러기, 츤데레",
    dialogue: "딱히 너 좋아서 따라다니는 거 아니거든?",
    imagePath: "/ghost.svg",
    emoji: "👻",
  },
];

export function getMonsterByIndex(index: number): Monster {
  return MONSTERS[((index % MONSTERS.length) + MONSTERS.length) % MONSTERS.length];
}

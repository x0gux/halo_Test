"use client";

import { useState } from "react";
import { clearQueryParams, syncQueryParams } from "@/lib/share";
import { getMatchResult } from "@/lib/calculator";
import { saveMatchToDatabase } from "@/lib/firebase";

export type FlowStep = "intro" | "input" | "result";

interface SubmittedNames {
  n1: string;
  n2: string;
}

/**
 * 인트로 → 입력 → 결과 플로우 상태 관리.
 * URL 쿼리(n1/n2)로 진입한 경우 결과 단계부터 시작한다.
 */
export function useMatchFlow(initialN1: string, initialN2: string) {
  const hasQuery = initialN1 !== "" && initialN2 !== "";
  const [step, setStep] = useState<FlowStep>(hasQuery ? "result" : "intro");
  const [name1, setName1] = useState(initialN1);
  const [name2, setName2] = useState(initialN2);
  const [submitted, setSubmitted] = useState<SubmittedNames | null>(
    hasQuery ? { n1: initialN1, n2: initialN2 } : null,
  );

  const start = () => setStep("input");

  const submit = () => {
    const n1 = name1.trim();
    const n2 = name2.trim();
    if (!n1 || !n2) return;

    setSubmitted({ n1, n2 });
    setStep("result");
    syncQueryParams(n1, n2);

    // 사용자가 입력한 이름 + 상대방 이름 및 결과 DB 자동 저장
    try {
      const match = getMatchResult(n1, n2);
      saveMatchToDatabase({
        name1: n1,
        name2: n2,
        score: match.score,
        userMonster: match.monster2.name,
        partnerMonster: match.monster1.name,
        chemiTitle: match.chemiTitle,
      });
    } catch (err) {
      console.warn("DB 자동 저장 에러:", err);
    }
  };

  const retry = () => {
    setSubmitted(null);
    setStep("input");
    clearQueryParams();
  };

  return { step, submitted, name1, name2, setName1, setName2, start, submit, retry };
}

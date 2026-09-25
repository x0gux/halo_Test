"use client";

import { useEffect, useState } from "react";
import { collection, getCountFromServer } from "firebase/firestore";
import { firestore } from "@/lib/firebase";

export function ParticipantCounter() {
  const [count, setCount] = useState<number | null>(null);

  useEffect(() => {
    let cancelled = false;
    getCountFromServer(collection(firestore, "matches"))
      .then((snap) => {
        if (!cancelled) setCount(snap.data().count);
      })
      .catch(() => {
        if (!cancelled) setCount(null);
      });
    return () => {
      cancelled = true;
    };
  }, []);

  if (count == null) return null;

  return (
    <p className="text-center text-[15px] font-bold text-white/80">
      지금까지 {count.toLocaleString("ko-KR")}명이 테스트했어요
    </p>
  );
}

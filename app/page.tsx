"use client";

import { Suspense } from "react";
import { useSearchParams } from "next/navigation";
import { useMatchFlow } from "@/hooks/useMatchFlow";
import { InputScreen } from "@/components/input/InputScreen";
import { IntroScreen } from "@/components/intro/IntroScreen";
import { ResultScreen } from "@/components/result/ResultScreen";

function Flow() {
  const searchParams = useSearchParams();
  const flow = useMatchFlow(
    searchParams.get("n1") ?? "",
    searchParams.get("n2") ?? "",
  );

  if (flow.step === "intro" && !flow.submitted) {
    return <IntroScreen onStart={flow.start} />;
  }

  if (flow.step === "result" && flow.submitted) {
    return (
      <ResultScreen
        name1={flow.submitted.n1}
        name2={flow.submitted.n2}
        onRetry={flow.retry}
      />
    );
  }

  return (
    <InputScreen
      name1={flow.name1}
      name2={flow.name2}
      setName1={flow.setName1}
      setName2={flow.setName2}
      onSubmit={flow.submit}
    />
  );
}

export default function Home() {
  return (
    <Suspense fallback={<div className="bg-black min-h-screen" />}>
      <Flow />
    </Suspense>
  );
}

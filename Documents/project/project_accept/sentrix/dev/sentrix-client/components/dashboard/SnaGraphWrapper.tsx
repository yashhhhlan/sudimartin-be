"use client";

import dynamic from "next/dynamic";

const SnaGraph = dynamic(() => import("./SnaGraph"), {
  ssr: false,
});

export default function SnaGraphWrapper() {
  return <SnaGraph />;
}

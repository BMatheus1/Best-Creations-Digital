"use client";
import { useEffect, useRef } from "react";
export function useDemoReady() {
  const ref = useRef<HTMLElement>(null);
  useEffect(() => {
    ref.current?.setAttribute("data-ready", "true");
  }, []);
  return ref;
}

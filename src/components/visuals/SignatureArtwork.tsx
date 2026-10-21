"use client";

import { useEffect, useRef, type ReactNode } from "react";

// Keeps the entrance from restarting when the visitor returns via client navigation.
let signaturePlayed = false;

export function SignatureArtwork({ children }: { children: ReactNode }) {
  const signature = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (
      signaturePlayed ||
      window.matchMedia("(prefers-reduced-motion: reduce)").matches
    )
      return;
    signaturePlayed = true;
    signature.current?.setAttribute("data-animate", "true");
  }, []);

  return (
    <div className="signature-motion" ref={signature} aria-hidden="true">
      {children}
    </div>
  );
}

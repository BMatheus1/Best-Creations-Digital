"use client";

import { useEffect, useState, type ReactNode } from "react";

// Keeps the entrance from restarting when the visitor returns via client navigation.
let signaturePlayed = false;

export function SignatureArtwork({ children }: { children: ReactNode }) {
  const [animate] = useState(() => !signaturePlayed);

  useEffect(() => {
    signaturePlayed = true;
  }, []);

  return (
    <div className="home-stage" data-animate={animate ? "true" : undefined}>
      {children}
    </div>
  );
}

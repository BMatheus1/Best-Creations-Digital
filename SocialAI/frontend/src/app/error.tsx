"use client";
import { Button } from "@/components/ui/button";
export default function ErrorPage({ reset }: { reset: () => void }) {
  return (
    <main className="standalone">
      <h1>Não conseguimos abrir esta página.</h1>
      <p>Tente carregar novamente em alguns instantes.</p>
      <Button onClick={reset}>Tentar novamente</Button>
    </main>
  );
}

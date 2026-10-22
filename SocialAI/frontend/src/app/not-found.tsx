import Link from "next/link";
export default function NotFound() {
  return (
    <main className="standalone">
      <span className="eyebrow">404 · PÁGINA NÃO ENCONTRADA</span>
      <h1>Vamos voltar ao caminho?</h1>
      <p>Este endereço não está disponível.</p>
      <Link className="button button-primary" href="/dashboard">
        Ir para a visão geral
      </Link>
    </main>
  );
}

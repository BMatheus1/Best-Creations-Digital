import Link from "next/link";
export function Breadcrumb({
  label,
  collection = false,
}: {
  label: string;
  collection?: boolean;
}) {
  return (
    <nav aria-label="Caminho da página" className="breadcrumb">
      <Link href="/">Início</Link>
      <span aria-hidden="true">/</span>
      {collection && (
        <>
          <Link href="/projetos">Projetos</Link>
          <span aria-hidden="true">/</span>
        </>
      )}
      <span aria-current="page">{label}</span>
    </nav>
  );
}

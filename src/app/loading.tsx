export default function Loading() {
  return (
    <main
      id="conteudo"
      className="inner-page route-loading shell"
      aria-busy="true"
    >
      <h1 className="sr-only">Carregando página</h1>
      <p className="eyebrow">BEST CREATIONS / EXPLORANDO</p>
      <span className="loading-line" aria-hidden="true" />
      <p role="status">Preparando a próxima experiência.</p>
    </main>
  );
}

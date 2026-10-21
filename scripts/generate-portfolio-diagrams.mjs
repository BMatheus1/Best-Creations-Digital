import { mkdir, writeFile } from "node:fs/promises";
const output = new URL("../public/portfolio/", import.meta.url);
await mkdir(output, { recursive: true });
const xml = (value) =>
  String(value)
    .replaceAll("&", "&amp;")
    .replaceAll("<", "&lt;")
    .replaceAll(">", "&gt;");
const start = (label, title) =>
  `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 1200 760" fill="none"><rect width="1200" height="760" fill="#111512"/><g stroke="#334035" stroke-width=".7" opacity=".55"><path d="M60 650H1140M60 240H1140M800 55V650M400 55V650"/><circle cx="600" cy="420" r="225"/><circle cx="600" cy="420" r="265"/></g><g font-family="Arial,sans-serif"><text x="65" y="67" fill="#C9A44C" font-size="12" letter-spacing="3">${xml(label)} / DIAGRAMA DE ARQUITETURA</text><text x="65" y="133" fill="#F6F2E9" font-size="43" letter-spacing="-1.5">${xml(title)}</text>`;
const end = (text) =>
  `<path d="M65 680H1135" stroke="#5d634f"/><text x="65" y="714" fill="#b5bba8" font-size="11" letter-spacing="1.6">${xml(text)}</text><text x="1135" y="714" text-anchor="end" fill="#C9A44C" font-size="10" letter-spacing="2">BEST CREATIONS</text></g></svg>`;
const panel = (x, y, w, h, title, subtitle) =>
  `<rect x="${x}" y="${y}" width="${w}" height="${h}" fill="#19201a" stroke="#64715b"/><text x="${x + 23}" y="${y + 43}" fill="#F6F2E9" font-size="21">${xml(title)}</text><text x="${x + 23}" y="${y + 76}" fill="#b5bba8" font-size="12">${xml(subtitle)}</text>`;
const arrow = (x, y, length) =>
  `<path d="M${x} ${y}h${length}m-10-7 10 7-10 7" stroke="#C9A44C" stroke-width="1.5"/>`;
const easy =
  start("EASYDIET", "Do app à operação.") +
  `<rect x="105" y="205" width="218" height="416" rx="25" fill="#e5ecdc" stroke="#8f9c7f" stroke-width="3"/><rect x="181" y="217" width="65" height="8" rx="4" fill="#3d5135"/><text x="129" y="285" fill="#334b2a" font-size="28">EasyDiet</text><text x="129" y="315" fill="#53664b" font-size="12">APP EXPO / REACT NATIVE</text><rect x="129" y="349" width="170" height="82" fill="#d3dfc7"/><text x="145" y="381" fill="#334b2a" font-size="16">Monte sua refeição</text><text x="145" y="406" fill="#53664b" font-size="11">Ingredientes e porções</text><path d="M130 460h165M130 488h135M130 516h150" stroke="#8d9c7e" stroke-width="5"/><rect x="129" y="551" width="170" height="40" fill="#3d5135"/><text x="214" y="576" text-anchor="middle" fill="#eef3e6" font-size="12">Solicitar cotação</text>` +
  arrow(345, 420, 100) +
  `<circle cx="570" cy="420" r="100" fill="#172019" stroke="#C9A44C"/><text x="570" y="404" text-anchor="middle" fill="#F6F2E9" font-size="25">FastAPI</text><text x="570" y="436" text-anchor="middle" fill="#b5bba8" font-size="12">Motor de precificação</text><text x="570" y="461" text-anchor="middle" fill="#C9A44C" font-size="10" letter-spacing="1">CATÁLOGO · PEDIDOS</text>` +
  arrow(697, 420, 75) +
  panel(800, 270, 310, 286, "Admin Next.js", "PAINEL DE OPERAÇÃO") +
  `<path d="M822 370H1088M822 426H1088M822 482H1088" stroke="#485942"/><text x="824" y="397" fill="#b5bba8" font-size="15">Pedidos</text><text x="824" y="453" fill="#b5bba8" font-size="15">Custos e precificação</text><text x="824" y="509" fill="#b5bba8" font-size="15">Organização da produção</text>` +
  end("PILOTO · PEDIDOS EM MEMÓRIA · PAGAMENTO SIMULADO");
await writeFile(new URL("easydiet-architecture.svg", output), easy);
const pipeline =
  start("DETECÇÃO DE SEPSE", "Do dado à explicação.") +
  `<path d="M230 407H975" stroke="#C9A44C" stroke-width="1.3"/>` +
  panel(80, 300, 285, 190, "Dados de pesquisa", "PREPARAÇÃO E VARIÁVEIS") +
  panel(458, 300, 285, 190, "Modelagem & avaliação", "BASELINE · OTIMIZAÇÃO") +
  panel(836, 300, 285, 190, "API & explicações", "CONTRATOS E FONTES") +
  `<text x="103" y="438" fill="#C9A44C" font-size="13">pandas / NumPy</text><text x="481" y="438" fill="#C9A44C" font-size="13">Validação / threshold</text><text x="859" y="438" fill="#C9A44C" font-size="13">FastAPI / Pydantic</text><text x="80" y="569" fill="#b5bba8" font-size="14">Um estudo sobre pipelines, avaliação e limites de modelos.</text><text x="80" y="598" fill="#b5bba8" font-size="14">Nenhuma inferência médica é oferecida nesta apresentação.</text>` +
  end("PROJETO ACADÊMICO · NÃO VALIDADO PARA USO CLÍNICO");
await writeFile(new URL("sepse-pipeline.svg", output), pipeline);
const assistant =
  start("ASSISTENTE ACADÊMICO", "Respostas com contexto e limites.") +
  panel(80, 235, 380, 145, "Pergunta acadêmica", "ENTRADA DA API") +
  panel(
    80,
    430,
    380,
    145,
    "Dados sintéticos & protocolos",
    "RECUPERAÇÃO DE CONTEXTO",
  ) +
  `<path d="M460 310H580V405H700M460 505H580V405" stroke="#C9A44C" stroke-width="1.5"/><circle cx="580" cy="405" r="7" fill="#C9A44C"/>` +
  panel(
    700,
    302,
    405,
    205,
    "Fluxo LangGraph",
    "RECUPERAÇÃO · GERAÇÃO · VERIFICAÇÕES",
  ) +
  `<text x="723" y="449" fill="#C9A44C" font-size="15">Resposta com fontes</text><text x="723" y="477" fill="#b5bba8" font-size="12">Limitações e rastreabilidade</text>` +
  end("FASE 3 · DADOS SINTÉTICOS · EXPLICAÇÃO DE ARQUITETURA");
await writeFile(new URL("sepse-assistant.svg", output), assistant);
const binance =
  start("BINANCE AI RESEARCH", "Fontes conectadas. Pesquisa observável.") +
  panel(70, 290, 235, 220, "Fontes públicas", "MERCADO E NOTÍCIAS") +
  panel(345, 290, 235, 220, "Qualidade", "INGESTÃO E VALIDAÇÃO") +
  panel(620, 290, 235, 220, "Pesquisa", "FEATURES E AVALIAÇÃO") +
  panel(895, 290, 235, 220, "Observação", "API E DASHBOARD") +
  arrow(310, 404, 29) +
  arrow(585, 404, 29) +
  arrow(860, 404, 29) +
  `<text x="94" y="452" fill="#C9A44C" font-size="12">Dados / eventos</text><text x="369" y="452" fill="#C9A44C" font-size="12">Python / pandas</text><text x="644" y="452" fill="#C9A44C" font-size="12">SQLite / JSONL</text><text x="919" y="452" fill="#C9A44C" font-size="12">FastAPI / Next.js</text><text x="70" y="591" fill="#b5bba8" font-size="14">Apresentação técnica, sem execução de operações ou conexão com contas.</text>` +
  end("PESQUISA EXPERIMENTAL · SEM PROMESSA DE RESULTADO FINANCEIRO");
await writeFile(new URL("binance-architecture.svg", output), binance);
console.log("Four architecture diagrams generated from audited project scope.");

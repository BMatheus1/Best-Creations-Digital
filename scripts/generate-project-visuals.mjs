import { mkdir, writeFile } from "node:fs/promises";
import { join } from "node:path";
const directory = join(process.cwd(), "public", "visuals");
await mkdir(directory, { recursive: true });
// Original vector studies based on the demonstrative interfaces of the first version.
// These are illustrative placeholders, never screenshots of delivered products.
const palette = {
  restaurant: ["#2c2118", "#6c4c30"],
  beauty: ["#827367", "#b7a795"],
  finance: ["#202a20", "#485541"],
  diet: ["#344b2a", "#7b945b"],
  data: ["#22232e", "#494959"],
};
const body = (theme) => {
  if (theme === "restaurant")
    return '<rect width="940" height="570" fill="#eee5d4"/><text x="48" y="56" font-family="Georgia,serif" font-size="29" fill="#3b3526">cantinho do Luiz.</text><text x="700" y="51" font-size="12" fill="#514733">O restaurante · Cardápio</text><path d="M0 86H940" stroke="#c9bba1"/><text x="48" y="151" font-size="11" letter-spacing="3" fill="#765630">COMIDA BOA. BONS MOMENTOS.</text><text x="48" y="244" font-size="61" letter-spacing="-3" fill="#342e21">Tem gosto</text><text x="48" y="316" font-size="68" font-family="Georgia,serif" font-style="italic" fill="#342e21">de estar em casa.</text><text x="48" y="371" font-size="16" fill="#5e513e">À mesa, a gente se encontra.</text><rect x="48" y="414" width="218" height="42" fill="#3c4630"/><text x="63" y="441" font-size="12" fill="#f6f2e9">Conheça nosso cardápio ↗</text><ellipse cx="785" cy="344" rx="184" ry="181" fill="#c3b69b" opacity=".5"/><ellipse cx="777" cy="333" rx="180" ry="177" fill="#f9f1df" stroke="#d9ccb0" stroke-width="8"/><ellipse cx="777" cy="333" rx="143" ry="140" fill="#cfc4aa"/><path d="M707 244C823 210 864 307 770 369C698 399 676 329 707 244Z" fill="#5d7840"/><path d="m713 251 65 101m-56-55 64-12m-42 43 59-11" stroke="#99a765" stroke-width="2"/><circle cx="828" cy="281" r="34" fill="#b54d2d"/><circle cx="717" cy="369" r="28" fill="#c46137"/><ellipse cx="824" cy="376" rx="59" ry="46" fill="#d4af6e"/><path d="m778 356 89 40m-87-23 79 41m-72-68 87 38" stroke="#aa7d43" stroke-width="5"/><text x="48" y="526" font-size="10" letter-spacing="2" fill="#685b47">FEITO COM CARINHO. SERVIDO COM HISTÓRIA.</text>';
  if (theme === "beauty")
    return '<rect width="940" height="570" fill="#f2ece3"/><text x="48" y="57" font-family="Georgia,serif" font-size="38" fill="#544638">essência</text><text x="665" y="52" font-size="12" fill="#665540">Sobre · Procedimentos · Contato</text><text x="48" y="155" font-size="10" letter-spacing="3" fill="#71604f">O CUIDADO QUE VOCÊ MERECE</text><text x="48" y="238" font-size="55" letter-spacing="-2" fill="#544638">Sua melhor</text><text x="48" y="302" font-size="67" font-family="Georgia,serif" font-style="italic" fill="#544638">versão, com</text><text x="48" y="366" font-size="67" font-family="Georgia,serif" font-style="italic" fill="#544638">naturalidade.</text><rect x="48" y="417" width="220" height="43" fill="#77634f"/><text x="64" y="444" font-size="12" fill="#f6f2e9">Um momento para você ↗</text><path d="M595 570V270a137 137 0 0 1 274 0V570Z" fill="url(#sand)"/><ellipse cx="675" cy="509" rx="90" ry="171" transform="rotate(28 675 509)" fill="#b59e83"/><ellipse cx="852" cy="555" rx="107" ry="140" transform="rotate(-35 852 555)" fill="#d8c7af"/><path d="m605 315 252-90m-250 107 252-90m-250 108 252-90" stroke="#9d866d" stroke-width="2" opacity=".25"/><text x="48" y="526" font-size="10" letter-spacing="2" fill="#71604f">BELEZA QUE RESPEITA A SUA ESSÊNCIA.</text>';
  if (theme === "diet")
    return '<rect width="940" height="570" fill="#e9eddd"/><text x="48" y="62" font-size="34" font-weight="700" fill="#3e5532">EasyDiet</text><text x="48" y="218" font-size="57" letter-spacing="-2" fill="#364e2e">Leve na rotina.</text><text x="48" y="282" font-size="63" font-family="Georgia,serif" font-style="italic" fill="#364e2e">Bom de verdade.</text><text x="48" y="344" font-size="16" fill="#4c6040">Fresco. Prático. Do seu jeito.</text><rect x="48" y="390" width="200" height="43" fill="#48653a"/><text x="65" y="417" font-size="12" fill="#f6f2e9">Explore as possibilidades ↗</text><g transform="translate(601 45) rotate(8 117 240)"><rect width="235" height="485" rx="32" fill="#283c22"/><rect x="7" y="7" width="221" height="471" rx="27" fill="#f6f4e9"/><rect x="87" y="17" width="64" height="12" rx="6" fill="#283c22"/><text x="24" y="69" font-size="10" fill="#4a5b3e">Olá, que tal comer bem?</text><text x="24" y="112" font-size="26" font-weight="600" fill="#34462c">Seu próximo</text><text x="24" y="145" font-size="26" font-weight="600" fill="#34462c">prato favorito.</text><rect x="24" y="169" width="187" height="181" rx="7" fill="#d4dec0"/><circle cx="119" cy="259" r="77" fill="#f1ead6"/><path d="M85 204C160 191 160 295 90 298Z" fill="#607e3c"/><circle cx="150" cy="238" r="23" fill="#b85f35"/><ellipse cx="134" cy="290" rx="33" ry="25" fill="#b9985c"/><text x="24" y="381" font-size="10" fill="#4a5b3e">Sua rotina pode ser mais leve.</text><rect x="24" y="402" width="187" height="39" rx="4" fill="#4c6e39"/><text x="35" y="426" font-size="10" fill="#f6f2e9">Monte sua combinação +</text></g><text x="48" y="526" font-size="10" letter-spacing="2" fill="#4c6040">CONCEITO DE PRODUTO DIGITAL.</text>';
  const isFinance = theme === "finance";
  const accent = isFinance ? "#bfcea5" : "#b9b8d6";
  return (
    '<rect width="940" height="570" fill="' +
    (isFinance ? "#131a14" : "#181923") +
    '"/><path d="M90 0V570M90 79H940" stroke="#3b4337"/><text x="23" y="55" font-size="27" font-weight="700" fill="' +
    accent +
    '">' +
    (isFinance ? "m.e" : "d.i") +
    '</text><path d="M26 129H60M26 178H60M26 227H60M26 276H60" stroke="#6b7762" stroke-width="6"/><text x="125" y="50" font-size="15" fill="#c1c7b8">' +
    (isFinance ? "Visão geral" : "Exploração de dados") +
    '</text><text x="125" y="126" font-size="10" letter-spacing="2" fill="' +
    accent +
    '">' +
    (isFinance ? "SUAS FINANÇAS, MAIS CLARAS" : "NOVAS PERSPECTIVAS") +
    '</text><text x="125" y="180" font-size="43" letter-spacing="-2" fill="#f6f2e9">' +
    (isFinance ? "Tudo em equilíbrio." : "Além dos números.") +
    '</text><rect x="125" y="217" width="358" height="105" rx="5" fill="#ffffff04" stroke="#ffffff20"/><rect x="505" y="217" width="390" height="105" rx="5" fill="#ffffff04" stroke="#ffffff20"/><text x="147" y="247" font-size="12" fill="#bbc1b0">' +
    (isFinance ? "Saldo ilustrativo" : "Visualização ilustrativa") +
    '</text><text x="147" y="290" font-size="29" fill="' +
    accent +
    '">' +
    (isFinance ? "R$ 4.280,00" : "Análise exploratória") +
    '</text><text x="526" y="252" font-size="13" fill="#bbc1b0">Organize. Visualize.</text><text x="526" y="286" font-size="20" fill="#f6f2e9">Planeje o próximo passo.</text><rect x="125" y="345" width="770" height="182" rx="5" fill="#ffffff03" stroke="#ffffff20"/><text x="147" y="378" font-size="12" fill="#bbc1b0">Visão demonstrativa das informações</text><path d="M147 486 205 469 262 480 320 431 379 450 436 409 493 424 550 392 607 415 665 382 722 402 780 374 870 390" stroke="' +
    accent +
    '" stroke-width="3" fill="none"/><path d="M147 504H870" stroke="#4b5146"/>'
  );
};
for (const [theme, colors] of Object.entries(palette)) {
  const svg =
    '<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 1200 760"><defs><radialGradient id="bg"><stop stop-color="' +
    colors[1] +
    '"/><stop offset="1" stop-color="' +
    colors[0] +
    '"/></radialGradient><linearGradient id="sand"><stop stop-color="#b6a087"/><stop offset=".5" stop-color="#ddccb7"/><stop offset="1" stop-color="#b5a087"/></linearGradient><filter id="shadow" x="-.2" y="-.2" width="1.5" height="1.5"><feDropShadow dx="13" dy="25" stdDeviation="17" flood-opacity=".2"/></filter></defs><rect width="1200" height="760" fill="url(#bg)"/><g transform="translate(130 90) rotate(-4 470 285)" filter="url(#shadow)" font-family="Arial,Helvetica,sans-serif">' +
    body(theme) +
    '</g><rect x="820" y="719" width="350" height="24" fill="#10110f"/><text x="833" y="735" fill="#f6f2e9" font-family="Arial,Helvetica,sans-serif" font-size="10" letter-spacing="1.2">INTERFACE DEMONSTRATIVA · ESTUDO VISUAL</text></svg>';
  await writeFile(join(directory, "project-" + theme + ".svg"), svg);
}
console.log("5 interfaces demonstrativas vetoriais geradas.");

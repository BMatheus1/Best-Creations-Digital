import { expect, test, type Page } from "@playwright/test";
import AxeBuilder from "@axe-core/playwright";
import { addDays, todayKey } from "@/lib/lab/format";
const selected = [
  "my-expenses",
  "pri-beauty",
  "easydiet",
  "deteccao-de-sepse",
  "binance-ai-research",
  "best-crm",
  "best-booking",
  "best-restaurant",
];
async function openLab(page: Page, path: string) {
  await page.goto(path);
  await expect(page.locator('.lab-app[data-ready="true"]')).toBeVisible();
}
test("showroom: filtros, índice, demos e links reais", async ({ page }) => {
  await page.goto("/projetos");
  await expect(page.locator("[data-active-project]")).toHaveAttribute(
    "data-active-project",
    "my-expenses",
  );
  await expect(page.getByText("01 / 08", { exact: true })).toBeVisible();
  await expect(
    page.getByRole("link", { name: /Visitar aplicação/ }),
  ).toHaveAttribute("href", "https://myexpensesfinance.com");
  await page.getByRole("button", { name: "Websites", exact: true }).click();
  await expect(page.getByRole("heading", { level: 2 })).toHaveText(
    "Pri Beauty",
  );
  await expect(page.getByText("01 / 02", { exact: true })).toBeVisible();
  await page.getByRole("button", { name: "Próximo projeto" }).click();
  await expect(page.getByRole("heading", { level: 2 })).toHaveText(
    "Best Restaurant",
  );
  await expect(
    page.getByRole("link", { name: "Experimentar", exact: true }),
  ).toHaveAttribute("href", "/lab/restaurant");
  await page
    .getByRole("button", { name: "Demonstrações", exact: true })
    .click();
  await expect(page.getByText("01 / 03", { exact: true })).toBeVisible();
  await expect(page.getByRole("heading", { level: 2 })).toHaveText("Best CRM");
  await page.getByRole("button", { name: "Mostrar Best Booking" }).click();
  await page.getByRole("link", { name: "Experimentar", exact: true }).click();
  await expect(page).toHaveURL(/\/lab\/booking$/);
  await expect(page.getByRole("heading", { level: 1 })).toContainText(
    "booking",
  );
});
test("cases: oito experiências, evidências, galerias e CTA contextual", async ({
  page,
  request,
}) => {
  for (const slug of selected) {
    await page.goto("/projetos/" + slug);
    await expect(page.getByRole("heading", { level: 1 })).toBeVisible();
    await expect(page.getByText("CONTEXTO & EVIDÊNCIAS")).toBeVisible();
    const image = page.locator(".case-cover img");
    await expect(image).toBeVisible();
    await expect
      .poll(() => image.evaluate((el) => (el as HTMLImageElement).naturalWidth))
      .toBeGreaterThan(0);
    const cta = page.getByRole("link", {
      name: /Solicitar projeto semelhante/,
    });
    await expect(cta).toHaveAttribute("href", new RegExp(`referencia=${slug}`));
    if (!slug.startsWith("best-"))
      await expect(
        page.getByRole("link", { name: /Ver repositório/ }),
      ).toHaveAttribute("href", /^https:\/\/github.com\/BMatheus1\//);
  }
  await page.goto("/projetos/my-expenses");
  await page.getByRole("button", { name: "Próxima imagem" }).first().click();
  await expect(page.locator(".gallery-toolbar")).toContainText("02 / 02");
  await page.getByRole("button", { name: "Ampliar imagem" }).click();
  await expect(page.getByRole("dialog")).toBeVisible();
  await page.keyboard.press("Escape");
  await expect(
    page.getByRole("button", { name: "Ampliar imagem" }),
  ).toBeFocused();
  await page
    .getByRole("link", { name: /Solicitar projeto semelhante/ })
    .click();
  await expect(page.getByRole("radio", { name: /Sistema/ })).toBeChecked();
  await expect(page.getByText(/Referência da coleção:/)).toContainText(
    "My Expenses",
  );
  await page.getByRole("button", { name: "Continuar" }).click();
  await expect(page.getByLabel("Sua ideia *")).toHaveValue(/My Expenses/);
  expect((await request.get("/projetos/slug-inexistente")).status()).toBe(404);
});
test("showroom: swipe mobile mantém os controles visíveis", async ({
  page,
  context,
}) => {
  await page.setViewportSize({ width: 390, height: 844 });
  await page.goto("/projetos");
  const visual = page.locator(".showroom-visual");
  await visual.scrollIntoViewIfNeeded();
  const box = (await visual.boundingBox())!;
  const session = await context.newCDPSession(page);
  await session.send("Emulation.setTouchEmulationEnabled", { enabled: true });
  const start = { x: box.x + box.width * 0.8, y: box.y + box.height * 0.5 };
  await session.send("Input.dispatchTouchEvent", {
    type: "touchStart",
    touchPoints: [start],
  });
  await session.send("Input.dispatchTouchEvent", {
    type: "touchMove",
    touchPoints: [{ x: box.x + box.width * 0.2, y: start.y }],
  });
  await session.send("Input.dispatchTouchEvent", {
    type: "touchEnd",
    touchPoints: [],
  });
  await expect(page.getByRole("heading", { level: 2 })).toHaveText(
    "Pri Beauty",
  );
  await expect(
    page.getByRole("button", { name: "Projeto anterior" }),
  ).toBeVisible();
});
test("CRM: cadastro, edição, busca, exclusão e reset", async ({ page }) => {
  await openLab(page, "/lab/crm");
  await expect(page.getByTestId("crm-client-count")).toHaveText("6");
  await page.getByRole("button", { name: "Novo cliente", exact: true }).click();
  const dialog = page.getByRole("dialog");
  await dialog.getByRole("button", { name: "Salvar cliente" }).click();
  await expect(dialog.getByRole("alert")).not.toHaveCount(0);
  await dialog.getByLabel("Nome fictício").fill("Alex Exemplo");
  await dialog.getByLabel("Empresa fictícia").fill("Empresa Modelo");
  await dialog.getByLabel(/E-mail fictício/).fill("alex@empresa.example");
  await dialog.getByLabel(/Valor fictício/).fill("3450.50");
  await dialog.getByRole("button", { name: "Salvar cliente" }).click();
  await expect(page.getByTestId("crm-client-count")).toHaveText("7");
  await page.getByRole("button", { name: "Editar Alex Exemplo" }).click();
  await dialog.getByLabel("Empresa fictícia").fill("Modelo Editado");
  await dialog.getByRole("button", { name: "Salvar cliente" }).click();
  await page
    .getByRole("searchbox", { name: "Buscar clientes" })
    .fill("Modelo Editado");
  await expect(page.getByTestId("crm-client-count")).toHaveText("1");
  await expect(
    page.getByRole("cell", {
      name: "Alex Exemplo Modelo Editado",
      exact: true,
    }),
  ).toBeVisible();
  await page.getByRole("button", { name: "Excluir Alex Exemplo" }).click();
  await expect(page.getByText("Nenhum cliente neste filtro.")).toBeVisible();
  await page.getByRole("button", { name: "Restaurar cenário" }).click();
  await expect(page.getByTestId("crm-client-count")).toHaveText("6");
  await expect(page.getByRole("searchbox")).toHaveValue("");
});
test("CRM: etapas, histórico, tarefas e navegação por teclado", async ({
  page,
}) => {
  await openLab(page, "/lab/crm");
  await page.getByRole("button", { name: "Pipeline", exact: true }).click();
  await page.getByLabel("Etapa de Maia Modelo").selectOption("Concluído");
  await expect(
    page.getByText("Oportunidade movida para Concluído."),
  ).toBeVisible();
  await page
    .getByRole("article")
    .filter({ has: page.getByRole("heading", { name: "Maia Modelo" }) })
    .getByRole("button", { name: "Ver histórico" })
    .click();
  await expect(page.getByRole("dialog")).toContainText(
    "Etapa alterada para Concluído",
  );
  await page.keyboard.press("Escape");
  await page.getByRole("button", { name: /^Tarefas/ }).click();
  await page.getByLabel("Nova tarefa").fill("Validar fluxo demonstrativo");
  await page.getByRole("button", { name: "Adicionar tarefa" }).click();
  await page
    .getByRole("checkbox", { name: "Validar fluxo demonstrativo" })
    .check();
  await expect(
    page.getByRole("checkbox", { name: "Validar fluxo demonstrativo" }),
  ).toBeChecked();
  await page.getByRole("button", { name: "Clientes", exact: true }).click();
  await page.getByLabel("Filtrar por etapa").selectOption("Concluído");
  await expect(page.getByTestId("crm-client-count")).toHaveText("2");
});
test("Booking: fluxo, validação, cancelamento, conflito e restauração", async ({
  page,
}) => {
  await openLab(page, "/lab/booking");
  await page.getByRole("button", { name: /Corte & finalização/ }).click();
  await page.getByRole("button", { name: "Continuar", exact: true }).click();
  await expect(
    page.getByRole("button", { name: "09:00 indisponível", exact: true }),
  ).toBeDisabled();
  await page.getByRole("button", { name: "10:00", exact: true }).click();
  await page.getByRole("button", { name: "Revisar", exact: true }).click();
  await page.getByRole("button", { name: "Simular agendamento" }).click();
  await expect(page.locator(".lab-app").getByRole("alert")).toContainText(
    "nome fictício",
  );
  await page.getByLabel("Seu nome fictício").fill("Alex Exemplo");
  await page.getByRole("button", { name: "Simular agendamento" }).click();
  await expect(
    page.getByRole("heading", { name: "Simulação concluída." }),
  ).toBeVisible();
  await page.getByRole("button", { name: "Ver agendamentos" }).click();
  await expect(
    page.getByRole("heading", { name: "Alex Exemplo" }),
  ).toBeVisible();
  await page
    .getByRole("button", { name: "Cancelar agendamento de Alex Exemplo" })
    .click();
  await expect(
    page.getByText("Agendamento fictício cancelado.", { exact: false }),
  ).toBeVisible();
  await page
    .getByRole("button", { name: "Novo agendamento", exact: true })
    .click();
  await page.getByRole("button", { name: "Continuar", exact: true }).click();
  await expect(
    page.getByRole("button", { name: "10:00", exact: true }),
  ).toBeEnabled();
  await page.getByRole("button", { name: "Restaurar cenário" }).click();
  await expect(
    page.getByRole("button", { name: /^Agendamentos/ }),
  ).toContainText("2");
  await expect(
    page.getByRole("button", { name: "Continuar", exact: true }),
  ).toBeDisabled();
});
test("Restaurant: categorias, quantidades, totais, pedido e reset", async ({
  page,
}) => {
  await openLab(page, "/lab/restaurant");
  await page
    .getByRole("button", { name: "Adicionar Burrata da horta" })
    .click();
  await page
    .getByRole("button", { name: "Adicionar Risoto de cogumelos" })
    .click();
  await expect(page.getByTestId("cart-total")).toContainText("110,00");
  await page
    .getByRole("button", { name: "Aumentar Risoto de cogumelos" })
    .click();
  await expect(page.getByTestId("cart-total")).toContainText("178,00");
  await page
    .getByRole("button", { name: "Diminuir Risoto de cogumelos" })
    .click();
  await page.getByRole("button", { name: "Remover Burrata da horta" }).click();
  await expect(page.getByTestId("cart-total")).toContainText("68,00");
  await page.getByRole("button", { name: "Sobremesas", exact: true }).click();
  await expect(page.locator(".restaurant-products article")).toHaveCount(1);
  await page
    .getByRole("button", { name: "Adicionar Torta de chocolate" })
    .click();
  await expect(page.getByTestId("cart-total")).toContainText("100,00");
  await page
    .getByRole("button", { name: "Simular pedido", exact: true })
    .click();
  await expect(page.getByRole("dialog")).toContainText(
    "Nenhum pedido foi enviado",
  );
  await expect(page.getByRole("dialog")).toContainText("100,00");
  await page.getByRole("button", { name: "Continuar explorando" }).click();
  await expect(
    page.getByRole("heading", { name: "Seu pedido.", exact: true }),
  ).toBeFocused();
  await expect(page.getByTestId("cart-count")).toHaveText("0");
  await page.getByRole("button", { name: "Reiniciar demo" }).click();
  await expect(page.locator(".restaurant-products article")).toHaveCount(4);
  await expect(
    page.getByRole("button", { name: "Simular pedido", exact: true }),
  ).toBeDisabled();
});
test("Restaurant: reserva simulada acessível sem envio externo", async ({
  page,
}) => {
  const external: string[] = [];
  page.on("request", (request) => {
    const url = new URL(request.url());
    if (
      !["127.0.0.1", "localhost"].includes(url.hostname) &&
      url.protocol.startsWith("http")
    )
      external.push(request.url());
  });
  await openLab(page, "/lab/restaurant");
  await page.getByRole("button", { name: "Reservar", exact: true }).click();
  const dialog = page.getByRole("dialog");
  await dialog.getByRole("button", { name: "Simular reserva" }).click();
  await expect(dialog.getByRole("alert")).toBeVisible();
  await dialog.getByLabel("Nome fictício").fill("Alex Exemplo");
  await dialog.getByRole("button", { name: "Simular reserva" }).click();
  await expect(dialog).toContainText("Nenhuma mesa real foi reservada");
  await page.keyboard.press("Escape");
  await expect(
    page.getByRole("button", { name: "Reservar", exact: true }),
  ).toBeFocused();
  expect(external).toEqual([]);
});
test("mobile: cadastro, calendário, carrinho e reserva utilizáveis em 320px", async ({
  page,
}) => {
  await page.setViewportSize({ width: 320, height: 844 });
  await openLab(page, "/lab/crm");
  await page.getByRole("button", { name: "Novo cliente", exact: true }).click();
  let dialog = page.getByRole("dialog");
  await dialog.getByLabel("Nome fictício").fill("Rui Exemplo");
  await dialog.getByLabel("Empresa fictícia").fill("Modelo Mobile");
  await dialog.getByRole("button", { name: "Salvar cliente" }).click();
  await expect(page.getByTestId("crm-client-count")).toHaveText("7");
  await openLab(page, "/lab/booking");
  await page.getByRole("button", { name: /Design de sobrancelhas/ }).click();
  await page.getByRole("button", { name: "Continuar", exact: true }).click();
  await page.getByRole("button", { name: /Davi Modelo/ }).click();
  const date = addDays(todayKey(), 10);
  await page.getByLabel("Data desejada").fill(date);
  await page.getByRole("button", { name: "14:00", exact: true }).click();
  await page.getByRole("button", { name: "Revisar", exact: true }).click();
  await page.getByLabel("Seu nome fictício").fill("Rui Exemplo");
  await page.getByRole("button", { name: "Simular agendamento" }).click();
  await expect(
    page.getByRole("heading", { name: "Simulação concluída." }),
  ).toBeVisible();
  await openLab(page, "/lab/restaurant");
  await page.getByRole("button", { name: "Principais", exact: true }).click();
  await page.getByRole("button", { name: "Adicionar Ravioli da casa" }).click();
  await page.getByRole("link", { name: /Seu pedido/ }).click();
  await expect(page.getByTestId("cart-total")).toContainText("72,00");
  await page
    .getByRole("button", { name: "Simular pedido", exact: true })
    .click();
  dialog = page.getByRole("dialog");
  await expect(dialog).toContainText("Nenhum pedido foi enviado");
  await page.keyboard.press("Escape");
  await page.getByRole("button", { name: "Reservar", exact: true }).click();
  dialog = page.getByRole("dialog");
  await dialog.getByLabel("Nome fictício").fill("Rui Exemplo");
  await dialog.getByRole("button", { name: "Simular reserva" }).click();
  await expect(dialog).toContainText("Nenhuma mesa real foi reservada");
  expect(
    await page.evaluate(
      () => document.documentElement.scrollWidth <= innerWidth,
    ),
  ).toBe(true);
});
for (const width of [320, 375, 390, 430, 768, 1024, 1440])
  test(`showroom e laboratórios responsivos ${width}px`, async ({
    page,
  }, info) => {
    await page.setViewportSize({ width, height: width < 640 ? 844 : 1000 });
    for (const path of [
      "/projetos",
      "/lab/crm",
      "/lab/booking",
      "/lab/restaurant",
    ]) {
      if (path.startsWith("/lab")) await openLab(page, path);
      else await page.goto(path);
      expect(
        await page.evaluate(
          () => document.documentElement.scrollWidth <= innerWidth,
        ),
        path,
      ).toBe(true);
      await page.screenshot({
        path: info.outputPath(`${path.replaceAll("/", "-")}-${width}.png`),
        fullPage: true,
      });
    }
  });
for (const path of ["/lab/crm", "/lab/booking", "/lab/restaurant"])
  test(`acessibilidade da demo ${path}`, async ({ page }) => {
    await openLab(page, path);
    const result = await new AxeBuilder({ page })
      .withTags(["wcag2a", "wcag2aa", "wcag21aa", "wcag22aa"])
      .analyze();
    expect(result.violations).toEqual([]);
  });

import { test, expect } from "@playwright/test";
import { execFileSync } from "node:child_process";
import path from "node:path";

function readTestEmailToken(
  email: string,
  purpose: "verify" | "reset",
): string {
  const backend = path.resolve(__dirname, "../../../backend");
  const python =
    process.env.API_PYTHON ||
    path.join(
      backend,
      process.platform === "win32"
        ? ".venv/Scripts/python.exe"
        : ".venv/bin/python",
    );
  const script =
    "import sqlite3,re,sys; db=sqlite3.connect('e2e.db'); subject=('Confirme%' if sys.argv[2]=='verify' else 'Redefina%'); body=db.execute('SELECT body FROM email_outbox WHERE recipient=? AND subject LIKE ? ORDER BY created_at DESC LIMIT 1',(sys.argv[1],subject)).fetchone()[0]; print(re.search(r'#token=([\\w-]+)',body).group(1))";
  return execFileSync(python, ["-c", script, email, purpose], {
    cwd: backend,
    encoding: "utf8",
  }).trim();
}

test("protege rota privada no servidor", async ({ page }) => {
  await page.goto("/dashboard");
  await expect(page).toHaveURL(/\/login$/);
  await expect(
    page.getByRole("button", { name: "Entrar na minha conta" }),
  ).toBeVisible();
});

test("cadastro, persistência, configurações, workspaces e logout", async ({
  page,
}) => {
  const unique = `${Date.now()}-${Math.floor(Math.random() * 100000)}`;
  const email = `qa-${unique}@example.com`;
  await page.goto("/register");
  await page.getByLabel("Seu nome", { exact: true }).fill("Ana Teste");
  await page
    .getByLabel("Nome do workspace", { exact: true })
    .fill("Studio de testes");
  await page.getByLabel("Email", { exact: true }).fill(email);
  await page.getByLabel("Senha", { exact: true }).fill("uma-senha-segura-2026");
  await page.getByRole("button", { name: "Criar minha conta" }).click();
  await expect(page).toHaveURL(/\/dashboard$/);
  await expect(page.getByRole("heading", { name: /Olá, Ana/ })).toBeVisible();
  await page.reload();
  await expect(page.getByRole("heading", { name: /Olá, Ana/ })).toBeVisible();
  await page.screenshot({
    path: "test-results/dashboard-desktop.png",
    fullPage: true,
  });
  await page.getByRole("link", { name: "Configurações", exact: true }).click();
  await page.getByLabel("Nome", { exact: true }).fill("Ana Maria");
  await page.getByRole("button", { name: "Salvar perfil" }).click();
  await expect(page.getByRole("status")).toContainText(
    "Seu perfil foi atualizado.",
  );
  await page.getByRole("button", { name: "Novo", exact: true }).click();
  await page
    .getByRole("dialog")
    .getByLabel("Nome", { exact: true })
    .fill("Segundo negócio");
  await page
    .getByRole("button", { name: "Criar workspace", exact: true })
    .click();
  await expect(page.getByRole("dialog")).not.toBeVisible();
  await page
    .getByLabel("Selecionar workspace")
    .selectOption({ label: "Segundo negócio" });
  await expect(
    page.getByLabel("Nome do workspace", { exact: true }),
  ).toHaveValue("Segundo negócio");
  await page.getByRole("link", { name: "Visão geral", exact: true }).click();
  await expect(
    page.getByText("Segundo negócio já tem um lugar por aqui."),
  ).toBeVisible();
  await page.setViewportSize({ width: 390, height: 844 });
  await page.screenshot({
    path: "test-results/dashboard-mobile.png",
    fullPage: true,
  });
  expect(
    await page.evaluate(
      () => document.documentElement.scrollWidth <= window.innerWidth,
    ),
  ).toBe(true);
  await page.getByRole("button", { name: "Abrir menu", exact: true }).click();
  await expect(page.getByRole("dialog")).toBeVisible();
  await page
    .getByRole("dialog")
    .getByRole("link", { name: /Contas conectadas/ })
    .click();
  await expect(
    page.getByRole("heading", { name: "Contas conectadas" }),
  ).toBeVisible();
  await page.getByRole("button", { name: "Abrir menu", exact: true }).click();
  await page
    .getByRole("dialog")
    .getByRole("button", { name: "Sair da conta" })
    .click();
  await expect(page).toHaveURL(/\/login$/);
  await page.getByLabel("Email", { exact: true }).fill(email);
  await page.getByLabel("Senha", { exact: true }).fill("uma-senha-segura-2026");
  await page.getByRole("button", { name: "Entrar na minha conta" }).click();
  await expect(page).toHaveURL(/\/dashboard$/);
  await expect(page.getByRole("heading", { name: /Olá, Ana/ })).toBeVisible();
});

test("confirma email e recupera senha usando a outbox real do banco de teste", async ({
  page,
}) => {
  test.setTimeout(120_000);
  const email = `qa-email-${Date.now()}@example.com`;
  await page.goto("/register");
  await page.getByLabel("Seu nome", { exact: true }).fill("Pessoa de teste");
  await page
    .getByLabel("Nome do workspace", { exact: true })
    .fill("Teste de emails");
  await page.getByLabel("Email", { exact: true }).fill(email);
  await page.getByLabel("Senha", { exact: true }).fill("uma-senha-segura-2026");
  await page.getByRole("button", { name: "Criar minha conta" }).click();
  await expect(page).toHaveURL(/\/dashboard$/);
  const verify = readTestEmailToken(email, "verify");
  await page.goto(`/verify-email#token=${verify}`);
  await page.getByRole("button", { name: "Confirmar meu email" }).click();
  await expect(page.getByText("Email confirmado com sucesso.")).toBeVisible();
  await page.getByRole("link", { name: "Continuar" }).click();
  await expect(
    page.getByText("Endereço confirmado e conta protegida."),
  ).toBeVisible();
  await page.goto("/forgot-password");
  await page.getByLabel("Email", { exact: true }).fill(email);
  await page
    .getByRole("button", { name: "Enviar link de recuperação" })
    .click();
  await expect(
    page.getByText(
      "Se o email estiver cadastrado, enviaremos um link de recuperação.",
    ),
  ).toBeVisible();
  const reset = readTestEmailToken(email, "reset");
  await page.goto(`/reset-password#token=${reset}`);
  await page
    .getByLabel("Senha", { exact: true })
    .fill("uma-senha-nova-segura-2026");
  await page.getByRole("button", { name: "Salvar nova senha" }).click();
  await expect(
    page.getByText("Senha atualizada. Entre novamente com sua nova senha."),
  ).toBeVisible();
  await page.goto("/dashboard");
  await expect(page).toHaveURL(/\/login$/);
  await page.getByLabel("Email", { exact: true }).fill(email);
  await page
    .getByLabel("Senha", { exact: true })
    .fill("uma-senha-nova-segura-2026");
  await page.getByRole("button", { name: "Entrar na minha conta" }).click();
  await expect(page).toHaveURL(/\/dashboard$/);
});

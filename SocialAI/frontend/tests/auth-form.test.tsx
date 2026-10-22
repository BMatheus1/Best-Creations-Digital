import { fireEvent, render, screen, waitFor } from "@testing-library/react";
import { beforeEach, describe, expect, it, vi } from "vitest";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { AuthForm } from "@/components/auth-form";

const { replace } = vi.hoisted(() => ({ replace: vi.fn() }));
vi.mock("next/navigation", () => ({ useRouter: () => ({ replace }) }));
function show(mode: "login" | "register" | "forgot-password") {
  return render(
    <QueryClientProvider client={new QueryClient()}>
      <AuthForm mode={mode} />
    </QueryClientProvider>,
  );
}
beforeEach(() => {
  vi.restoreAllMocks();
  replace.mockClear();
});

describe("formulários de autenticação", () => {
  it("impede cadastro inválido e mostra os erros", async () => {
    const fetchMock = vi.spyOn(globalThis, "fetch");
    show("register");
    fireEvent.click(screen.getByRole("button", { name: /criar minha conta/i }));
    expect(await screen.findByText("Informe um email válido.")).toBeVisible();
    expect(
      screen.getByText("Use pelo menos 12 caracteres e no máximo 128."),
    ).toBeVisible();
    expect(fetchMock).not.toHaveBeenCalled();
  });
  it("envia login e navega somente após confirmação do backend", async () => {
    const fetchMock = vi
      .spyOn(globalThis, "fetch")
      .mockResolvedValue(
        new Response(JSON.stringify({ user: {}, workspaces: [] }), {
          status: 200,
        }),
      );
    show("login");
    fireEvent.change(screen.getByLabelText("Email"), {
      target: { value: "ana@example.com" },
    });
    fireEvent.change(screen.getByLabelText("Senha"), {
      target: { value: "uma-senha-segura-2026" },
    });
    fireEvent.click(
      screen.getByRole("button", { name: /entrar na minha conta/i }),
    );
    await waitFor(() => expect(replace).toHaveBeenCalledWith("/dashboard"));
    expect(fetchMock).toHaveBeenCalledWith(
      "/api/v1/auth/login",
      expect.objectContaining({ method: "POST", credentials: "same-origin" }),
    );
  });
  it("mostra falha do backend e mantém o usuário no formulário", async () => {
    vi.spyOn(globalThis, "fetch").mockResolvedValue(
      new Response(JSON.stringify({ detail: "Email ou senha incorretos." }), {
        status: 401,
      }),
    );
    show("login");
    fireEvent.change(screen.getByLabelText("Email"), {
      target: { value: "ana@example.com" },
    });
    fireEvent.change(screen.getByLabelText("Senha"), {
      target: { value: "uma-senha-incorreta" },
    });
    fireEvent.click(
      screen.getByRole("button", { name: /entrar na minha conta/i }),
    );
    expect(await screen.findByRole("alert")).toHaveTextContent(
      "Email ou senha incorretos.",
    );
    expect(replace).not.toHaveBeenCalled();
  });
  it("permite mostrar e ocultar a senha", () => {
    show("login");
    expect(screen.getByLabelText("Senha")).toHaveAttribute("type", "password");
    fireEvent.click(screen.getByRole("button", { name: "Mostrar senha" }));
    expect(screen.getByLabelText("Senha")).toHaveAttribute("type", "text");
    fireEvent.click(screen.getByRole("button", { name: "Ocultar senha" }));
    expect(screen.getByLabelText("Senha")).toHaveAttribute("type", "password");
  });
});

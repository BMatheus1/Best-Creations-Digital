"use client";
import { useState, useSyncExternalStore } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { useQueryClient } from "@tanstack/react-query";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";
import {
  ArrowRight,
  CheckCircle2,
  Eye,
  EyeOff,
  LoaderCircle,
  Mail,
} from "lucide-react";
import { api, type SessionData } from "@/lib/api";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";

export const authSchema = z.object({
  email: z.string().optional(),
  password: z.string().optional(),
  name: z.string().optional(),
  workspace_name: z.string().optional(),
});
type AuthValues = z.infer<typeof authSchema>;
type Mode =
  "login" | "register" | "forgot-password" | "reset-password" | "verify-email";
const titles: Record<Mode, [string, string]> = {
  login: [
    "Que bom ter você por aqui.",
    "Entre para cuidar da sua próxima ideia.",
  ],
  register: [
    "Seu próximo capítulo começa aqui.",
    "Crie sua conta e organize seu espaço de trabalho.",
  ],
  "forgot-password": [
    "Vamos recuperar seu acesso.",
    "Enviaremos um link para você criar uma nova senha.",
  ],
  "reset-password": [
    "Uma nova senha, um novo começo.",
    "Escolha uma senha com pelo menos 12 caracteres.",
  ],
  "verify-email": [
    "Confirme que este email é seu.",
    "Confirme seu endereço para manter sua conta protegida.",
  ],
};
const subscribe = (callback: () => void) => {
  window.addEventListener("hashchange", callback);
  return () => window.removeEventListener("hashchange", callback);
};

export function AuthForm({ mode }: { mode: Mode }) {
  const router = useRouter();
  const cache = useQueryClient();
  const [showPassword, setShowPassword] = useState(false);
  const [error, setError] = useState("");
  const [success, setSuccess] = useState("");
  const token = useSyncExternalStore(
    subscribe,
    () => new URLSearchParams(window.location.hash.slice(1)).get("token") || "",
    () => "",
  );
  const emailField = ["login", "register", "forgot-password"].includes(mode);
  const passwordField = ["login", "register", "reset-password"].includes(mode);
  const schema = authSchema.superRefine((values, context) => {
    if (emailField && !z.email().safeParse(values.email).success) {
      context.addIssue({
        code: "custom",
        path: ["email"],
        message: "Informe um email válido.",
      });
    }
    if (
      passwordField &&
      (!values.password ||
        values.password.length < 12 ||
        values.password.length > 128)
    ) {
      context.addIssue({
        code: "custom",
        path: ["password"],
        message: "Use pelo menos 12 caracteres e no máximo 128.",
      });
    }
    if (mode === "register") {
      for (const field of ["name", "workspace_name"] as const) {
        if (
          !values[field] ||
          values[field].trim().length < 2 ||
          values[field].length > 100
        ) {
          context.addIssue({
            code: "custom",
            path: [field],
            message:
              field === "name"
                ? "Informe seu nome."
                : "Dê um nome ao seu workspace.",
          });
        }
      }
    }
  });
  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitting },
  } = useForm<AuthValues>({
    resolver: zodResolver(schema),
  });
  const onSubmit = async (values: AuthValues) => {
    setError("");
    try {
      if (mode === "register" || mode === "login") {
        const session = await api<SessionData>(`/auth/${mode}`, {
          method: "POST",
          body: JSON.stringify(values),
        });
        cache.clear();
        cache.setQueryData(["session"], session);
        router.replace("/dashboard");
      } else {
        if ((mode === "verify-email" || mode === "reset-password") && !token) {
          setError("Abra o link completo enviado para seu email.");
          return;
        }
        const result = await api<{ message: string }>(`/auth/${mode}`, {
          method: "POST",
          body: JSON.stringify(
            mode === "forgot-password" ? values : { ...values, token },
          ),
        });
        setSuccess(result.message);
        if (mode === "verify-email")
          await cache.invalidateQueries({ queryKey: ["session"] });
      }
    } catch (err) {
      setError(
        err instanceof Error ? err.message : "Não foi possível continuar.",
      );
    }
  };
  return (
    <div className="auth-form-wrap">
      <span className="eyebrow">BEM-VINDO AO POSTPILOT</span>
      <h1>{titles[mode][0]}</h1>
      <p className="auth-description">{titles[mode][1]}</p>
      {success ? (
        <div className="success-panel" role="status">
          <CheckCircle2 size={30} />
          <h3>Pronto!</h3>
          <p>{success}</p>
          <Button asChild>
            <Link href={mode === "verify-email" ? "/dashboard" : "/login"}>
              Continuar <ArrowRight size={16} />
            </Link>
          </Button>
        </div>
      ) : (
        <form onSubmit={handleSubmit(onSubmit)} noValidate>
          {mode === "register" && (
            <>
              <div className="field">
                <label htmlFor="name">Seu nome</label>
                <Input
                  id="name"
                  autoComplete="name"
                  placeholder="Como podemos chamar você?"
                  {...register("name")}
                  aria-invalid={!!errors.name}
                  aria-describedby="name-error"
                />
                <span id="name-error" className="field-error">
                  {errors.name?.message}
                </span>
              </div>
              <div className="field">
                <label htmlFor="workspace_name">Nome do workspace</label>
                <Input
                  id="workspace_name"
                  placeholder="Seu negócio ou sua equipe"
                  {...register("workspace_name")}
                  aria-invalid={!!errors.workspace_name}
                  aria-describedby="workspace-error"
                />
                <span id="workspace-error" className="field-error">
                  {errors.workspace_name?.message}
                </span>
              </div>
            </>
          )}
          {emailField && (
            <div className="field">
              <label htmlFor="email">Email</label>
              <Input
                id="email"
                type="email"
                autoComplete="email"
                placeholder="voce@seunegocio.com.br"
                {...register("email")}
                aria-invalid={!!errors.email}
                aria-describedby="email-error"
              />
              <span id="email-error" className="field-error">
                {errors.email?.message}
              </span>
            </div>
          )}
          {passwordField && (
            <div className="field">
              <div className="label-row">
                <label htmlFor="password">Senha</label>
                {mode === "login" && (
                  <Link href="/forgot-password">Esqueceu a senha?</Link>
                )}
              </div>
              <div className="password-input">
                <Input
                  id="password"
                  type={showPassword ? "text" : "password"}
                  autoComplete={
                    mode === "login" ? "current-password" : "new-password"
                  }
                  placeholder="Pelo menos 12 caracteres"
                  {...register("password")}
                  aria-invalid={!!errors.password}
                  aria-describedby="password-error"
                />
                <button
                  type="button"
                  aria-label={showPassword ? "Ocultar senha" : "Mostrar senha"}
                  onClick={() => setShowPassword(!showPassword)}
                >
                  {showPassword ? <EyeOff size={18} /> : <Eye size={18} />}
                </button>
              </div>
              <span id="password-error" className="field-error">
                {errors.password?.message}
              </span>
            </div>
          )}
          {error && (
            <p className="form-error" role="alert">
              {error}
            </p>
          )}
          <Button type="submit" disabled={isSubmitting} className="auth-submit">
            {isSubmitting ? (
              <LoaderCircle className="spin" size={18} />
            ) : mode === "forgot-password" ? (
              <Mail size={17} />
            ) : null}
            {isSubmitting
              ? "Aguarde…"
              : {
                  login: "Entrar na minha conta",
                  register: "Criar minha conta",
                  "forgot-password": "Enviar link de recuperação",
                  "reset-password": "Salvar nova senha",
                  "verify-email": "Confirmar meu email",
                }[mode]}
            {!isSubmitting && <ArrowRight size={17} />}
          </Button>
        </form>
      )}
      <div className="auth-switch">
        {mode === "login" ? (
          <>
            Ainda não tem uma conta? <Link href="/register">Começar agora</Link>
          </>
        ) : mode === "register" ? (
          <>
            Já tem uma conta? <Link href="/login">Entrar</Link>
          </>
        ) : (
          <Link href="/login">Voltar para o login</Link>
        )}
      </div>
      {mode === "register" && (
        <p className="form-note">
          O cadastro cria seu workspace. Conexão com Instagram, publicações e
          assinaturas serão disponibilizados nas próximas fases.
        </p>
      )}
    </div>
  );
}

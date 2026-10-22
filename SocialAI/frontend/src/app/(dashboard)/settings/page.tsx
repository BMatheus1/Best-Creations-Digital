"use client";
import { useState } from "react";
import { useRouter } from "next/navigation";
import { useForm, type UseFormRegisterReturn } from "react-hook-form";
import { useQuery, useQueryClient } from "@tanstack/react-query";
import { Dialog } from "radix-ui";
import {
  CheckCircle2,
  KeyRound,
  LoaderCircle,
  LockKeyhole,
  Mail,
  Plus,
  Save,
  ShieldCheck,
  Users,
  X,
} from "lucide-react";
import { api, type SessionData, type Workspace } from "@/lib/api";
import { useSession } from "@/components/app-shell";
import { useToast } from "@/components/providers";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";

type Details = { name: string; timezone: string };
type Member = { id: string; name: string; role: "owner" | "admin" | "member" };
const zones = [
  "America/Sao_Paulo",
  "America/Manaus",
  "America/Belem",
  "America/Fortaleza",
  "America/Recife",
  "America/Bahia",
  "America/Cuiaba",
  "America/Rio_Branco",
  "America/Noronha",
  "UTC",
];
function Timezone({
  id,
  value,
  registration,
}: {
  id: string;
  value: string;
  registration: UseFormRegisterReturn<"timezone">;
}) {
  return (
    <select className="input" id={id} {...registration}>
      {[...new Set([value, ...zones])].map((zone) => (
        <option key={zone} value={zone}>
          {zone.replaceAll("_", " ")}
        </option>
      ))}
    </select>
  );
}

export default function Settings() {
  const session = useSession();
  const workspace = session.workspaces.find(
    (ws) => ws.id === session.workspace_id,
  )!;
  return (
    <>
      <div className="page-heading">
        <div>
          <span className="eyebrow">DO SEU JEITO</span>
          <h1>Configurações</h1>
          <p>Os detalhes que deixam este espaço mais seu.</p>
        </div>
        <span className="private-label">
          <ShieldCheck size={15} /> Dados do seu workspace
        </span>
      </div>
      <div className="settings-grid">
        <div>
          <ProfileForm key={session.user.id} session={session} />
          <WorkspaceForm key={workspace.id} workspace={workspace} />
          <SecurityPanel />
        </div>
        <div>
          <Members workspace={workspace} />
          <div className="settings-note">
            <LockKeyhole size={21} />
            <h3>Um espaço privado.</h3>
            <p>
              Seus dados são vinculados ao seu workspace. As permissões são
              verificadas pelo servidor a cada acesso.
            </p>
          </div>
        </div>
      </div>
    </>
  );
}
function ProfileForm({ session }: { session: SessionData }) {
  const cache = useQueryClient();
  const { notify } = useToast();
  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitting },
  } = useForm<Details>({
    defaultValues: { name: session.user.name, timezone: session.user.timezone },
  });
  const save = async (data: Details) => {
    try {
      cache.setQueryData(
        ["session"],
        await api<SessionData>("/users/me", {
          method: "PATCH",
          body: JSON.stringify(data),
        }),
      );
      notify("Seu perfil foi atualizado.");
    } catch (err) {
      notify((err as Error).message, true);
    }
  };
  return (
    <section className="panel settings-panel">
      <div className="panel-heading">
        <div>
          <h2>Meu perfil</h2>
          <p>Como você aparece no PostPilot.</p>
        </div>
        <span className="profile-avatar large">{session.user.name[0]}</span>
      </div>
      <form onSubmit={handleSubmit(save)}>
        <div className="field">
          <label htmlFor="profile-name">Nome</label>
          <Input
            id="profile-name"
            {...register("name", {
              required: "Informe seu nome.",
              minLength: {
                value: 2,
                message: "Use pelo menos dois caracteres.",
              },
              maxLength: 100,
            })}
            aria-invalid={!!errors.name}
          />
          <span className="field-error">{errors.name?.message}</span>
        </div>
        <div className="field">
          <label htmlFor="profile-email">Email</label>
          <Input id="profile-email" value={session.user.email} disabled />
          <span className="input-hint">
            {session.user.email_verified ? (
              <>
                <CheckCircle2 size={13} /> Email confirmado
              </>
            ) : (
              <>
                <Mail size={13} /> Confirmação de email pendente
              </>
            )}
          </span>
        </div>
        <div className="field">
          <label htmlFor="profile-timezone">Seu fuso horário</label>
          <Timezone
            id="profile-timezone"
            value={session.user.timezone}
            registration={register("timezone")}
          />
        </div>
        <div className="form-actions">
          <Button disabled={isSubmitting} type="submit">
            {isSubmitting ? (
              <LoaderCircle className="spin" size={16} />
            ) : (
              <Save size={15} />
            )}{" "}
            Salvar perfil
          </Button>
        </div>
      </form>
    </section>
  );
}
function WorkspaceForm({ workspace }: { workspace: Workspace }) {
  const canEdit = workspace.role !== "member";
  const cache = useQueryClient();
  const { notify } = useToast();
  const [open, setOpen] = useState(false);
  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitting },
  } = useForm<Details>({
    defaultValues: { name: workspace.name, timezone: workspace.timezone },
  });
  const save = async (data: Details) => {
    try {
      cache.setQueryData(
        ["session"],
        await api<SessionData>("/workspaces/current", {
          method: "PATCH",
          body: JSON.stringify(data),
        }),
      );
      notify("Workspace atualizado.");
      await cache.invalidateQueries({ queryKey: ["dashboard"] });
    } catch (err) {
      notify((err as Error).message, true);
    }
  };
  return (
    <section className="panel settings-panel">
      <div className="panel-heading">
        <div>
          <h2>Seu workspace</h2>
          <p>O espaço que reúne seu trabalho.</p>
        </div>
        <Dialog.Root open={open} onOpenChange={setOpen}>
          <Dialog.Trigger asChild>
            <Button variant="outline" size="sm">
              <Plus size={14} /> Novo
            </Button>
          </Dialog.Trigger>
          <Dialog.Portal>
            <Dialog.Overlay className="dialog-overlay" />
            <Dialog.Content className="dialog-content">
              <Dialog.Title>Criar um workspace</Dialog.Title>
              <Dialog.Description>
                Um espaço independente para outro negócio ou equipe.
              </Dialog.Description>
              <NewWorkspace onDone={() => setOpen(false)} />
              <Dialog.Close className="dialog-close" aria-label="Fechar">
                <X size={19} />
              </Dialog.Close>
            </Dialog.Content>
          </Dialog.Portal>
        </Dialog.Root>
      </div>
      <form onSubmit={handleSubmit(save)}>
        <div className="field">
          <label htmlFor="ws-name">Nome do workspace</label>
          <Input
            id="ws-name"
            disabled={!canEdit}
            {...register("name", {
              required: "Informe o nome.",
              minLength: {
                value: 2,
                message: "Use pelo menos dois caracteres.",
              },
              maxLength: 100,
            })}
            aria-invalid={!!errors.name}
          />
          <span className="field-error">{errors.name?.message}</span>
        </div>
        <div className="field">
          <label htmlFor="ws-timezone">Fuso horário do workspace</label>
          <select
            disabled={!canEdit}
            className="input"
            id="ws-timezone"
            {...register("timezone")}
          >
            {[...new Set([workspace.timezone, ...zones])].map((zone) => (
              <option key={zone} value={zone}>
                {zone.replaceAll("_", " ")}
              </option>
            ))}
          </select>
        </div>
        <div className="form-actions">
          {canEdit ? (
            <Button type="submit" disabled={isSubmitting}>
              <Save size={15} /> Salvar workspace
            </Button>
          ) : (
            <p className="input-hint">
              Apenas administradores podem alterar estes dados.
            </p>
          )}
        </div>
      </form>
    </section>
  );
}
function NewWorkspace({ onDone }: { onDone: () => void }) {
  const cache = useQueryClient();
  const { notify } = useToast();
  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitting },
  } = useForm<Details>({ defaultValues: { timezone: "America/Sao_Paulo" } });
  const submit = async (data: Details) => {
    try {
      await api<Workspace>("/workspaces", {
        method: "POST",
        body: JSON.stringify(data),
      });
      await cache.invalidateQueries({ queryKey: ["session"] });
      notify("Workspace criado. Selecione-o no menu lateral.");
      onDone();
    } catch (err) {
      notify((err as Error).message, true);
    }
  };
  return (
    <form onSubmit={handleSubmit(submit)}>
      <div className="field">
        <label htmlFor="new-ws">Nome</label>
        <Input
          id="new-ws"
          {...register("name", {
            required: "Informe o nome.",
            minLength: { value: 2, message: "Use pelo menos dois caracteres." },
            maxLength: 100,
          })}
        />
        <span className="field-error">{errors.name?.message}</span>
      </div>
      <div className="field">
        <label htmlFor="new-tz">Fuso horário</label>
        <Timezone
          id="new-tz"
          value="America/Sao_Paulo"
          registration={register("timezone")}
        />
      </div>
      <Button disabled={isSubmitting} type="submit">
        <Plus size={16} /> Criar workspace
      </Button>
    </form>
  );
}
function Members({ workspace }: { workspace: Workspace }) {
  const members = useQuery({
    queryKey: ["members", workspace.id],
    queryFn: () => api<{ items: Member[] }>("/memberships"),
  });
  const { notify } = useToast();
  const cache = useQueryClient();
  const [busy, setBusy] = useState(false);
  const updateRole = async (id: string, role: string) => {
    setBusy(true);
    try {
      await api(`/memberships/${id}`, {
        method: "PATCH",
        body: JSON.stringify({ role }),
      });
      await cache.invalidateQueries({ queryKey: ["members", workspace.id] });
      notify("Permissão atualizada.");
    } catch (err) {
      notify((err as Error).message, true);
    } finally {
      setBusy(false);
    }
  };
  return (
    <section className="panel settings-panel">
      <div className="panel-heading">
        <div>
          <h2>Pessoas do workspace</h2>
          <p>Acesso e responsabilidades.</p>
        </div>
        <Users size={19} />
      </div>
      {members.isPending ? (
        <p className="muted" role="status">
          Carregando pessoas…
        </p>
      ) : members.isError ? (
        <div role="alert">
          <p>{members.error.message}</p>
          <Button variant="outline" onClick={() => members.refetch()}>
            Tentar novamente
          </Button>
        </div>
      ) : (
        <ul className="member-list">
          {members.data.items.map((member) => (
            <li key={member.id}>
              <span className="profile-avatar">{member.name[0]}</span>
              <div>
                <strong>{member.name}</strong>
                {workspace.role === "owner" && member.role !== "owner" ? (
                  <select
                    className="input"
                    value={member.role}
                    aria-label={`Permissão de ${member.name}`}
                    disabled={busy}
                    onChange={(e) => updateRole(member.id, e.target.value)}
                  >
                    <option value="admin">Administrador</option>
                    <option value="member">Membro</option>
                  </select>
                ) : (
                  <span>
                    {member.role === "owner"
                      ? "Proprietário"
                      : member.role === "admin"
                        ? "Administrador"
                        : "Membro"}
                  </span>
                )}
              </div>
            </li>
          ))}
        </ul>
      )}
      <p className="form-note">
        Convites para novos membros serão disponibilizados em uma próxima etapa.
      </p>
    </section>
  );
}
function SecurityPanel() {
  const router = useRouter();
  const session = useSession();
  const cache = useQueryClient();
  const { notify } = useToast();
  const [busy, setBusy] = useState(false);
  const [open, setOpen] = useState(false);
  const reset = async () => {
    setBusy(true);
    try {
      const result = await api<{ message: string }>("/auth/forgot-password", {
        method: "POST",
        body: JSON.stringify({ email: session.user.email }),
      });
      notify(result.message);
    } catch (err) {
      notify((err as Error).message, true);
    } finally {
      setBusy(false);
    }
  };
  const revoke = async () => {
    setBusy(true);
    try {
      await api("/auth/revoke-sessions", { method: "POST" });
      cache.clear();
      router.replace("/login");
      router.refresh();
    } catch (err) {
      notify((err as Error).message, true);
    } finally {
      setBusy(false);
    }
  };
  return (
    <section className="panel settings-panel">
      <div className="panel-heading">
        <div>
          <h2>Segurança da conta</h2>
          <p>Cuide do acesso ao seu espaço.</p>
        </div>
        <KeyRound size={20} />
      </div>
      <div className="security-row">
        <div>
          <strong>Alterar senha</strong>
          <p>Receba um link seguro no seu email.</p>
        </div>
        <Button variant="outline" size="sm" disabled={busy} onClick={reset}>
          Enviar link
        </Button>
      </div>
      <div className="security-row">
        <div>
          <strong>Encerrar todas as sessões</strong>
          <p>Você precisará entrar novamente.</p>
        </div>
        <Dialog.Root open={open} onOpenChange={setOpen}>
          <Dialog.Trigger asChild>
            <Button variant="outline" size="sm">
              Encerrar sessões
            </Button>
          </Dialog.Trigger>
          <Dialog.Portal>
            <Dialog.Overlay className="dialog-overlay" />
            <Dialog.Content className="dialog-content">
              <Dialog.Title>Encerrar todas as sessões?</Dialog.Title>
              <Dialog.Description>
                Todos os acessos ativos à sua conta serão encerrados, incluindo
                este dispositivo.
              </Dialog.Description>
              <div className="dialog-actions">
                <Dialog.Close asChild>
                  <Button variant="outline">Voltar</Button>
                </Dialog.Close>
                <Button variant="destructive" onClick={revoke} disabled={busy}>
                  {busy ? "Encerrando…" : "Encerrar todas"}
                </Button>
              </div>
            </Dialog.Content>
          </Dialog.Portal>
        </Dialog.Root>
      </div>
    </section>
  );
}

import { cookies } from "next/headers";
import { redirect } from "next/navigation";
import { AppShell } from "@/components/app-shell";
import type { SessionData } from "@/lib/api";
import Link from "next/link";

export default async function DashboardLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const cookieStore = await cookies();
  const token = cookieStore.get("pp_session")?.value;
  if (!token) redirect("/login");
  let response: Response;
  try {
    response = await fetch(
      `${process.env.API_BASE_URL || "http://127.0.0.1:8000"}/api/v1/auth/session`,
      {
        headers: { Cookie: `pp_session=${encodeURIComponent(token)}` },
        cache: "no-store",
        signal: AbortSignal.timeout(8000),
      },
    );
  } catch {
    return (
      <main className="standalone">
        <h1>O servidor está indisponível.</h1>
        <p>
          Não foi possível carregar seu workspace. Tente novamente em instantes.
        </p>
        <a className="button button-primary" href="/dashboard">
          Tentar novamente
        </a>
        <Link href="/login">Voltar ao login</Link>
      </main>
    );
  }
  if (response.status === 401 || response.status === 403) redirect("/login");
  if (!response.ok) throw new Error("Não foi possível carregar sua sessão.");
  const session: SessionData = await response.json();
  return <AppShell initialSession={session}>{children}</AppShell>;
}

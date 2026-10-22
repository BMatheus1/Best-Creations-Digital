export class ApiError extends Error {
  constructor(
    public status: number,
    message: string,
  ) {
    super(message);
  }
}

export async function api<T>(
  path: string,
  options: RequestInit = {},
): Promise<T> {
  const csrf =
    typeof document === "undefined"
      ? ""
      : document.cookie
          .split("; ")
          .find((part) => part.startsWith("pp_csrf="))
          ?.split("=")[1] || "";
  let response: Response;
  try {
    response = await fetch(`/api/v1${path}`, {
      ...options,
      credentials: "same-origin",
      cache: "no-store",
      headers: {
        "Content-Type": "application/json",
        "X-CSRF-Token": csrf,
        ...options.headers,
      },
    });
  } catch {
    throw new ApiError(
      0,
      "Não foi possível conectar ao servidor. Tente novamente.",
    );
  }
  if (!response.ok) {
    const body = await response.json().catch(() => null);
    throw new ApiError(
      response.status,
      typeof body?.detail === "string"
        ? body.detail
        : "O servidor não respondeu. Tente novamente.",
    );
  }
  return response.status === 204 ? (undefined as T) : response.json();
}

export type Workspace = {
  id: string;
  name: string;
  timezone: string;
  role: "owner" | "admin" | "member";
};
export type SessionData = {
  user: {
    id: string;
    name: string;
    email: string;
    timezone: string;
    email_verified: boolean;
  };
  workspaces: Workspace[];
  workspace_id: string;
};
export type DashboardData = {
  members: number;
  activity: { id: string; action: string; created_at: string }[];
  content_available: boolean;
  metrics: null;
  upcoming_posts: [];
  integrations: { instagram: string; billing: string };
};

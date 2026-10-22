"use client";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import {
  createContext,
  useCallback,
  useContext,
  useRef,
  useState,
} from "react";

type ToastValue = { notify: (message: string, error?: boolean) => void };
const ToastContext = createContext<ToastValue>({ notify: () => {} });
export const useToast = () => useContext(ToastContext);
export function Providers({ children }: { children: React.ReactNode }) {
  const [queryClient] = useState(
    () =>
      new QueryClient({
        defaultOptions: {
          queries: {
            staleTime: 30_000,
            retry: false,
            refetchOnWindowFocus: false,
          },
        },
      }),
  );
  const [toast, setToast] = useState<{
    message: string;
    error: boolean;
  } | null>(null);
  const timer = useRef<ReturnType<typeof setTimeout> | null>(null);
  const notify = useCallback((message: string, error = false) => {
    if (timer.current) clearTimeout(timer.current);
    setToast({ message, error });
    timer.current = setTimeout(() => setToast(null), 7000);
  }, []);
  return (
    <QueryClientProvider client={queryClient}>
      <ToastContext.Provider value={{ notify }}>
        {children}
        <div
          className={`toast ${toast?.error ? "toast-error" : ""}`}
          role="status"
          aria-live="polite"
        >
          {toast?.message}
        </div>
      </ToastContext.Provider>
    </QueryClientProvider>
  );
}

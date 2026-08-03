import { createFileRoute } from "@tanstack/react-router";
import { AlertTriangle, LoaderCircle } from "lucide-react";

import { AdminDashboard } from "@/components/admin/AdminDashboard";
import { AdminLogin } from "@/components/admin/AdminLogin";
import { useAdminSession } from "@/hooks/use-admin-session";
import { getSupabaseClient } from "@/lib/supabase";

export const Route = createFileRoute("/admin")({
  head: () => ({
    meta: [
      { title: "Painel dos noivos · Lucas & Letícia" },
      { name: "robots", content: "noindex, nofollow" },
    ],
  }),
  component: AdminPage,
});

function AdminPage() {
  const state = useAdminSession();

  if (state.status === "loading") {
    return (
      <main className="flex min-h-screen items-center justify-center bg-[#fbf8f6]">
        <div className="text-center text-muted-foreground">
          <LoaderCircle className="mx-auto h-7 w-7 animate-spin text-primary" />
          <p className="mt-3 text-sm">Carregando painel...</p>
        </div>
      </main>
    );
  }

  if (state.status === "signed-out") return <AdminLogin />;

  if (state.status === "authenticated") {
    return <AdminDashboard profile={state.profile} email={state.email} />;
  }

  const isUnauthorized = state.status === "unauthorized";

  return (
    <main className="flex min-h-screen items-center justify-center bg-[#fbf8f6] px-5 py-12">
      <section className="w-full max-w-md rounded-3xl border border-border bg-card p-8 text-center shadow-elegant">
        <span className="mx-auto flex h-14 w-14 items-center justify-center rounded-2xl bg-amber-50 text-amber-700">
          <AlertTriangle className="h-6 w-6" />
        </span>
        <h1 className="mt-5 font-display text-2xl">
          {isUnauthorized ? "Acesso não autorizado" : "Não foi possível abrir o painel"}
        </h1>
        <p className="mt-3 text-sm leading-relaxed text-muted-foreground">
          {isUnauthorized
            ? `A conta ${state.email} existe, mas ainda não foi autorizada como administradora.`
            : state.message}
        </p>
        <button
          type="button"
          onClick={() => void getSupabaseClient().auth.signOut()}
          className="mt-6 rounded-full bg-primary px-5 py-2.5 text-sm font-medium text-primary-foreground"
        >
          Voltar ao login
        </button>
      </section>
    </main>
  );
}

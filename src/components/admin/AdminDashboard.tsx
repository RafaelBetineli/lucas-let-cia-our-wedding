import { useMemo, useState } from "react";
import { useQuery } from "@tanstack/react-query";
import {
  CheckCircle2,
  ClipboardList,
  Heart,
  LayoutDashboard,
  LogOut,
  Menu,
  MessageSquareText,
  RefreshCw,
  Utensils,
  Users,
} from "lucide-react";

import { MessageModeration } from "@/components/admin/MessageModeration";
import { RSVPList } from "@/components/admin/RSVPList";
import {
  Sheet,
  SheetClose,
  SheetContent,
  SheetHeader,
  SheetTitle,
  SheetTrigger,
} from "@/components/ui/sheet";
import { getSupabaseClient } from "@/lib/supabase";
import type { AdminProfile, AdminView, RSVPResponse } from "@/types/admin";

export function AdminDashboard({ profile, email }: { profile: AdminProfile; email: string }) {
  const [view, setView] = useState<AdminView>("overview");
  const query = useQuery({
    queryKey: ["admin-rsvp-responses"],
    queryFn: loadResponses,
  });
  const responses = query.data ?? [];

  async function signOut() {
    await getSupabaseClient().auth.signOut();
  }

  const content = query.isLoading ? (
    <DashboardSkeleton />
  ) : query.isError ? (
    <DashboardError onRetry={() => void query.refetch()} />
  ) : view === "confirmations" ? (
    <RSVPList responses={responses} />
  ) : view === "messages" ? (
    <MessageModeration responses={responses} />
  ) : (
    <Overview responses={responses} onNavigate={setView} />
  );

  return (
    <div className="min-h-screen bg-[#f8f6f4] text-foreground">
      <aside className="fixed inset-y-0 left-0 z-30 hidden w-64 border-r border-white/10 bg-[#522f3d] text-white lg:flex lg:flex-col">
        <SidebarContent
          activeView={view}
          displayName={profile.display_name}
          email={email}
          onNavigate={setView}
          onSignOut={() => void signOut()}
        />
      </aside>

      <div className="lg:pl-64">
        <header className="sticky top-0 z-20 flex h-18 items-center justify-between border-b border-border bg-card/95 px-4 backdrop-blur sm:px-6 lg:px-8">
          <div className="flex items-center gap-3">
            <Sheet>
              <SheetTrigger asChild>
                <button
                  type="button"
                  className="inline-flex h-10 w-10 items-center justify-center rounded-xl border border-border bg-background text-foreground lg:hidden"
                  aria-label="Abrir menu"
                >
                  <Menu className="h-5 w-5" />
                </button>
              </SheetTrigger>
              <SheetContent
                side="left"
                className="w-[min(86vw,20rem)] border-none bg-[#522f3d] p-0 text-white"
              >
                <SheetHeader className="sr-only">
                  <SheetTitle>Menu do painel</SheetTitle>
                </SheetHeader>
                <SidebarContent
                  activeView={view}
                  displayName={profile.display_name}
                  email={email}
                  onNavigate={setView}
                  onSignOut={() => void signOut()}
                  mobile
                />
              </SheetContent>
            </Sheet>
            <div>
              <p className="text-xs text-muted-foreground">Painel administrativo</p>
              <p className="font-medium">Olá, {profile.display_name}</p>
            </div>
          </div>
          <a
            href="/"
            target="_blank"
            rel="noreferrer"
            className="rounded-full border border-border px-4 py-2 text-xs font-medium transition hover:border-primary/40 hover:text-primary sm:text-sm"
          >
            Ver site
          </a>
        </header>

        <main className="mx-auto max-w-7xl px-4 py-7 sm:px-6 sm:py-9 lg:px-8">{content}</main>
      </div>
    </div>
  );
}

function SidebarContent({
  activeView,
  displayName,
  email,
  onNavigate,
  onSignOut,
  mobile = false,
}: {
  activeView: AdminView;
  displayName: string;
  email: string;
  onNavigate: (view: AdminView) => void;
  onSignOut: () => void;
  mobile?: boolean;
}) {
  const items: Array<{ view: AdminView; label: string; icon: typeof LayoutDashboard }> = [
    { view: "overview", label: "Visão geral", icon: LayoutDashboard },
    { view: "confirmations", label: "Confirmações", icon: ClipboardList },
    { view: "messages", label: "Mensagens", icon: MessageSquareText },
  ];

  const content = (
    <>
      <div className="flex h-22 items-center gap-3 border-b border-white/10 px-6">
        <span className="flex h-10 w-10 items-center justify-center rounded-xl bg-white/10 text-[#f1cbd1]">
          <Heart className="h-5 w-5" />
        </span>
        <div>
          <p className="font-display text-lg">Lucas &amp; Letícia</p>
          <p className="text-[11px] uppercase tracking-[0.18em] text-white/55">Nosso casamento</p>
        </div>
      </div>

      <nav className="flex-1 space-y-1 px-3 py-6" aria-label="Navegação do painel">
        {items.map((item) => {
          const Icon = item.icon;
          const button = (
            <button
              type="button"
              onClick={() => onNavigate(item.view)}
              className={`flex w-full items-center gap-3 rounded-xl px-4 py-3 text-left text-sm transition ${
                activeView === item.view
                  ? "bg-white/12 font-medium text-white"
                  : "text-white/65 hover:bg-white/7 hover:text-white"
              }`}
            >
              <Icon className="h-4 w-4" />
              {item.label}
            </button>
          );

          return mobile ? (
            <SheetClose asChild key={item.view}>
              {button}
            </SheetClose>
          ) : (
            <div key={item.view}>{button}</div>
          );
        })}
      </nav>

      <div className="border-t border-white/10 p-4">
        <div className="mb-3 min-w-0 px-2">
          <p className="truncate text-sm font-medium">{displayName}</p>
          <p className="truncate text-xs text-white/50">{email}</p>
        </div>
        <button
          type="button"
          onClick={onSignOut}
          className="flex w-full items-center gap-3 rounded-xl px-3 py-2.5 text-sm text-white/65 transition hover:bg-white/7 hover:text-white"
        >
          <LogOut className="h-4 w-4" /> Sair
        </button>
      </div>
    </>
  );

  return <div className="flex h-full flex-col">{content}</div>;
}

function Overview({
  responses,
  onNavigate,
}: {
  responses: RSVPResponse[];
  onNavigate: (view: AdminView) => void;
}) {
  const stats = useMemo(() => {
    const guestCount = responses.reduce((total, response) => total + response.guest_count, 0);
    const dietaryCount = responses.filter((response) =>
      response.dietary_restrictions?.trim(),
    ).length;
    const pendingMessages = responses.filter(
      (response) =>
        response.message?.trim() && response.message_public && !response.message_approved,
    ).length;

    return { guestCount, dietaryCount, pendingMessages };
  }, [responses]);

  const cards = [
    {
      label: "Respostas recebidas",
      value: responses.length,
      icon: CheckCircle2,
      color: "text-primary bg-primary/10",
    },
    {
      label: "Convidados confirmados",
      value: stats.guestCount,
      icon: Users,
      color: "text-sky-700 bg-sky-50",
    },
    {
      label: "Restrições alimentares",
      value: stats.dietaryCount,
      icon: Utensils,
      color: "text-amber-700 bg-amber-50",
    },
    {
      label: "Mensagens para aprovar",
      value: stats.pendingMessages,
      icon: MessageSquareText,
      color: "text-emerald-700 bg-emerald-50",
    },
  ];

  return (
    <section aria-labelledby="overview-title">
      <div className="mb-7">
        <p className="text-xs font-medium uppercase tracking-[0.2em] text-primary">Resumo</p>
        <h1 id="overview-title" className="mt-2 font-display text-3xl sm:text-4xl">
          Visão geral
        </h1>
        <p className="mt-2 text-sm text-muted-foreground">
          Acompanhe rapidamente as respostas dos convidados.
        </p>
      </div>

      <div className="grid gap-4 sm:grid-cols-2 xl:grid-cols-4">
        {cards.map((card) => {
          const Icon = card.icon;
          return (
            <article
              key={card.label}
              className="rounded-2xl border border-border bg-card p-5 shadow-card"
            >
              <div
                className={`flex h-11 w-11 items-center justify-center rounded-xl ${card.color}`}
              >
                <Icon className="h-5 w-5" />
              </div>
              <p className="mt-5 text-3xl font-semibold tracking-tight">{card.value}</p>
              <p className="mt-1 text-sm text-muted-foreground">{card.label}</p>
            </article>
          );
        })}
      </div>

      <div className="mt-7 grid gap-5 lg:grid-cols-2">
        <QuickAccess
          title="Confirmações"
          description="Veja contatos, quantidade de pessoas e restrições alimentares."
          action="Ver confirmações"
          onClick={() => onNavigate("confirmations")}
        />
        <QuickAccess
          title="Mural de mensagens"
          description="Revise o consentimento e escolha quais mensagens aparecerão no site."
          action="Moderar mensagens"
          onClick={() => onNavigate("messages")}
        />
      </div>
    </section>
  );
}

function QuickAccess({
  title,
  description,
  action,
  onClick,
}: {
  title: string;
  description: string;
  action: string;
  onClick: () => void;
}) {
  return (
    <article className="rounded-2xl border border-border bg-card p-6 shadow-card">
      <h2 className="font-display text-xl">{title}</h2>
      <p className="mt-2 min-h-10 text-sm leading-relaxed text-muted-foreground">{description}</p>
      <button
        type="button"
        onClick={onClick}
        className="mt-5 rounded-full border border-primary/25 px-4 py-2 text-sm font-medium text-primary transition hover:bg-primary/5"
      >
        {action}
      </button>
    </article>
  );
}

function DashboardSkeleton() {
  return (
    <div className="animate-pulse">
      <div className="h-9 w-52 rounded-lg bg-muted" />
      <div className="mt-3 h-4 w-72 max-w-full rounded bg-muted" />
      <div className="mt-8 grid gap-4 sm:grid-cols-2 xl:grid-cols-4">
        {Array.from({ length: 4 }).map((_, index) => (
          <div key={index} className="h-40 rounded-2xl border border-border bg-card" />
        ))}
      </div>
    </div>
  );
}

function DashboardError({ onRetry }: { onRetry: () => void }) {
  return (
    <div className="rounded-2xl border border-destructive/20 bg-card px-6 py-12 text-center shadow-card">
      <p className="font-medium">Não foi possível carregar as confirmações.</p>
      <p className="mt-1 text-sm text-muted-foreground">Verifique sua conexão e tente novamente.</p>
      <button
        type="button"
        onClick={onRetry}
        className="mx-auto mt-5 flex items-center gap-2 rounded-full border border-primary/25 px-4 py-2 text-sm font-medium text-primary"
      >
        <RefreshCw className="h-4 w-4" /> Tentar novamente
      </button>
    </div>
  );
}

async function loadResponses(): Promise<RSVPResponse[]> {
  const { data, error } = await getSupabaseClient()
    .from("rsvp_responses")
    .select(
      "id, full_name, phone, email, guest_count, dietary_restrictions, message, message_public, message_approved, created_at",
    )
    .order("created_at", { ascending: false });

  if (error) throw error;
  return (data ?? []) as RSVPResponse[];
}

import { useState } from "react";
import { Heart, LoaderCircle, LockKeyhole } from "lucide-react";

import { getSupabaseClient } from "@/lib/supabase";

export function AdminLogin() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [submitting, setSubmitting] = useState(false);
  const [errorMessage, setErrorMessage] = useState<string | null>(null);

  async function handleSubmit(event: React.FormEvent<HTMLFormElement>) {
    event.preventDefault();
    if (submitting) return;

    setSubmitting(true);
    setErrorMessage(null);

    try {
      const { error } = await getSupabaseClient().auth.signInWithPassword({
        email: email.trim(),
        password,
      });

      if (error) throw error;
    } catch (error) {
      console.error("Não foi possível entrar no painel.", error);
      setErrorMessage("E-mail ou senha inválidos. Confira os dados e tente novamente.");
    } finally {
      setSubmitting(false);
    }
  }

  return (
    <main className="relative flex min-h-screen items-center justify-center overflow-hidden bg-[#fbf8f6] px-5 py-12 text-foreground">
      <div className="pointer-events-none absolute -left-32 top-10 h-80 w-80 rounded-full bg-primary/10 blur-3xl" />
      <div className="pointer-events-none absolute -right-24 bottom-0 h-72 w-72 rounded-full bg-[#d6a8a0]/20 blur-3xl" />

      <section className="relative w-full max-w-md rounded-3xl border border-border bg-card p-7 shadow-elegant sm:p-9">
        <div className="mb-8 text-center">
          <div className="mx-auto mb-4 flex h-14 w-14 items-center justify-center rounded-2xl bg-primary/10 text-primary">
            <Heart className="h-6 w-6" aria-hidden="true" />
          </div>
          <p className="text-xs font-medium uppercase tracking-[0.28em] text-primary">
            Lucas &amp; Letícia
          </p>
          <h1 className="mt-3 font-display text-3xl">Painel dos noivos</h1>
          <p className="mt-2 text-sm leading-relaxed text-muted-foreground">
            Entre para acompanhar as confirmações e cuidar do mural de mensagens.
          </p>
        </div>

        <form className="space-y-5" onSubmit={handleSubmit}>
          <label className="block">
            <span className="mb-2 block text-xs font-medium uppercase tracking-[0.16em] text-muted-foreground">
              E-mail
            </span>
            <input
              required
              type="email"
              autoComplete="email"
              value={email}
              onChange={(event) => setEmail(event.target.value)}
              className={inputClassName}
              placeholder="seu@email.com"
            />
          </label>

          <label className="block">
            <span className="mb-2 block text-xs font-medium uppercase tracking-[0.16em] text-muted-foreground">
              Senha
            </span>
            <input
              required
              type="password"
              autoComplete="current-password"
              value={password}
              onChange={(event) => setPassword(event.target.value)}
              className={inputClassName}
              placeholder="Sua senha"
            />
          </label>

          {errorMessage && (
            <p
              role="alert"
              className="rounded-xl border border-destructive/20 bg-destructive/5 px-4 py-3 text-sm text-destructive"
            >
              {errorMessage}
            </p>
          )}

          <button
            type="submit"
            disabled={submitting}
            aria-busy={submitting}
            className="flex w-full items-center justify-center gap-2 rounded-full bg-primary px-6 py-3.5 text-sm font-medium text-primary-foreground shadow-soft transition hover:opacity-90 disabled:cursor-not-allowed disabled:opacity-60"
          >
            {submitting ? (
              <LoaderCircle className="h-4 w-4 animate-spin" aria-hidden="true" />
            ) : (
              <LockKeyhole className="h-4 w-4" aria-hidden="true" />
            )}
            {submitting ? "Entrando..." : "Entrar no painel"}
          </button>
        </form>

        <a
          href="/"
          className="mx-auto mt-6 block w-fit text-sm text-muted-foreground transition hover:text-primary"
        >
          Voltar ao site
        </a>
      </section>
    </main>
  );
}

const inputClassName =
  "w-full rounded-xl border border-border bg-background px-4 py-3 text-sm outline-none transition placeholder:text-muted-foreground/60 focus:border-primary focus:ring-2 focus:ring-primary/30";

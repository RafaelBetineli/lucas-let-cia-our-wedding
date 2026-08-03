import { useMemo, useState } from "react";
import { Mail, Search, Utensils } from "lucide-react";

import type { RSVPResponse } from "@/types/admin";

export function RSVPList({ responses }: { responses: RSVPResponse[] }) {
  const [search, setSearch] = useState("");
  const [onlyDietary, setOnlyDietary] = useState(false);

  const filteredResponses = useMemo(() => {
    const term = search.trim().toLocaleLowerCase("pt-BR");

    return responses.filter((response) => {
      const matchesSearch =
        !term ||
        [response.full_name, response.phone, response.email]
          .filter(Boolean)
          .some((value) => value?.toLocaleLowerCase("pt-BR").includes(term));
      const matchesDietary = !onlyDietary || Boolean(response.dietary_restrictions?.trim());

      return matchesSearch && matchesDietary;
    });
  }, [onlyDietary, responses, search]);

  return (
    <section aria-labelledby="confirmations-title">
      <div className="mb-6">
        <h2 id="confirmations-title" className="font-display text-2xl sm:text-3xl">
          Confirmações de presença
        </h2>
        <p className="mt-1 text-sm text-muted-foreground">
          {responses.length} {responses.length === 1 ? "resposta recebida" : "respostas recebidas"}
        </p>
      </div>

      <div className="mb-5 flex flex-col gap-3 rounded-2xl border border-border bg-card p-4 shadow-card sm:flex-row sm:items-center">
        <label className="relative flex-1">
          <span className="sr-only">Buscar confirmações</span>
          <Search className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-muted-foreground" />
          <input
            type="search"
            value={search}
            onChange={(event) => setSearch(event.target.value)}
            placeholder="Buscar por nome, telefone ou e-mail"
            className="w-full rounded-xl border border-border bg-background py-2.5 pl-10 pr-4 text-sm outline-none focus:border-primary focus:ring-2 focus:ring-primary/25"
          />
        </label>
        <label className="flex cursor-pointer items-center gap-2 rounded-xl px-2 py-2 text-sm text-muted-foreground">
          <input
            type="checkbox"
            checked={onlyDietary}
            onChange={(event) => setOnlyDietary(event.target.checked)}
            className="h-4 w-4 accent-primary"
          />
          Com restrição alimentar
        </label>
      </div>

      {filteredResponses.length === 0 ? (
        <EmptyResult />
      ) : (
        <>
          <div className="hidden overflow-hidden rounded-2xl border border-border bg-card shadow-card md:block">
            <div className="overflow-x-auto">
              <table className="w-full min-w-[760px] text-left text-sm">
                <thead className="border-b border-border bg-muted/40 text-xs uppercase tracking-[0.12em] text-muted-foreground">
                  <tr>
                    <th className="px-5 py-4 font-medium">Convidado</th>
                    <th className="px-5 py-4 font-medium">Contato</th>
                    <th className="px-5 py-4 text-center font-medium">Pessoas</th>
                    <th className="px-5 py-4 font-medium">Restrições</th>
                    <th className="px-5 py-4 font-medium">Recebida em</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-border">
                  {filteredResponses.map((response) => (
                    <tr key={response.id} className="align-top transition hover:bg-muted/25">
                      <td className="px-5 py-4 font-medium">{response.full_name}</td>
                      <td className="px-5 py-4 text-muted-foreground">
                        <a className="block hover:text-primary" href={`tel:${response.phone}`}>
                          {response.phone}
                        </a>
                        {response.email && (
                          <a
                            className="mt-1 block hover:text-primary"
                            href={`mailto:${response.email}`}
                          >
                            {response.email}
                          </a>
                        )}
                      </td>
                      <td className="px-5 py-4 text-center font-medium">{response.guest_count}</td>
                      <td className="max-w-60 px-5 py-4 text-muted-foreground">
                        {response.dietary_restrictions || "—"}
                      </td>
                      <td className="whitespace-nowrap px-5 py-4 text-muted-foreground">
                        {formatDate(response.created_at)}
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>

          <div className="grid gap-4 md:hidden">
            {filteredResponses.map((response) => (
              <article
                key={response.id}
                className="rounded-2xl border border-border bg-card p-5 shadow-card"
              >
                <div className="flex items-start justify-between gap-4">
                  <div>
                    <h3 className="font-medium">{response.full_name}</h3>
                    <p className="mt-1 text-xs text-muted-foreground">
                      {formatDate(response.created_at)}
                    </p>
                  </div>
                  <span className="rounded-full bg-primary/10 px-3 py-1 text-xs font-medium text-primary">
                    {response.guest_count} {response.guest_count === 1 ? "pessoa" : "pessoas"}
                  </span>
                </div>
                <div className="mt-4 space-y-2 text-sm text-muted-foreground">
                  <a className="block hover:text-primary" href={`tel:${response.phone}`}>
                    {response.phone}
                  </a>
                  {response.email && (
                    <a
                      className="flex items-center gap-2 hover:text-primary"
                      href={`mailto:${response.email}`}
                    >
                      <Mail className="h-4 w-4" /> {response.email}
                    </a>
                  )}
                  {response.dietary_restrictions && (
                    <p className="flex items-start gap-2 pt-2 text-foreground/80">
                      <Utensils className="mt-0.5 h-4 w-4 shrink-0 text-primary" />
                      {response.dietary_restrictions}
                    </p>
                  )}
                </div>
              </article>
            ))}
          </div>
        </>
      )}
    </section>
  );
}

function EmptyResult() {
  return (
    <div className="rounded-2xl border border-dashed border-border bg-card px-6 py-12 text-center">
      <p className="font-medium">Nenhuma confirmação encontrada.</p>
      <p className="mt-1 text-sm text-muted-foreground">Tente ajustar a busca ou o filtro.</p>
    </div>
  );
}

function formatDate(value: string) {
  return new Intl.DateTimeFormat("pt-BR", {
    dateStyle: "short",
    timeStyle: "short",
  }).format(new Date(value));
}

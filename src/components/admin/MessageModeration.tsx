import { useState } from "react";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { Check, EyeOff, LoaderCircle, MessageSquareText } from "lucide-react";

import { getSupabaseClient } from "@/lib/supabase";
import type { RSVPResponse } from "@/types/admin";

export function MessageModeration({ responses }: { responses: RSVPResponse[] }) {
  const messages = responses.filter((response) => Boolean(response.message?.trim()));
  const queryClient = useQueryClient();
  const [mutationError, setMutationError] = useState<string | null>(null);

  const mutation = useMutation({
    mutationFn: async ({ id, approved }: { id: string; approved: boolean }) => {
      const { error } = await getSupabaseClient()
        .from("rsvp_responses")
        .update({ message_approved: approved })
        .eq("id", id);

      if (error) throw error;
    },
    onMutate: () => setMutationError(null),
    onSuccess: async () => {
      await Promise.all([
        queryClient.invalidateQueries({ queryKey: ["admin-rsvp-responses"] }),
        queryClient.invalidateQueries({ queryKey: ["public-rsvp-messages"] }),
      ]);
    },
    onError: (error) => {
      console.error("Não foi possível atualizar a mensagem.", error);
      setMutationError("Não foi possível atualizar o mural. Tente novamente.");
    },
  });

  return (
    <section aria-labelledby="messages-title">
      <div className="mb-6">
        <h2 id="messages-title" className="font-display text-2xl sm:text-3xl">
          Mural de mensagens
        </h2>
        <p className="mt-1 text-sm text-muted-foreground">
          Publique somente mensagens autorizadas pelos convidados.
        </p>
      </div>

      {mutationError && (
        <p
          role="alert"
          className="mb-5 rounded-xl border border-destructive/20 bg-destructive/5 px-4 py-3 text-sm text-destructive"
        >
          {mutationError}
        </p>
      )}

      {messages.length === 0 ? (
        <div className="rounded-2xl border border-dashed border-border bg-card px-6 py-14 text-center">
          <MessageSquareText className="mx-auto h-8 w-8 text-primary/60" />
          <p className="mt-4 font-medium">Ainda não há mensagens.</p>
          <p className="mt-1 text-sm text-muted-foreground">
            As mensagens enviadas pelo RSVP aparecerão aqui.
          </p>
        </div>
      ) : (
        <div className="grid gap-4 xl:grid-cols-2">
          {messages.map((response) => {
            const isPrivate = !response.message_public;
            const isLoading = mutation.isPending && mutation.variables?.id === response.id;

            return (
              <article
                key={response.id}
                className="flex flex-col rounded-2xl border border-border bg-card p-5 shadow-card sm:p-6"
              >
                <div className="flex flex-wrap items-start justify-between gap-3">
                  <div>
                    <h3 className="font-medium">{response.full_name}</h3>
                    <p className="mt-1 text-xs text-muted-foreground">
                      {formatDate(response.created_at)}
                    </p>
                  </div>
                  <StatusBadge response={response} />
                </div>

                <p className="my-5 flex-1 whitespace-pre-wrap text-sm leading-relaxed text-foreground/80">
                  “{response.message}”
                </p>

                {isPrivate ? (
                  <p className="flex items-center gap-2 border-t border-border pt-4 text-xs text-muted-foreground">
                    <EyeOff className="h-4 w-4" /> O convidado não autorizou a publicação.
                  </p>
                ) : (
                  <button
                    type="button"
                    disabled={isLoading}
                    onClick={() =>
                      mutation.mutate({ id: response.id, approved: !response.message_approved })
                    }
                    className="inline-flex w-fit items-center justify-center gap-2 rounded-full border border-primary/25 px-4 py-2 text-sm font-medium text-primary transition hover:bg-primary/5 disabled:opacity-60"
                  >
                    {isLoading ? (
                      <LoaderCircle className="h-4 w-4 animate-spin" />
                    ) : response.message_approved ? (
                      <EyeOff className="h-4 w-4" />
                    ) : (
                      <Check className="h-4 w-4" />
                    )}
                    {response.message_approved ? "Remover do mural" : "Publicar no mural"}
                  </button>
                )}
              </article>
            );
          })}
        </div>
      )}
    </section>
  );
}

function StatusBadge({ response }: { response: RSVPResponse }) {
  const label = !response.message_public
    ? "Privada"
    : response.message_approved
      ? "Publicada"
      : "Aguardando aprovação";
  const className = !response.message_public
    ? "bg-muted text-muted-foreground"
    : response.message_approved
      ? "bg-emerald-50 text-emerald-700"
      : "bg-amber-50 text-amber-700";

  return <span className={`rounded-full px-3 py-1 text-xs font-medium ${className}`}>{label}</span>;
}

function formatDate(value: string) {
  return new Intl.DateTimeFormat("pt-BR", {
    dateStyle: "long",
    timeStyle: "short",
  }).format(new Date(value));
}

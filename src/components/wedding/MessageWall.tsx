import { useQuery } from "@tanstack/react-query";
import { MessageCircleHeart, Quote } from "lucide-react";
import { SectionTitle } from "./SectionTitle";
import { Reveal } from "./Reveal";

import { getSupabaseClient } from "@/lib/supabase";

interface PublicMessage {
  id: string;
  name: string;
  message: string;
  created_at: string;
}

export function MessageWall() {
  const query = useQuery({
    queryKey: ["public-rsvp-messages"],
    queryFn: loadPublicMessages,
    staleTime: 60_000,
  });
  const messages = query.data ?? [];

  return (
    <section className="py-24 md:py-32 bg-gradient-blush">
      <div className="mx-auto max-w-6xl px-5 md:px-8">
        <SectionTitle
          eyebrow="Mural de Mensagens"
          title="Palavras que ficarão para sempre"
          subtitle="Mensagens carinhosas de quem celebra esta história com a gente."
        />

        {query.isLoading ? (
          <MessageSkeleton />
        ) : query.isError ? (
          <div className="rounded-2xl border border-border bg-card/70 px-6 py-10 text-center">
            <p className="text-sm text-muted-foreground">
              Não foi possível carregar as mensagens agora.
            </p>
            <button
              type="button"
              onClick={() => void query.refetch()}
              className="mt-3 text-sm font-medium text-primary hover:underline"
            >
              Tentar novamente
            </button>
          </div>
        ) : messages.length === 0 ? (
          <Reveal>
            <div className="rounded-2xl border border-dashed border-border bg-card/60 px-6 py-12 text-center">
              <MessageCircleHeart className="mx-auto h-9 w-9 text-primary/50" />
              <p className="mt-4 font-display text-xl">As mensagens aparecerão aqui</p>
              <p className="mt-2 text-sm text-muted-foreground">
                Em breve, este espaço será preenchido pelo carinho dos convidados.
              </p>
            </div>
          </Reveal>
        ) : (
          <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-5">
            {messages.map((item, index) => (
              <Reveal key={item.id} delay={(index % 3) * 80}>
                <article className="h-full rounded-2xl bg-card/80 backdrop-blur border border-border p-7 shadow-card hover:shadow-soft transition-all duration-500">
                  <Quote className="text-primary/40 mb-3" size={28} />
                  <p className="whitespace-pre-wrap text-foreground/85 leading-relaxed italic">
                    “{item.message}”
                  </p>
                  <div className="mt-5 flex items-center gap-3">
                    <div className="w-9 h-9 rounded-full bg-blush flex items-center justify-center text-primary font-display text-sm shrink-0">
                      {item.name.charAt(0)}
                    </div>
                    <span className="text-sm font-medium text-foreground">{item.name}</span>
                  </div>
                </article>
              </Reveal>
            ))}
          </div>
        )}
      </div>
    </section>
  );
}

function MessageSkeleton() {
  return (
    <div className="grid gap-5 sm:grid-cols-2 lg:grid-cols-3" aria-label="Carregando mensagens">
      {Array.from({ length: 3 }).map((_, index) => (
        <div
          key={index}
          className="h-52 animate-pulse rounded-2xl border border-border bg-card/60"
        />
      ))}
    </div>
  );
}

async function loadPublicMessages(): Promise<PublicMessage[]> {
  const { data, error } = await getSupabaseClient().rpc("get_public_rsvp_messages", {
    message_limit: 12,
  });

  if (error) throw error;
  return (data ?? []) as PublicMessage[];
}

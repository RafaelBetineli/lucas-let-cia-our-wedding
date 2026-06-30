import { MapPin, Clock, Church, ExternalLink } from "lucide-react";
import { SectionTitle } from "./SectionTitle";
import { Reveal } from "./Reveal";

export function CeremonySection() {
  const address = "Igreja Nossa Senhora, Rua das Flores, 1234 — São Paulo, SP";
  const mapsUrl = `https://www.google.com/maps/search/?api=1&query=${encodeURIComponent(address)}`;

  return (
    <section id="cerimonia" className="py-24 md:py-32 bg-background">
      <div className="mx-auto max-w-5xl px-5 md:px-8">
        <SectionTitle
          eyebrow="Cerimônia"
          title="O momento mais aguardado"
          subtitle="Será uma honra ter você ao nosso lado neste instante tão especial."
        />

        <Reveal>
          <div className="relative overflow-hidden rounded-3xl bg-gradient-blush border border-border shadow-elegant">
            <div className="absolute -top-16 -right-16 w-64 h-64 rounded-full bg-primary/10 blur-3xl" />
            <div className="absolute -bottom-20 -left-20 w-72 h-72 rounded-full bg-gold/10 blur-3xl" />

            <div className="relative p-8 md:p-14 grid md:grid-cols-2 gap-10 items-center">
              <div>
                <div className="inline-flex items-center justify-center w-14 h-14 rounded-2xl bg-white shadow-card text-primary">
                  <Church size={24} />
                </div>
                <h3 className="mt-6 font-display text-3xl md:text-4xl">
                  Cerimônia Religiosa
                </h3>
                <p className="mt-3 text-muted-foreground">
                  Uma celebração íntima e cheia de significado, na presença de
                  quem mais amamos.
                </p>
              </div>

              <div className="space-y-5">
                <Info icon={<MapPin size={18} />} label="Local" value="Igreja Nossa Senhora" />
                <Info icon={<Clock size={18} />} label="Horário" value="16h00 · sexta-feira" />
                <Info icon={<MapPin size={18} />} label="Endereço" value="Rua das Flores, 1234 — São Paulo, SP" />

                <a
                  href={mapsUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center gap-2 rounded-full bg-primary text-primary-foreground px-6 py-3 text-sm font-medium shadow-soft hover:opacity-90 transition mt-4"
                >
                  Abrir no Google Maps
                  <ExternalLink size={14} />
                </a>
              </div>
            </div>
          </div>
        </Reveal>
      </div>
    </section>
  );
}

function Info({ icon, label, value }: { icon: React.ReactNode; label: string; value: string }) {
  return (
    <div className="flex items-start gap-3">
      <div className="mt-0.5 text-primary shrink-0">{icon}</div>
      <div className="min-w-0">
        <div className="text-xs uppercase tracking-[0.2em] text-muted-foreground">{label}</div>
        <div className="text-foreground font-medium">{value}</div>
      </div>
    </div>
  );
}

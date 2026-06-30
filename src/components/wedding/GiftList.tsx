import { Gift, QrCode, ExternalLink, Heart, type LucideIcon } from "lucide-react";
import { SectionTitle } from "./SectionTitle";
import { Reveal } from "./Reveal";
import { gifts } from "@/data/gifts";

const ICONS: Record<string, LucideIcon> = { Gift, QrCode, ExternalLink, Heart };

export function GiftList() {
  return (
    <section id="presentes" className="py-24 md:py-32 bg-gradient-romantic">
      <div className="mx-auto max-w-6xl px-5 md:px-8">
        <SectionTitle
          eyebrow="Lista de Presentes"
          title="Sua presença já é o nosso maior presente"
          subtitle="Mas, se desejar nos presentear, preparamos algumas opções com muito carinho."
        />

        <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-5">
          {gifts.map((g, i) => {
            const Icon = ICONS[g.icon] ?? Gift;
            return (
              <Reveal key={g.title} delay={i * 80}>
                <div className="relative h-full flex flex-col rounded-2xl bg-card border border-border p-7 shadow-card hover:shadow-elegant hover:-translate-y-1 transition-all duration-500">
                  {"tag" in g && g.tag && (
                    <span className="absolute -top-2.5 right-5 text-[10px] tracking-[0.2em] uppercase bg-primary text-primary-foreground px-3 py-1 rounded-full">
                      {g.tag}
                    </span>
                  )}
                  <div className="inline-flex items-center justify-center w-12 h-12 rounded-xl bg-blush text-primary mb-5">
                    <Icon size={20} />
                  </div>
                  <h3 className="font-display text-xl text-foreground">{g.title}</h3>
                  <p className="mt-2 text-sm text-muted-foreground leading-relaxed flex-1">
                    {g.text}
                  </p>
                  <button
                    type="button"
                    className="mt-6 inline-flex items-center justify-center gap-1.5 text-sm font-medium text-primary hover:gap-2.5 transition-all"
                  >
                    {g.cta}
                    <ExternalLink size={13} />
                  </button>
                </div>
              </Reveal>
            );
          })}
        </div>
      </div>
    </section>
  );
}

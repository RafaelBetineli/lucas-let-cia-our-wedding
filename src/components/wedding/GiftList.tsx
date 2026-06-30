import { Gift, QrCode, ExternalLink, Heart } from "lucide-react";
import { SectionTitle } from "./SectionTitle";
import { Reveal } from "./Reveal";

const GIFTS = [
  {
    icon: QrCode,
    title: "Pix",
    text: "A forma mais carinhosa e prática de contribuir com a nossa nova fase.",
    cta: "Ver chave Pix",
    tag: "Recomendado",
  },
  {
    icon: Gift,
    title: "Lista de Presentes",
    text: "Itens cuidadosamente escolhidos para o nosso primeiro lar a dois.",
    cta: "Acessar lista",
  },
  {
    icon: Heart,
    title: "Lua de Mel",
    text: "Ajude-nos a guardar memórias inesquecíveis em uma viagem dos sonhos.",
    cta: "Contribuir",
  },
  {
    icon: ExternalLink,
    title: "Presente Simbólico",
    text: "Doe em nosso nome para uma instituição que apoiamos com carinho.",
    cta: "Saiba mais",
  },
];

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
          {GIFTS.map((g, i) => (
            <Reveal key={g.title} delay={i * 80}>
              <div className="relative h-full flex flex-col rounded-2xl bg-card border border-border p-7 shadow-card hover:shadow-elegant hover:-translate-y-1 transition-all duration-500">
                {g.tag && (
                  <span className="absolute -top-2.5 right-5 text-[10px] tracking-[0.2em] uppercase bg-primary text-primary-foreground px-3 py-1 rounded-full">
                    {g.tag}
                  </span>
                )}
                <div className="inline-flex items-center justify-center w-12 h-12 rounded-xl bg-blush text-primary mb-5">
                  <g.icon size={20} />
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
          ))}
        </div>
      </div>
    </section>
  );
}

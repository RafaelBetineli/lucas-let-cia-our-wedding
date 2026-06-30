import { Sparkles, Shirt, Car, Info } from "lucide-react";
import { SectionTitle } from "./SectionTitle";
import { Reveal } from "./Reveal";

const ITEMS = [
  {
    icon: Sparkles,
    title: "A Festa",
    text: "Logo após a cerimônia, no mesmo espaço, com jantar, brindes e muita música até o amanhecer.",
  },
  {
    icon: Shirt,
    title: "Dress Code",
    text: "Traje passeio completo. Pedimos que evitem o branco — reservado para a noiva.",
  },
  {
    icon: Car,
    title: "Estacionamento",
    text: "Manobrista gratuito disponível na entrada principal durante toda a celebração.",
  },
  {
    icon: Info,
    title: "Informações",
    text: "Recepção a partir das 18h30. Crianças são bem-vindas — avise no RSVP.",
  },
];

export function ReceptionSection() {
  return (
    <section id="recepcao" className="py-24 md:py-32 bg-secondary">
      <div className="mx-auto max-w-6xl px-5 md:px-8">
        <SectionTitle
          eyebrow="Recepção"
          title="Para celebrar até o último brinde"
          subtitle="Tudo preparado com carinho para que você aproveite cada momento."
        />

        <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-5 md:gap-6">
          {ITEMS.map((it, i) => (
            <Reveal key={it.title} delay={i * 80}>
              <div className="group h-full rounded-2xl bg-card border border-border p-7 shadow-card hover:shadow-elegant hover:-translate-y-1 transition-all duration-500">
                <div className="inline-flex items-center justify-center w-12 h-12 rounded-xl bg-blush text-primary mb-5 group-hover:scale-110 transition-transform">
                  <it.icon size={20} />
                </div>
                <h3 className="font-display text-xl text-foreground">{it.title}</h3>
                <p className="mt-2 text-sm text-muted-foreground leading-relaxed">
                  {it.text}
                </p>
              </div>
            </Reveal>
          ))}
        </div>
      </div>
    </section>
  );
}

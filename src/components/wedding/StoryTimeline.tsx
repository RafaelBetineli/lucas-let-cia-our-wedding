import { SectionTitle } from "./SectionTitle";
import { Reveal } from "./Reveal";

const STORY = [
  {
    date: "Março · 2019",
    title: "Como nos conhecemos",
    text: "Um café, uma conversa que se estendeu por horas e a certeza silenciosa de que algo especial começava ali.",
    img: "https://images.unsplash.com/photo-1529634597503-139d3726fed5?auto=format&fit=crop&w=900&q=80",
  },
  {
    date: "Junho · 2019",
    title: "Primeiro encontro",
    text: "Caminhamos sem pressa pelas ruas da cidade, e no fim da noite já sabíamos: queríamos mais dias assim.",
    img: "https://images.unsplash.com/photo-1519741497674-611481863552?auto=format&fit=crop&w=900&q=80",
  },
  {
    date: "Dezembro · 2024",
    title: "O pedido",
    text: "Entre lágrimas, risos e o pôr do sol como testemunha, um sim que mudou tudo — e nada — ao mesmo tempo.",
    img: "https://images.unsplash.com/photo-1606800052052-a08af7148866?auto=format&fit=crop&w=900&q=80",
  },
  {
    date: "2025 — 2026",
    title: "Preparativos",
    text: "Cada detalhe escolhido a quatro mãos, com carinho, para receber as pessoas que mais amamos no nosso grande dia.",
    img: "https://images.unsplash.com/photo-1519225421980-715cb0215aed?auto=format&fit=crop&w=900&q=80",
  },
];

export function StoryTimeline() {
  return (
    <section id="historia" className="relative py-24 md:py-32 bg-gradient-romantic">
      <div className="mx-auto max-w-6xl px-5 md:px-8">
        <SectionTitle
          eyebrow="Nossa História"
          title="Os capítulos que nos trouxeram até aqui"
          subtitle="Pequenos momentos que, somados, escreveram a nossa história de amor."
        />

        <div className="relative">
          {/* Vertical line */}
          <div className="absolute left-5 md:left-1/2 top-0 bottom-0 w-px bg-gradient-to-b from-transparent via-primary/30 to-transparent md:-translate-x-1/2" />

          <ul className="space-y-14 md:space-y-24">
            {STORY.map((item, idx) => {
              const isLeft = idx % 2 === 0;
              return (
                <Reveal as="li" key={item.title} delay={idx * 80}>
                  <div
                    className={[
                      "relative grid md:grid-cols-2 gap-6 md:gap-12 items-center",
                      isLeft ? "" : "md:[&>*:first-child]:order-2",
                    ].join(" ")}
                  >
                    {/* Dot */}
                    <span className="absolute left-5 md:left-1/2 -translate-x-1/2 top-6 md:top-1/2 md:-translate-y-1/2 w-3 h-3 rounded-full bg-primary ring-4 ring-background z-10" />

                    <div className="pl-12 md:pl-0">
                      <div className="overflow-hidden rounded-2xl shadow-soft aspect-[4/3] bg-blush">
                        <img
                          src={item.img}
                          alt={item.title}
                          loading="lazy"
                          className="w-full h-full object-cover transition-transform duration-[1200ms] hover:scale-105"
                        />
                      </div>
                    </div>

                    <div className={["pl-12 md:pl-0", isLeft ? "md:pl-8" : "md:pr-8 md:text-right"].join(" ")}>
                      <span className="text-xs tracking-[0.3em] uppercase text-gold">
                        {item.date}
                      </span>
                      <h3 className="mt-2 font-display text-2xl md:text-3xl text-foreground">
                        {item.title}
                      </h3>
                      <p className="mt-3 text-muted-foreground leading-relaxed">
                        {item.text}
                      </p>
                    </div>
                  </div>
                </Reveal>
              );
            })}
          </ul>
        </div>
      </div>
    </section>
  );
}

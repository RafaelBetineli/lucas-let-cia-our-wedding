import { Quote } from "lucide-react";
import { SectionTitle } from "./SectionTitle";
import { Reveal } from "./Reveal";

const MESSAGES = [
  {
    name: "Mariana & Felipe",
    text: "Que a jornada de vocês seja tão linda quanto o amor que transmitem. Felicidades eternas!",
  },
  {
    name: "Família Oliveira",
    text: "Ver vocês juntos é entender o que significa parceria. Mal podemos esperar pelo grande dia.",
  },
  {
    name: "Ana Carolina",
    text: "Letícia, você merece todo o amor do mundo — e o Lucas é a prova viva disso. Amo vocês!",
  },
  {
    name: "Rafael",
    text: "Brindemos a essa nova fase. Que venham muitos capítulos felizes a quatro mãos.",
  },
  {
    name: "Tia Sônia",
    text: "Acompanhei essa história de pertinho. Que Deus abençoe cada passo de vocês.",
  },
  {
    name: "Bruno & Júlia",
    text: "Casamento é construído todo dia. Que vocês tenham sempre disposição e cumplicidade.",
  },
];

export function MessageWall() {
  return (
    <section className="py-24 md:py-32 bg-gradient-blush">
      <div className="mx-auto max-w-6xl px-5 md:px-8">
        <SectionTitle
          eyebrow="Mural de Mensagens"
          title="Palavras que ficarão para sempre"
          subtitle="Mensagens carinhosas de quem celebra esta história com a gente."
        />

        <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-5">
          {MESSAGES.map((m, i) => (
            <Reveal key={m.name} delay={(i % 3) * 80}>
              <article className="h-full rounded-2xl bg-card/80 backdrop-blur border border-border p-7 shadow-card hover:shadow-soft transition-all duration-500">
                <Quote className="text-primary/40 mb-3" size={28} />
                <p className="text-foreground/85 leading-relaxed italic">"{m.text}"</p>
                <div className="mt-5 flex items-center gap-3">
                  <div className="w-9 h-9 rounded-full bg-blush flex items-center justify-center text-primary font-display text-sm shrink-0">
                    {m.name.charAt(0)}
                  </div>
                  <span className="text-sm font-medium text-foreground">{m.name}</span>
                </div>
              </article>
            </Reveal>
          ))}
        </div>
      </div>
    </section>
  );
}

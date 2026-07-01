import { SectionTitle } from "./SectionTitle";
import { Reveal } from "./Reveal";
import { groomsmen } from "@/data/groomsmen";

export function GroomsmenSection() {
  return (
    <section id="padrinhos" className="py-24 md:py-32 bg-background">
      <div className="mx-auto max-w-7xl px-5 md:px-8">
        <SectionTitle
          eyebrow="Pessoas Especiais"
          title="Nossos Padrinhos"
          subtitle="Com muito carinho, escolhemos pessoas especiais para estarem ao nosso lado neste momento tão importante da nossa história."
        />

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 md:gap-8">
          {groomsmen.map((person, idx) => (
            <Reveal key={person.name} delay={idx * 100}>
              <div className="group">
                <div className="overflow-hidden rounded-2xl shadow-card aspect-[3/4] bg-blush">
                  <img
                    src={person.image}
                    alt={person.name}
                    loading="lazy"
                    width={600}
                    height={800}
                    className="w-full h-full object-cover transition-transform duration-700 ease-out group-hover:scale-105"
                  />
                </div>
                <div className="mt-5 text-center">
                  <h3 className="font-display text-lg md:text-xl text-foreground">
                    {person.name}
                  </h3>
                  <div className="mt-2 inline-flex items-center gap-1.5">
                    <span className="inline-block w-5 h-px bg-gold/60" />
                    <span className="inline-block w-1.5 h-1.5 rounded-full bg-primary/50" />
                    <span className="inline-block w-5 h-px bg-gold/60" />
                  </div>
                </div>
              </div>
            </Reveal>
          ))}
        </div>
      </div>
    </section>
  );
}

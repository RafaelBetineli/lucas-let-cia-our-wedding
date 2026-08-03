import { SectionTitle } from "./SectionTitle";
import { Reveal } from "./Reveal";

import { story as STORY } from "@/data/wedding";
import { galleryImages } from "@/data/gallery";

const collage = [galleryImages[0], galleryImages[3], galleryImages[5]];

export function StoryTimeline() {
  return (
    <section id="historia" className="relative py-24 md:py-32 bg-gradient-romantic">
      <div className="mx-auto max-w-6xl px-5 md:px-8">
        <SectionTitle
          eyebrow="Nossa História"
          title="Os capítulos que nos trouxeram até aqui"
          subtitle="Entre conversas, reencontros, chuva, família e muitos sonhos, Deus foi escrevendo cada capítulo da nossa história."
        />

        <div className="grid gap-12 lg:grid-cols-[minmax(0,1fr)_20rem] lg:gap-16 items-start">
          {/* Timeline */}
          <div className="relative">
            <div className="absolute left-4 md:left-5 top-2 bottom-2 w-px bg-gradient-to-b from-transparent via-primary/30 to-transparent" />

            <ol className="space-y-8 md:space-y-10">
              {STORY.map((item, idx) => (
                <Reveal as="li" key={item.title} delay={idx * 60}>
                  <div className="relative pl-12 md:pl-16">
                    {/* Chapter marker */}
                    <span className="absolute left-4 md:left-5 -translate-x-1/2 top-6 w-3 h-3 rounded-full bg-primary ring-4 ring-background z-10" />

                    <article className="rounded-2xl bg-background/70 backdrop-blur-sm shadow-soft px-6 py-6 md:px-8 md:py-7 border border-primary/10">
                      <div className="flex items-baseline gap-3">
                        <span className="font-display text-sm text-gold/80">
                          {String(idx + 1).padStart(2, "0")}
                        </span>
                        <span className="text-xs tracking-[0.3em] uppercase text-gold">
                          {item.date}
                        </span>
                      </div>
                      <h3 className="mt-2 font-display text-2xl md:text-3xl text-foreground">
                        {item.title}
                      </h3>
                      <p className="mt-3 text-muted-foreground leading-relaxed">
                        {item.text}
                      </p>
                    </article>
                  </div>

                  {/* Mobile decorative photo between chapters */}
                  {idx === 2 || idx === 4 ? (
                    <div className="lg:hidden mt-8 overflow-hidden rounded-2xl shadow-soft aspect-[16/10] bg-blush">
                      <img
                        src={collage[idx === 2 ? 1 : 2]}
                        alt="Lucas e Letícia"
                        loading="lazy"
                        className="w-full h-full object-cover"
                      />
                    </div>
                  ) : null}
                </Reveal>
              ))}
            </ol>
          </div>

          {/* Desktop photo composition */}
          <Reveal className="hidden lg:block lg:sticky lg:top-28">
            <div className="space-y-5">
              {collage.map((src, i) => (
                <div
                  key={i}
                  className={[
                    "overflow-hidden rounded-2xl shadow-soft bg-blush",
                    i === 1 ? "aspect-[4/5] ml-8" : "aspect-[4/3]",
                  ].join(" ")}
                >
                  <img
                    src={src}
                    alt="Lucas e Letícia"
                    loading="lazy"
                    className="w-full h-full object-cover transition-transform duration-[1200ms] hover:scale-105"
                  />
                </div>
              ))}
              <p className="text-xs text-muted-foreground/80 text-center italic">
                Momentos nossos — registros recentes de uma história que começou em 2018.
              </p>
            </div>
          </Reveal>
        </div>
      </div>
    </section>
  );
}

import { useCallback, useEffect, useState } from "react";
import { X, ChevronLeft, ChevronRight } from "lucide-react";
import useEmblaCarousel from "embla-carousel-react";
import { SectionTitle } from "./SectionTitle";
import { Reveal } from "./Reveal";

import { galleryImages as IMAGES } from "@/data/gallery";

export function Gallery() {
  const [idx, setIdx] = useState<number | null>(null);
  const [paused, setPaused] = useState(false);
  const [selected, setSelected] = useState(0);
  const [snaps, setSnaps] = useState<number[]>([]);

  const [emblaRef, embla] = useEmblaCarousel({
    loop: true,
    align: "start",
    containScroll: "trimSnaps",
    duration: 45,
  });

  const onSelect = useCallback(() => {
    if (!embla) return;
    setSelected(embla.selectedScrollSnap());
  }, [embla]);

  useEffect(() => {
    if (!embla) return;
    setSnaps(embla.scrollSnapList());
    onSelect();
    embla.on("select", onSelect);
    embla.on("reInit", onSelect);
    return () => {
      embla.off("select", onSelect);
      embla.off("reInit", onSelect);
    };
  }, [embla, onSelect]);

  // Autoplay suave, pausado no hover / lightbox / interação
  useEffect(() => {
    if (!embla || paused || idx !== null) return;
    const id = setInterval(() => embla.scrollNext(), 5000);
    return () => clearInterval(id);
  }, [embla, paused, idx]);

  useEffect(() => {
    if (idx === null) return;
    const onKey = (e: KeyboardEvent) => {
      if (e.key === "Escape") setIdx(null);
      if (e.key === "ArrowRight") setIdx((i) => (i === null ? null : (i + 1) % IMAGES.length));
      if (e.key === "ArrowLeft") setIdx((i) => (i === null ? null : (i - 1 + IMAGES.length) % IMAGES.length));
    };
    window.addEventListener("keydown", onKey);
    document.body.style.overflow = "hidden";
    return () => {
      window.removeEventListener("keydown", onKey);
      document.body.style.overflow = "";
    };
  }, [idx]);

  return (
    <section id="galeria" className="py-24 md:py-32 bg-background">
      <div className="mx-auto max-w-7xl px-5 md:px-8">
        <SectionTitle
          eyebrow="Galeria"
          title="Momentos que guardamos com carinho"
          subtitle="Um pequeno álbum dos nossos dias."
        />

        <Reveal>
          <div
            className="relative"
            onMouseEnter={() => setPaused(true)}
            onMouseLeave={() => setPaused(false)}
            onTouchStart={() => setPaused(true)}
          >
            <div className="overflow-hidden" ref={emblaRef}>
              <div className="flex -ml-3 md:-ml-4">
                {IMAGES.map((src, i) => (
                  <div
                    key={src}
                    className="pl-3 md:pl-4 shrink-0 grow-0 basis-full sm:basis-1/2 lg:basis-1/3 xl:basis-1/4"
                  >
                    <button
                      onClick={() => setIdx(i)}
                      className="group relative block w-full overflow-hidden rounded-2xl bg-blush shadow-card aspect-[3/4]"
                      aria-label={`Abrir foto ${i + 1}`}
                    >
                      <img
                        src={src}
                        alt={`Foto ${i + 1}`}
                        loading="lazy"
                        className="w-full h-full object-cover transition-transform duration-[1200ms] group-hover:scale-105"
                      />
                      <span className="absolute inset-0 bg-gradient-to-t from-black/25 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
                    </button>
                  </div>
                ))}
              </div>
            </div>

            <button
              onClick={() => embla?.scrollPrev()}
              aria-label="Foto anterior"
              className="absolute left-1 md:-left-4 top-1/2 -translate-y-1/2 z-10 h-10 w-10 rounded-full bg-background/85 backdrop-blur border border-border text-foreground/70 hover:text-primary shadow-card flex items-center justify-center transition"
            >
              <ChevronLeft size={20} />
            </button>
            <button
              onClick={() => embla?.scrollNext()}
              aria-label="Próxima foto"
              className="absolute right-1 md:-right-4 top-1/2 -translate-y-1/2 z-10 h-10 w-10 rounded-full bg-background/85 backdrop-blur border border-border text-foreground/70 hover:text-primary shadow-card flex items-center justify-center transition"
            >
              <ChevronRight size={20} />
            </button>

            {snaps.length > 1 && (
              <div className="mt-8 flex flex-wrap items-center justify-center gap-2">
                {snaps.map((_, i) => (
                  <button
                    key={i}
                    onClick={() => embla?.scrollTo(i)}
                    aria-label={`Ir para o slide ${i + 1}`}
                    className={[
                      "h-1.5 rounded-full transition-all duration-500",
                      i === selected ? "w-6 bg-primary" : "w-1.5 bg-border hover:bg-gold/60",
                    ].join(" ")}
                  />
                ))}
              </div>
            )}
          </div>
        </Reveal>
      </div>

      {/* Lightbox */}
      {idx !== null && (
        <div
          className="fixed inset-0 z-[60] bg-black/90 backdrop-blur-sm flex items-center justify-center p-4 animate-in fade-in duration-200"
          onClick={() => setIdx(null)}
        >
          <button
            onClick={() => setIdx(null)}
            className="absolute top-5 right-5 text-white/90 hover:text-white p-2"
            aria-label="Fechar"
          >
            <X size={28} />
          </button>
          <button
            onClick={(e) => {
              e.stopPropagation();
              setIdx((i) => (i === null ? null : (i - 1 + IMAGES.length) % IMAGES.length));
            }}
            className="absolute left-3 md:left-8 text-white/80 hover:text-white p-3 rounded-full bg-white/5 hover:bg-white/15 transition"
            aria-label="Anterior"
          >
            <ChevronLeft size={24} />
          </button>
          <img
            src={IMAGES[idx]}
            alt=""
            className="max-h-[85vh] max-w-[90vw] object-contain rounded-xl shadow-elegant"
            onClick={(e) => e.stopPropagation()}
          />
          <button
            onClick={(e) => {
              e.stopPropagation();
              setIdx((i) => (i === null ? null : (i + 1) % IMAGES.length));
            }}
            className="absolute right-3 md:right-8 text-white/80 hover:text-white p-3 rounded-full bg-white/5 hover:bg-white/15 transition"
            aria-label="Próxima"
          >
            <ChevronRight size={24} />
          </button>
        </div>
      )}
    </section>
  );
}

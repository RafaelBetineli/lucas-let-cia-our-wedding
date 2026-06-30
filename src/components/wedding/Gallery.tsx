import { useEffect, useState } from "react";
import { X, ChevronLeft, ChevronRight } from "lucide-react";
import { SectionTitle } from "./SectionTitle";
import { Reveal } from "./Reveal";

const IMAGES = [
  "https://images.unsplash.com/photo-1519741497674-611481863552?auto=format&fit=crop&w=1200&q=80",
  "https://images.unsplash.com/photo-1606490194859-07c18c9f0968?auto=format&fit=crop&w=1200&q=80",
  "https://images.unsplash.com/photo-1511795409834-ef04bbd61622?auto=format&fit=crop&w=1200&q=80",
  "https://images.unsplash.com/photo-1465495976277-4387d4b0e4a6?auto=format&fit=crop&w=1200&q=80",
  "https://images.unsplash.com/photo-1519225421980-715cb0215aed?auto=format&fit=crop&w=1200&q=80",
  "https://images.unsplash.com/photo-1525772764200-be829a350797?auto=format&fit=crop&w=1200&q=80",
  "https://images.unsplash.com/photo-1469371670807-013ccf25f16a?auto=format&fit=crop&w=1200&q=80",
  "https://images.unsplash.com/photo-1583939003579-730e3918a45a?auto=format&fit=crop&w=1200&q=80",
];

export function Gallery() {
  const [idx, setIdx] = useState<number | null>(null);

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

        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-3 md:gap-4">
          {IMAGES.map((src, i) => (
            <Reveal key={src} delay={(i % 4) * 60}>
              <button
                onClick={() => setIdx(i)}
                className={[
                  "group relative overflow-hidden rounded-2xl bg-blush w-full",
                  i % 5 === 0 ? "aspect-[3/4]" : "aspect-square",
                ].join(" ")}
              >
                <img
                  src={src}
                  alt={`Foto ${i + 1}`}
                  loading="lazy"
                  className="w-full h-full object-cover transition-transform duration-[1200ms] group-hover:scale-110"
                />
                <span className="absolute inset-0 bg-gradient-to-t from-black/30 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity" />
              </button>
            </Reveal>
          ))}
        </div>
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

import { useEffect, useState } from "react";
import { ChevronDown, MapPin, Heart } from "lucide-react";
import heroImg from "@/assets/hero.jpg";
import { Countdown } from "./Countdown";
import { wedding } from "@/data/wedding";

export function Hero() {
  const [offset, setOffset] = useState(0);
  useEffect(() => {
    const onScroll = () => setOffset(window.scrollY * 0.35);
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  return (
    <section id="top" className="relative min-h-[100svh] w-full overflow-hidden">
      {/* Parallax background */}
      <div
        className="absolute inset-0 will-change-transform"
        style={{ transform: `translate3d(0, ${offset}px, 0)` }}
      >
        <img
          src={heroImg}
          alt="Lucas e Letícia"
          width={1920}
          height={1280}
          className="w-full h-full sm:w-[115%] sm:max-w-none sm:h-[115%] object-cover object-[55%_35%] sm:object-center sm:-translate-x-[7%]"
        />
      </div>
      {/* Elegant overlay */}
      <div className="absolute inset-0 bg-gradient-to-b from-black/55 via-black/35 to-black/65" />
      <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_center,transparent_30%,rgba(0,0,0,0.45)_100%)]" />

      {/* Content */}
      <div className="relative z-10 flex flex-col items-center justify-center min-h-[100svh] px-5 py-28 text-center text-white">
        <span className="divider-gold text-white/90">
          <span className="divider-gold-line" />
          Save the date
          <span className="divider-gold-line" />
        </span>

        <h1 className="mt-6 font-display text-5xl sm:text-7xl md:text-8xl font-medium leading-[1.05] text-balance">
          {wedding.couple.groom} <span className="text-primary italic font-normal">&</span> {wedding.couple.bride}
        </h1>

        <p className="mt-6 text-sm sm:text-base tracking-[0.4em] uppercase text-white/85">
          {wedding.dateLabel}
        </p>

        <p className="mt-4 max-w-md text-white/75 text-sm sm:text-base">
          {wedding.tagline}
        </p>

        <div className="mt-10 sm:mt-12 w-full max-w-2xl">
          <Countdown variant="light" />
        </div>

        <div className="mt-10 flex flex-col sm:flex-row gap-3 sm:gap-4 w-full sm:w-auto">
          <a
            href="#rsvp"
            className="inline-flex items-center justify-center gap-2 rounded-full bg-primary text-primary-foreground px-7 py-3.5 text-sm font-medium shadow-elegant hover:scale-[1.02] active:scale-[0.99] transition"
          >
            <Heart size={16} strokeWidth={2} />
            Confirmar Presença
          </a>
          <a
            href="#cerimonia"
            className="inline-flex items-center justify-center gap-2 rounded-full border border-white/50 bg-white/5 backdrop-blur px-7 py-3.5 text-sm font-medium text-white hover:bg-white/15 transition"
          >
            <MapPin size={16} strokeWidth={2} />
            Ver Local
          </a>
        </div>

        {/* Scroll indicator */}
        <a
          href="#historia"
          className="absolute bottom-6 left-1/2 -translate-x-1/2 text-white/70 hover:text-white transition"
          aria-label="Rolar"
        >
          <ChevronDown className="animate-bounce" size={28} />
        </a>
      </div>
    </section>
  );
}

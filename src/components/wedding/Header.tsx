import { useEffect, useState } from "react";
import { Menu, X } from "lucide-react";
import { cn } from "@/lib/utils";
import { wedding } from "@/data/wedding";

const NAV = [
  { href: "#historia", label: "Nossa História" },
  { href: "#cerimonia", label: "Cerimônia" },
  { href: "#recepcao", label: "Recepção" },
  { href: "#galeria", label: "Galeria" },
  { href: "#presentes", label: "Presentes" },
  { href: "#faq", label: "FAQ" },
];

export function Header() {
  const [scrolled, setScrolled] = useState(false);
  const [open, setOpen] = useState(false);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 24);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  return (
    <header
      className={cn(
        "fixed top-0 inset-x-0 z-50 transition-all duration-500",
        scrolled
          ? "bg-background/85 backdrop-blur-md border-b border-border/60 shadow-card"
          : "bg-transparent",
      )}
    >
      <div className="mx-auto max-w-7xl px-5 md:px-8 h-16 md:h-20 flex items-center justify-between">
        <a
          href="#top"
          className={cn(
            "font-display text-lg md:text-xl tracking-wide transition-colors",
            scrolled ? "text-foreground" : "text-white",
          )}
        >
          {wedding.initials}
        </a>

        <nav className="hidden lg:flex items-center gap-8">
          {NAV.map((n) => (
            <a
              key={n.href}
              href={n.href}
              className={cn(
                "text-sm font-medium transition-colors hover:text-primary",
                scrolled ? "text-foreground/80" : "text-white/90",
              )}
            >
              {n.label}
            </a>
          ))}
        </nav>

        <a
          href="#rsvp"
          className="hidden lg:inline-flex items-center justify-center rounded-full bg-primary text-primary-foreground px-5 py-2.5 text-sm font-medium shadow-soft hover:opacity-90 transition"
        >
          Confirmar Presença
        </a>

        <button
          onClick={() => setOpen((v) => !v)}
          className={cn(
            "lg:hidden inline-flex items-center justify-center w-10 h-10 rounded-full border transition-colors",
            scrolled
              ? "border-border text-foreground"
              : "border-white/40 text-white",
          )}
          aria-label="Abrir menu"
        >
          {open ? <X size={18} /> : <Menu size={18} />}
        </button>
      </div>

      {/* Mobile menu */}
      <div
        className={cn(
          "lg:hidden overflow-hidden transition-[max-height,opacity] duration-500 bg-background border-b border-border",
          open ? "max-h-[480px] opacity-100" : "max-h-0 opacity-0",
        )}
      >
        <nav className="flex flex-col px-6 py-6 gap-1">
          {NAV.map((n) => (
            <a
              key={n.href}
              href={n.href}
              onClick={() => setOpen(false)}
              className="py-3 text-foreground/85 border-b border-border/60 last:border-0 text-sm font-medium"
            >
              {n.label}
            </a>
          ))}
          <a
            href="#rsvp"
            onClick={() => setOpen(false)}
            className="mt-4 inline-flex items-center justify-center rounded-full bg-primary text-primary-foreground px-5 py-3 text-sm font-medium"
          >
            Confirmar Presença
          </a>
        </nav>
      </div>
    </header>
  );
}

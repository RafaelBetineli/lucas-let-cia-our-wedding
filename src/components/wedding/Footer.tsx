import { Instagram, Mail, MapPin, Heart } from "lucide-react";

export function Footer() {
  return (
    <footer className="relative bg-foreground text-background/90 pt-20 pb-10 overflow-hidden">
      <div className="absolute inset-x-0 top-0 h-px bg-gradient-to-r from-transparent via-primary/60 to-transparent" />

      <div className="mx-auto max-w-6xl px-5 md:px-8">
        <div className="text-center">
          <span className="divider-gold">
            <span className="divider-gold-line" />
            Lucas & Letícia
            <span className="divider-gold-line" />
          </span>
          <h3 className="mt-5 font-display text-3xl md:text-4xl text-background">
            Onde há amor, há vida.
          </h3>
          <p className="mt-3 text-background/60 text-sm tracking-[0.3em] uppercase">
            20 · 11 · 2026
          </p>
        </div>

        <div className="mt-14 grid sm:grid-cols-3 gap-8 text-sm">
          <div className="flex flex-col items-center sm:items-start gap-2 text-background/70">
            <span className="text-xs uppercase tracking-[0.2em] text-gold">Contato</span>
            <a href="mailto:lucas.leticia2026@email.com" className="hover:text-primary transition inline-flex items-center gap-2">
              <Mail size={14} /> lucas.leticia2026@email.com
            </a>
          </div>
          <div className="flex flex-col items-center gap-2 text-background/70">
            <span className="text-xs uppercase tracking-[0.2em] text-gold">Local</span>
            <span className="inline-flex items-center gap-2">
              <MapPin size={14} /> São Paulo · SP
            </span>
          </div>
          <div className="flex flex-col items-center sm:items-end gap-2 text-background/70">
            <span className="text-xs uppercase tracking-[0.2em] text-gold">Redes</span>
            <div className="flex items-center gap-3">
              <a
                href="#"
                aria-label="Instagram"
                className="w-9 h-9 rounded-full border border-background/20 inline-flex items-center justify-center hover:bg-primary hover:border-primary transition"
              >
                <Instagram size={15} />
              </a>
            </div>
          </div>
        </div>

        <div className="mt-14 pt-6 border-t border-background/10 flex flex-col sm:flex-row items-center justify-between gap-3 text-xs text-background/50">
          <p>© 2026 Lucas & Letícia. Todos os direitos reservados.</p>
          <p className="inline-flex items-center gap-1.5">
            Feito com <Heart size={11} className="text-primary fill-primary" /> para o nosso grande dia
          </p>
        </div>
      </div>
    </footer>
  );
}

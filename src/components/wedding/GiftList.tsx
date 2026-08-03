import { useEffect, useRef, useState } from "react";
import { Check, Copy, Gift, QrCode, ExternalLink, Heart, type LucideIcon } from "lucide-react";
import { QRCodeSVG } from "qrcode.react";
import { SectionTitle } from "./SectionTitle";
import { Reveal } from "./Reveal";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { gifts } from "@/data/gifts";
import { pix, pixCopyPaste } from "@/data/pix";

const ICONS: Record<string, LucideIcon> = { Gift, QrCode, ExternalLink, Heart };

export function GiftList() {
  return (
    <section id="presentes" className="py-24 md:py-32 bg-gradient-romantic">
      <div className="mx-auto max-w-6xl px-5 md:px-8">
        <SectionTitle
          eyebrow="Lista de Presentes"
          title="Sua presença já é o nosso maior presente"
          subtitle="Mas, se desejar nos presentear, preparamos algumas opções com muito carinho."
        />

        <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-5">
          {gifts.map((g, i) => {
            const Icon = ICONS[g.icon] ?? Gift;
            return (
              <Reveal key={g.title} delay={i * 80}>
                <div className="relative h-full flex flex-col rounded-2xl bg-card border border-border p-7 shadow-card hover:shadow-elegant hover:-translate-y-1 transition-all duration-500">
                  {"tag" in g && g.tag && (
                    <span className="absolute -top-2.5 right-5 text-[10px] tracking-[0.2em] uppercase bg-primary text-primary-foreground px-3 py-1 rounded-full">
                      {g.tag}
                    </span>
                  )}
                  <div className="inline-flex items-center justify-center w-12 h-12 rounded-xl bg-blush text-primary mb-5">
                    <Icon size={20} />
                  </div>
                  <h3 className="font-display text-xl text-foreground">{g.title}</h3>
                  <p className="mt-2 text-sm text-muted-foreground leading-relaxed flex-1">
                    {g.text}
                  </p>
                  {g.type === "external" ? (
                    <a
                      href={g.href}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="mt-6 inline-flex items-center justify-center gap-1.5 text-sm font-medium text-primary hover:gap-2.5 transition-all"
                    >
                      {g.cta}
                      <ExternalLink size={13} />
                    </a>
                  ) : (
                    <PixDialog>
                      <button
                        type="button"
                        className="mt-6 inline-flex items-center justify-center gap-1.5 text-sm font-medium text-primary hover:gap-2.5 transition-all"
                      >
                        {g.cta}
                        <QrCode size={13} />
                      </button>
                    </PixDialog>
                  )}
                </div>
              </Reveal>
            );
          })}
        </div>
      </div>
    </section>
  );
}

type CopyFeedback = "key" | "payload" | "error" | null;

function PixDialog({ children }: { children: React.ReactNode }) {
  const [feedback, setFeedback] = useState<CopyFeedback>(null);
  const feedbackTimer = useRef<ReturnType<typeof setTimeout> | null>(null);

  useEffect(
    () => () => {
      if (feedbackTimer.current) clearTimeout(feedbackTimer.current);
    },
    [],
  );

  async function handleCopy(value: string, type: Exclude<CopyFeedback, "error" | null>) {
    try {
      await copyToClipboard(value);
      showFeedback(type);
    } catch (error) {
      console.error("Não foi possível copiar o Pix.", error);
      showFeedback("error");
    }
  }

  function showFeedback(value: Exclude<CopyFeedback, null>) {
    setFeedback(value);
    if (feedbackTimer.current) clearTimeout(feedbackTimer.current);
    feedbackTimer.current = setTimeout(() => setFeedback(null), 2500);
  }

  return (
    <Dialog onOpenChange={(open) => !open && setFeedback(null)}>
      <DialogTrigger asChild>{children}</DialogTrigger>
      <DialogContent className="max-h-[92vh] w-[calc(100%_-_2rem)] max-w-md overflow-y-auto rounded-3xl border-border bg-card p-6 shadow-elegant sm:p-8">
        <DialogHeader className="text-center">
          <DialogTitle className="font-display text-2xl">Presenteie via Pix</DialogTitle>
          <DialogDescription className="leading-relaxed">
            Escaneie o QR Code ou copie os dados abaixo. Você escolhe o valor do presente.
          </DialogDescription>
        </DialogHeader>

        <div className="mx-auto my-5 rounded-2xl border border-border bg-white p-3 shadow-card">
          <QRCodeSVG
            value={pixCopyPaste}
            size={208}
            level="M"
            marginSize={1}
            title="QR Code Pix de Leticia Pires de Araujo"
          />
        </div>

        <div className="rounded-2xl border border-border bg-background p-4">
          <p className="text-xs font-medium uppercase tracking-[0.16em] text-muted-foreground">
            Chave Pix — e-mail
          </p>
          <div className="mt-2 flex items-center gap-3">
            <p className="min-w-0 flex-1 break-all text-sm font-medium">{pix.key}</p>
            <button
              type="button"
              onClick={() => void handleCopy(pix.key, "key")}
              className="inline-flex h-9 w-9 shrink-0 items-center justify-center rounded-full border border-border text-primary transition hover:bg-primary/5"
              aria-label="Copiar chave Pix"
            >
              {feedback === "key" ? <Check size={16} /> : <Copy size={16} />}
            </button>
          </div>
        </div>

        <button
          type="button"
          onClick={() => void handleCopy(pixCopyPaste, "payload")}
          className="inline-flex w-full items-center justify-center gap-2 rounded-full bg-primary px-6 py-3.5 text-sm font-medium text-primary-foreground shadow-soft transition hover:opacity-90"
        >
          {feedback === "payload" ? <Check size={16} /> : <Copy size={16} />}
          {feedback === "payload" ? "Código Pix copiado!" : "Copiar Pix Copia e Cola"}
        </button>

        <div aria-live="polite" className="min-h-5 text-center text-xs">
          {feedback === "key" && <p className="text-emerald-700">Chave Pix copiada!</p>}
          {feedback === "error" && (
            <p className="text-destructive">
              Não foi possível copiar. Selecione a chave manualmente.
            </p>
          )}
        </div>
      </DialogContent>
    </Dialog>
  );
}

async function copyToClipboard(value: string) {
  if (navigator.clipboard?.writeText) {
    await navigator.clipboard.writeText(value);
    return;
  }

  const textarea = document.createElement("textarea");
  textarea.value = value;
  textarea.style.position = "fixed";
  textarea.style.opacity = "0";
  document.body.appendChild(textarea);
  textarea.select();
  const copied = document.execCommand("copy");
  textarea.remove();

  if (!copied) throw new Error("Clipboard indisponível.");
}

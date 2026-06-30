import { useState } from "react";
import { Check, Send } from "lucide-react";
import { SectionTitle } from "./SectionTitle";
import { Reveal } from "./Reveal";
import { wedding } from "@/data/wedding";

interface RSVPData {
  fullName: string;
  phone: string;
  email: string;
  guests: number;
  diet: string;
  message: string;
}

const INITIAL: RSVPData = {
  fullName: "",
  phone: "",
  email: "",
  guests: 1,
  diet: "",
  message: "",
};

export function RSVPForm() {
  const [data, setData] = useState<RSVPData>(INITIAL);
  const [submitting, setSubmitting] = useState(false);
  const [success, setSuccess] = useState(false);

  const update = <K extends keyof RSVPData>(k: K, v: RSVPData[K]) =>
    setData((d) => ({ ...d, [k]: v }));

  async function onSubmit(e: React.FormEvent) {
    e.preventDefault();
    setSubmitting(true);
    // TODO: integrar com Supabase futuramente
    await new Promise((r) => setTimeout(r, 900));
    setSubmitting(false);
    setSuccess(true);
  }

  return (
    <section id="rsvp" className="py-24 md:py-32 bg-background">
      <div className="mx-auto max-w-3xl px-5 md:px-8">
        <SectionTitle
          eyebrow="RSVP"
          title="Confirme sua presença"
          subtitle={`Por favor, responda até ${wedding.rsvpDeadline}.`}
        />

        <Reveal>
          <div className="relative rounded-3xl bg-card border border-border shadow-elegant p-7 md:p-10 overflow-hidden">
            <div className="absolute -top-20 -right-20 w-60 h-60 rounded-full bg-primary/8 blur-3xl pointer-events-none" />

            {success ? (
              <div className="text-center py-10 animate-in fade-in zoom-in-95 duration-500">
                <div className="inline-flex items-center justify-center w-16 h-16 rounded-full bg-primary/10 text-primary mb-5">
                  <Check size={28} />
                </div>
                <h3 className="font-display text-2xl md:text-3xl">Recebemos sua confirmação!</h3>
                <p className="mt-3 text-muted-foreground max-w-md mx-auto">
                  Obrigado, {data.fullName.split(" ")[0] || "convidado"}. Mal podemos
                  esperar para celebrar com você em {wedding.dateFriendly}.
                </p>
                <button
                  type="button"
                  onClick={() => {
                    setData(INITIAL);
                    setSuccess(false);
                  }}
                  className="mt-7 text-sm font-medium text-primary hover:underline"
                >
                  Enviar nova confirmação
                </button>
              </div>
            ) : (
              <form onSubmit={onSubmit} className="grid gap-5 relative">
                <Field label="Nome completo" required>
                  <input
                    required
                    value={data.fullName}
                    onChange={(e) => update("fullName", e.target.value)}
                    className={inputCls}
                    placeholder="Seu nome"
                  />
                </Field>

                <div className="grid sm:grid-cols-2 gap-5">
                  <Field label="Telefone" required>
                    <input
                      required
                      type="tel"
                      value={data.phone}
                      onChange={(e) => update("phone", e.target.value)}
                      className={inputCls}
                      placeholder="(00) 00000-0000"
                    />
                  </Field>
                  <Field label="E-mail">
                    <input
                      type="email"
                      value={data.email}
                      onChange={(e) => update("email", e.target.value)}
                      className={inputCls}
                      placeholder="voce@email.com"
                    />
                  </Field>
                </div>

                <div className="grid sm:grid-cols-2 gap-5">
                  <Field label="Quantidade de convidados" required>
                    <select
                      value={data.guests}
                      onChange={(e) => update("guests", Number(e.target.value))}
                      className={inputCls}
                    >
                      {[1, 2, 3, 4, 5].map((n) => (
                        <option key={n} value={n}>
                          {n} {n === 1 ? "pessoa" : "pessoas"}
                        </option>
                      ))}
                    </select>
                  </Field>
                  <Field label="Restrições alimentares">
                    <input
                      value={data.diet}
                      onChange={(e) => update("diet", e.target.value)}
                      className={inputCls}
                      placeholder="Vegetariano, alergias..."
                    />
                  </Field>
                </div>

                <Field label="Mensagem para os noivos">
                  <textarea
                    rows={4}
                    value={data.message}
                    onChange={(e) => update("message", e.target.value)}
                    className={`${inputCls} resize-none`}
                    placeholder="Deixe um recadinho carinhoso..."
                  />
                </Field>

                <button
                  type="submit"
                  disabled={submitting}
                  className="mt-2 inline-flex items-center justify-center gap-2 rounded-full bg-primary text-primary-foreground px-7 py-3.5 text-sm font-medium shadow-soft hover:opacity-90 transition disabled:opacity-60"
                >
                  {submitting ? "Enviando..." : (
                    <>
                      <Send size={15} />
                      Confirmar presença
                    </>
                  )}
                </button>
              </form>
            )}
          </div>
        </Reveal>
      </div>
    </section>
  );
}

const inputCls =
  "w-full rounded-xl border border-border bg-background px-4 py-3 text-sm text-foreground placeholder:text-muted-foreground/60 focus:outline-none focus:ring-2 focus:ring-primary/40 focus:border-primary transition";

function Field({
  label,
  required,
  children,
}: {
  label: string;
  required?: boolean;
  children: React.ReactNode;
}) {
  return (
    <label className="block">
      <span className="block text-xs uppercase tracking-[0.2em] text-muted-foreground mb-2">
        {label} {required && <span className="text-primary">*</span>}
      </span>
      {children}
    </label>
  );
}

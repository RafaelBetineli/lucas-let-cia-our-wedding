import { useState } from "react";
import { Plus } from "lucide-react";
import { SectionTitle } from "./SectionTitle";
import { Reveal } from "./Reveal";

const FAQS = [
  {
    q: "Qual é o horário da cerimônia?",
    a: "A cerimônia começa pontualmente às 16h00. Pedimos que cheguem com 30 minutos de antecedência.",
  },
  {
    q: "Posso levar acompanhante?",
    a: "Acompanhantes só podem ser inclusos se constarem no convite. Em caso de dúvida, entre em contato com os noivos.",
  },
  {
    q: "Qual é o dress code?",
    a: "Traje passeio completo. Evite o branco — essa cor é reservada à noiva.",
  },
  {
    q: "Haverá estacionamento?",
    a: "Sim, contaremos com manobrista gratuito na entrada principal do local.",
  },
  {
    q: "Como confirmar presença?",
    a: "Pelo formulário de RSVP nesta página. É rápido e nos ajuda muito a organizar tudo com carinho.",
  },
  {
    q: "Até quando posso confirmar presença?",
    a: "A confirmação deve ser feita até 30 de setembro de 2026.",
  },
];

export function FAQAccordion() {
  const [open, setOpen] = useState<number | null>(0);

  return (
    <section id="faq" className="py-24 md:py-32 bg-background">
      <div className="mx-auto max-w-3xl px-5 md:px-8">
        <SectionTitle
          eyebrow="Perguntas Frequentes"
          title="Tudo que você precisa saber"
        />

        <Reveal>
          <ul className="space-y-3">
            {FAQS.map((f, i) => {
              const isOpen = open === i;
              return (
                <li
                  key={f.q}
                  className={[
                    "rounded-2xl border bg-card transition-all duration-300",
                    isOpen ? "border-primary/40 shadow-soft" : "border-border shadow-card",
                  ].join(" ")}
                >
                  <button
                    onClick={() => setOpen(isOpen ? null : i)}
                    className="w-full flex items-center justify-between gap-4 text-left px-6 py-5"
                  >
                    <span className="font-display text-base md:text-lg text-foreground">
                      {f.q}
                    </span>
                    <Plus
                      size={18}
                      className={[
                        "shrink-0 text-primary transition-transform duration-300",
                        isOpen ? "rotate-45" : "",
                      ].join(" ")}
                    />
                  </button>
                  <div
                    className={[
                      "grid transition-all duration-500 ease-out",
                      isOpen ? "grid-rows-[1fr] opacity-100" : "grid-rows-[0fr] opacity-0",
                    ].join(" ")}
                  >
                    <div className="overflow-hidden">
                      <p className="px-6 pb-6 text-sm md:text-base text-muted-foreground leading-relaxed">
                        {f.a}
                      </p>
                    </div>
                  </div>
                </li>
              );
            })}
          </ul>
        </Reveal>
      </div>
    </section>
  );
}

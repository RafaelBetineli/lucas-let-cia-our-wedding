import conhecemosImg from "@/assets/story/conhecemos.jpg";
import primeiroEncontroImg from "@/assets/story/primeiro-encontro.jpg";
import pedidoImg from "@/assets/story/pedido.jpg";
import preparativosImg from "@/assets/story/preparativos.jpg";

export const wedding = {
  couple: { groom: "Lucas", bride: "Letícia" },
  initials: "L & L",
  dateISO: "2026-11-20T16:00:00-03:00",
  dateLabel: "20 · Novembro · 2026",
  dateShort: "20 · 11 · 2026",
  dateFriendly: "20 de novembro",
  city: "São Paulo · SP",
  email: "lucas.leticia2026@email.com",
  instagram: "#",
  tagline:
    "Com a alegria nos olhos, convidamos você para celebrar conosco o início da nossa história a dois.",
  rsvpDeadline: "30 de setembro de 2026",
  footerQuote: "Onde há amor, há vida.",
};

export const story = [
  {
    date: "Março · 2019",
    title: "Como nos conhecemos",
    text: "Um café, uma conversa que se estendeu por horas e a certeza silenciosa de que algo especial começava ali.",
    img: conhecemosImg,
  },
  {
    date: "Junho · 2019",
    title: "Primeiro encontro",
    text: "Caminhamos sem pressa pelas ruas da cidade, e no fim da noite já sabíamos: queríamos mais dias assim.",
    img: primeiroEncontroImg,
  },
  {
    date: "Dezembro · 2024",
    title: "O pedido",
    text: "Entre lágrimas, risos e o pôr do sol como testemunha, um sim que mudou tudo — e nada — ao mesmo tempo.",
    img: pedidoImg,
  },
  {
    date: "2025 — 2026",
    title: "Preparativos",
    text: "Cada detalhe escolhido a quatro mãos, com carinho, para receber as pessoas que mais amamos no nosso grande dia.",
    img: preparativosImg,
  },
];

export const ceremony = {
  venue: "Buffet Renascença",
  time: "16h00 · sexta-feira",
  address: "Rua Maria Eugênia, 109 — Mairiporã, SP",
  fullAddress: "Buffet Renascença, Rua Maria Eugênia, 109 — Mairiporã, SP",
};

export const reception = [
  {
    icon: "Sparkles",
    title: "A Festa",
    text: "Logo após a cerimônia, no mesmo espaço, com jantar, brindes e muita música até o amanhecer.",
  },
  {
    icon: "Shirt",
    title: "Dress Code",
    text: "Traje passeio completo. Pedimos que evitem o branco — reservado para a noiva.",
  },
  {
    icon: "Car",
    title: "Estacionamento",
    text: "Manobrista gratuito disponível na entrada principal durante toda a celebração.",
  },
  {
    icon: "Info",
    title: "Informações",
    text: "Recepção a partir das 18h30. Crianças são bem-vindas — avise no RSVP.",
  },
] as const;

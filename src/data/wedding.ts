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
    date: "2018",
    title: "Como tudo começou",
    text: "Tudo começou em 2018, de um jeito inesperado: pelo Facebook. As conversas aconteciam todos os dias, mas o encontro pessoal nunca veio. Com o tempo, cada um seguiu seu caminho, sem imaginar que aquela história ainda teria um novo começo.",
    img: conhecemosImg,
  },
  {
    date: "Fevereiro de 2021",
    title: "O reencontro",
    text: "No início de 2021, a vida resolveu aproximá-los novamente. Mais maduros, as conversas fluíram de forma leve e natural. Em fevereiro, veio o primeiro encontro: muita conversa, o tempo passando sem perceber e até uma chuva que deixou tudo com jeito de cena de filme.",
    img: primeiroEncontroImg,
  },
  {
    date: "03 de março de 2021",
    title: "O início da nossa história",
    text: "No segundo encontro, algo mudou de vez. Desde aquele dia, não se desgrudaram mais. As mensagens de “bom dia” e “boa noite” viraram rotina, as terças-feiras ganharam um significado especial e, pouco a pouco, a amizade se transformou em amor.",
    img: pedidoImg,
  },
  {
    date: "15 de junho de 2021",
    title: "O pedido de namoro",
    text: "Depois de três meses vivendo esse sentimento crescer, veio o pedido de namoro. Sem grandes produções ou cenário ensaiado, mas cheio de verdade. Ali, na simplicidade de um momento comum, começava oficialmente uma história que Deus já vinha conduzindo.",
    img: preparativosImg,
  },
  {
    date: "Dezembro de 2021",
    title: "A família e a aprovação",
    text: "Com coragem, chegou a hora de apresentar o Lucas à família. A cena foi inesquecível: o pai no telhado, com uma makita na mão, no momento da apresentação oficial. O que começou com nervosismo se transformou em carinho, confiança e uma linda relação de família.",
    img: conhecemosImg,
  },
  {
    date: "Setembro de 2025",
    title: "O pedido de casamento",
    text: "Depois de cinco anos de risadas, aprendizados, sonhos compartilhados e um amor cada vez mais maduro, veio o tão esperado pedido de casamento. Um novo capítulo começou, cheio de gratidão, alegria e expectativa pelo grande dia.",
    img: primeiroEncontroImg,
  },
  {
    date: "20 de novembro de 2026",
    title: "O nosso grande dia",
    text: "Agora, com o coração cheio de alegria, eles se preparam para viver o maior sonho: dizer “sim” diante de Deus e das pessoas que amam. E mal podem esperar para celebrar esse momento tão especial com todos vocês.",
    img: pedidoImg,
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

import { createFileRoute } from "@tanstack/react-router";
import { Header } from "@/components/wedding/Header";
import { Hero } from "@/components/wedding/Hero";
import { StoryTimeline } from "@/components/wedding/StoryTimeline";
import { CeremonySection } from "@/components/wedding/CeremonySection";
import { ReceptionSection } from "@/components/wedding/ReceptionSection";
import { Gallery } from "@/components/wedding/Gallery";
import { GiftList } from "@/components/wedding/GiftList";
import { RSVPForm } from "@/components/wedding/RSVPForm";
import { GroomsmenSection } from "@/components/wedding/GroomsmenSection";
import { MessageWall } from "@/components/wedding/MessageWall";
import { FAQAccordion } from "@/components/wedding/FAQAccordion";
import { Footer } from "@/components/wedding/Footer";

export const Route = createFileRoute("/")({
  head: () => ({
    meta: [
      { title: "Lucas & Letícia · 20 de Novembro de 2026" },
      {
        name: "description",
        content:
          "Site oficial do casamento de Lucas e Letícia. Confirme sua presença, veja nossa história, cerimônia, recepção e lista de presentes.",
      },
      { property: "og:title", content: "Lucas & Letícia · 20.11.2026" },
      {
        property: "og:description",
        content: "Nos casamos em 20 de novembro de 2026. Estamos te esperando!",
      },
    ],
  }),
  component: Home,
});

function Home() {
  return (
    <div className="min-h-screen bg-background text-foreground antialiased">
      <Header />
      <main>
        <Hero />
        <StoryTimeline />
        <GroomsmenSection />
        <CeremonySection />
        <ReceptionSection />
        <Gallery />
        <GiftList />
        <RSVPForm />
        <MessageWall />
        <FAQAccordion />
      </main>
      <Footer />
    </div>
  );
}

import { createFileRoute } from "@tanstack/react-router";
import { Header } from "@/components/site/Header";
import { Hero } from "@/components/site/Hero";
import { WrenchScene } from "@/components/site/WrenchScene";
import { About } from "@/components/site/About";
import { Services } from "@/components/site/Services";
import { Gallery } from "@/components/site/Gallery";
import { WhyUs } from "@/components/site/WhyUs";
import { Contact } from "@/components/site/Contact";
import { Footer } from "@/components/site/Footer";
import { useReveal } from "@/hooks/use-reveal";

export const Route = createFileRoute("/")({
  head: () => ({
    meta: [
      { title: "Piperush — Reliable Plumbing Solutions for Modern Living" },
      {
        name: "description",
        content:
          "Piperush delivers fast, certified plumbing — leak repair, pipe installation, maintenance & 24/7 emergency service.",
      },
      { property: "og:title", content: "Piperush — Reliable Plumbing Solutions" },
      {
        property: "og:description",
        content: "Certified 24/7 plumbing pros for homes and businesses.",
      },
    ],
    links: [
      {
        rel: "stylesheet",
        href: "https://fonts.googleapis.com/css2?family=Bagel+Fat+One&family=Inter:wght@400;500;600;700&family=Sora:wght@600;700;800&display=swap",
      },
    ],
  }),
  component: Index,
});

function Index() {
  useReveal();
  return (
    <div className="min-h-screen bg-background text-foreground">
      <Header />
      <main>
        <WrenchScene />
        <Hero />
        <About />
        <Services />
        <Gallery />
        <WhyUs />
        <Contact />
      </main>
      <Footer />
    </div>
  );
}

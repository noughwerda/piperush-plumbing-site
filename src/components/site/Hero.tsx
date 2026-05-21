import { ArrowRight, Phone, Droplets, Wrench } from "lucide-react";
import heroImg from "@/assets/hero-bath.jpg";
import plumber3d from "@/assets/plumber-3d.png";

export function Hero() {
  return (
    <section id="home" className="relative pt-32 pb-24 md:pt-40 md:pb-32 overflow-hidden gradient-water">
      <div className="absolute -top-20 -left-20 w-96 h-96 rounded-full bg-primary/10 blur-3xl animate-float-slow" />
      <div className="absolute top-40 -right-20 w-[28rem] h-[28rem] rounded-full bg-primary-glow/20 blur-3xl animate-float" />

      <div className="relative max-w-7xl mx-auto px-6 grid md:grid-cols-2 gap-12 items-center">
        <div className="animate-fade-up">
          <span className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full bg-primary/10 text-primary text-xs font-semibold uppercase tracking-wider">
            <Droplets className="w-3.5 h-3.5" /> 24/7 Plumbing Experts
          </span>
          <h1 className="mt-6 text-5xl md:text-6xl lg:text-7xl font-bold leading-[1.05]">
            Reliable plumbing<br />
            <span className="bg-gradient-to-r from-primary to-primary-glow bg-clip-text text-transparent">
              for modern living.
            </span>
          </h1>
          <p className="mt-6 text-lg text-muted-foreground max-w-xl">
            Piperush delivers fast, certified plumbing solutions — from leak repairs and
            installations to round-the-clock emergency response.
          </p>

          <div className="mt-8 flex flex-wrap gap-4">
            <a
              href="#contact"
              className="group inline-flex items-center gap-2 px-7 py-4 rounded-full gradient-hero text-primary-foreground font-semibold shadow-soft hover:shadow-lift hover:-translate-y-0.5 transition-all"
            >
              Get Service
              <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
            </a>
            <a
              href="tel:+15551234567"
              className="inline-flex items-center gap-2 px-7 py-4 rounded-full bg-card border border-border font-semibold hover:border-primary hover:text-primary transition-colors"
            >
              <Phone className="w-4 h-4" /> (555) 123-4567
            </a>
          </div>

          <div className="mt-10 flex flex-wrap gap-8 text-sm">
            {[
              ["15+", "Years experience"],
              ["8k+", "Jobs completed"],
              ["4.9★", "Customer rating"],
            ].map(([n, l]) => (
              <div key={l}>
                <div className="text-3xl font-display font-bold text-primary">{n}</div>
                <div className="text-muted-foreground">{l}</div>
              </div>
            ))}
          </div>
        </div>

        <div className="relative animate-fade-in">
          <div className="absolute -inset-6 gradient-hero rounded-[2rem] opacity-20 blur-2xl" />
          <div className="relative rounded-[2rem] overflow-hidden shadow-lift border border-border">
            <img src={heroImg} alt="Modern plumbing service" className="w-full h-[520px] object-cover" />
          </div>
          <div className="absolute -bottom-6 -left-6 bg-card border border-border rounded-2xl p-4 shadow-lift flex items-center gap-3 animate-float">
            <div className="w-11 h-11 rounded-xl gradient-hero text-primary-foreground flex items-center justify-center">
              <Wrench className="w-5 h-5" />
            </div>
            <div>
              <div className="text-sm font-semibold">Certified Pros</div>
              <div className="text-xs text-muted-foreground">Licensed & insured</div>
            </div>
          </div>
          <div className="absolute -top-6 -right-6 bg-card border border-border rounded-2xl px-4 py-3 shadow-lift animate-float-slow">
            <div className="text-xs text-muted-foreground">Response time</div>
            <div className="text-lg font-display font-bold text-primary">{"< 60 min"}</div>
          </div>

          {/* Floating 3D plumber mascot */}
          <div className="pointer-events-none absolute -bottom-10 -right-10 md:-right-16 lg:-right-20 w-40 md:w-56 lg:w-64 z-20">
            <img
              src={plumber3d}
              alt="Piperush plumber mascot"
              className="relative w-full h-auto animate-tilt-3d drop-shadow-[0_25px_25px_rgba(20,80,40,0.35)]"
            />
            <div className="absolute left-1/2 -translate-x-1/2 bottom-0 w-32 md:w-44 h-4 rounded-[50%] bg-foreground/40 blur-md animate-shadow-pulse" />
          </div>
        </div>
      </div>
    </section>
  );
}

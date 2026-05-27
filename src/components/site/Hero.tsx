import { ArrowRight, Phone, Droplets, Wrench } from "lucide-react";
import heroImg from "@/assets/hero-bath.jpg";
import plumber3d from "@/assets/plumber-3d.png";

export function Hero() {
  return (
    <section id="home" className="relative pt-32 pb-24 md:pt-40 md:pb-32 overflow-hidden gradient-water">
      <div className="absolute -top-20 -left-20 w-96 h-96 rounded-full bg-primary/10 blur-3xl animate-float-slow" />
      <div className="absolute top-40 -right-20 w-[28rem] h-[28rem] rounded-full bg-primary-glow/20 blur-3xl animate-float" />

      {/* Decorative background shapes */}
      <svg className="pointer-events-none absolute top-24 left-[6%] w-20 h-20 text-primary/60 animate-float-slow" viewBox="0 0 100 100" fill="currentColor" aria-hidden="true">
        <path d="M50 10 L65 35 L90 50 L65 65 L50 90 L35 65 L10 50 L35 35 Z" />
        <path d="M50 25 L60 40 L75 50 L60 60 L50 75 L40 60 L25 50 L40 40 Z" transform="rotate(45 50 50)" />
      </svg>
      <svg className="pointer-events-none absolute top-1/2 left-[3%] w-14 h-14 text-primary-glow/70 animate-float" viewBox="0 0 100 100" fill="currentColor" aria-hidden="true">
        <polygon points="50,5 60,40 95,50 60,60 50,95 40,60 5,50 40,40" />
        <polygon points="50,25 55,45 75,50 55,55 50,75 45,55 25,50 45,45" />
      </svg>
      <svg className="pointer-events-none absolute bottom-20 right-[8%] w-24 h-24 text-primary/55 animate-float-slow" viewBox="0 0 100 100" fill="currentColor" aria-hidden="true">
        <path d="M50 5 L60 35 L90 35 L70 55 L50 50 L30 55 L10 35 L40 35 Z" />
        <path d="M50 95 L60 65 L90 65 L70 45 L50 50 L30 45 L10 65 L40 65 Z" />
      </svg>
      <svg className="pointer-events-none absolute top-1/3 right-[4%] w-12 h-12 text-primary/70 animate-float" viewBox="0 0 100 100" fill="currentColor" aria-hidden="true">
        <polygon points="50,5 65,45 50,50 35,45" />
        <polygon points="50,95 65,55 50,50 35,55" />
        <polygon points="50,35 60,50 50,65 40,50" />
      </svg>
      <svg className="pointer-events-none absolute bottom-32 left-[15%] w-16 h-16 text-primary-glow/65 animate-float-slow" viewBox="0 0 100 100" fill="currentColor" aria-hidden="true">
        <circle cx="50" cy="50" r="12" />
        <ellipse cx="50" cy="20" rx="10" ry="16" />
        <ellipse cx="50" cy="80" rx="10" ry="16" />
        <ellipse cx="20" cy="50" rx="16" ry="10" />
        <ellipse cx="80" cy="50" rx="16" ry="10" />
        <ellipse cx="28" cy="28" rx="12" ry="10" transform="rotate(-45 28 28)" />
        <ellipse cx="72" cy="72" rx="12" ry="10" transform="rotate(-45 72 72)" />
        <ellipse cx="72" cy="28" rx="12" ry="10" transform="rotate(45 72 28)" />
        <ellipse cx="28" cy="72" rx="12" ry="10" transform="rotate(45 28 72)" />
      </svg>
      <svg className="pointer-events-none absolute top-10 right-[30%] w-10 h-10 text-primary/60 animate-float" viewBox="0 0 100 100" fill="currentColor" aria-hidden="true">
        <polygon points="50,5 65,45 50,50 35,45" />
        <polygon points="50,95 65,55 50,50 35,55" />
      </svg>
      <svg className="pointer-events-none absolute bottom-10 left-[40%] w-14 h-14 text-primary-glow/60 animate-float-slow" viewBox="0 0 100 100" fill="currentColor" aria-hidden="true">
        <path d="M50 10 L65 35 L90 50 L65 65 L50 90 L35 65 L10 50 L35 35 Z" />
      </svg>
      <svg className="pointer-events-none absolute top-[55%] right-[22%] w-12 h-12 text-primary/55 animate-float" viewBox="0 0 100 100" fill="currentColor" aria-hidden="true">
        <circle cx="50" cy="50" r="10" />
        <ellipse cx="50" cy="20" rx="9" ry="14" />
        <ellipse cx="50" cy="80" rx="9" ry="14" />
        <ellipse cx="20" cy="50" rx="14" ry="9" />
        <ellipse cx="80" cy="50" rx="14" ry="9" />
      </svg>
      <svg className="pointer-events-none absolute top-[18%] left-[42%] w-9 h-9 text-primary/65 animate-float-slow" viewBox="0 0 100 100" fill="currentColor" aria-hidden="true">
        <polygon points="50,5 60,40 95,50 60,60 50,95 40,60 5,50 40,40" />
      </svg>
      <svg className="pointer-events-none absolute bottom-1/3 right-[38%] w-10 h-10 text-primary-glow/70 animate-float" viewBox="0 0 100 100" fill="currentColor" aria-hidden="true">
        <polygon points="50,5 65,45 50,50 35,45" />
        <polygon points="50,95 65,55 50,50 35,55" />
        <polygon points="50,35 60,50 50,65 40,50" />
      </svg>
      <svg className="pointer-events-none absolute top-[72%] left-[30%] w-11 h-11 text-primary/60 animate-float-slow" viewBox="0 0 100 100" fill="currentColor" aria-hidden="true">
        <path d="M50 25 L60 40 L75 50 L60 60 L50 75 L40 60 L25 50 L40 40 Z" />
      </svg>

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

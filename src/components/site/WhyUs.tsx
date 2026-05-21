import { Clock, Users, BadgeDollarSign, ShieldCheck } from "lucide-react";

const items = [
  { icon: Clock, title: "Fast Service", desc: "On-site in under an hour for emergencies across the metro area." },
  { icon: Users, title: "Professional Team", desc: "Background-checked, licensed master plumbers — never subcontractors." },
  { icon: BadgeDollarSign, title: "Affordable Pricing", desc: "Up-front flat-rate quotes. No surprises, no hidden hourly creep." },
  { icon: ShieldCheck, title: "Reliable Solutions", desc: "Backed by a lifetime workmanship warranty on every install." },
];

export function WhyUs() {
  return (
    <section id="why" className="py-24 md:py-32 gradient-water">
      <div className="max-w-7xl mx-auto px-6">
        <div className="reveal max-w-2xl mx-auto text-center">
          <span className="text-xs font-semibold uppercase tracking-widest text-primary">Why Piperush</span>
          <h2 className="mt-3 text-4xl md:text-5xl font-bold">Built on trust. Backed by results.</h2>
        </div>

        <div className="mt-16 grid sm:grid-cols-2 lg:grid-cols-4 gap-6">
          {items.map((it, i) => (
            <div
              key={it.title}
              className="reveal text-center p-8 rounded-2xl bg-card border border-border hover:shadow-lift hover:-translate-y-1 transition-all"
              style={{ transitionDelay: `${i * 70}ms` }}
            >
              <div className="mx-auto w-14 h-14 rounded-2xl gradient-hero text-primary-foreground flex items-center justify-center">
                <it.icon className="w-6 h-6" />
              </div>
              <h3 className="mt-5 text-lg font-bold">{it.title}</h3>
              <p className="mt-2 text-sm text-muted-foreground">{it.desc}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

import { Droplet, Wrench, ShieldCheck, Siren, ArrowUpRight } from "lucide-react";

const services = [
  {
    icon: Droplet,
    title: "Leak Repair",
    desc: "Pinpoint detection and seamless repair for dripping faucets, hidden pipe leaks, and slab issues.",
  },
  {
    icon: Wrench,
    title: "Pipe Installation",
    desc: "New builds, remodels, and full re-pipes using premium copper, PEX, and PVC systems.",
  },
  {
    icon: ShieldCheck,
    title: "Maintenance",
    desc: "Scheduled inspections, drain cleaning, and water-heater tune-ups to prevent costly failures.",
  },
  {
    icon: Siren,
    title: "Emergency Plumbing",
    desc: "24/7 rapid response for burst pipes, sewage backups, and overflow disasters — any hour.",
  },
];

export function Services() {
  return (
    <section id="services" className="py-24 md:py-32 gradient-water">
      <div className="max-w-7xl mx-auto px-6">
        <div className="reveal max-w-2xl">
          <span className="text-xs font-semibold uppercase tracking-widest text-primary">Our Services</span>
          <h2 className="mt-3 text-4xl md:text-5xl font-bold">
            Everything your pipes need, under one roof.
          </h2>
          <p className="mt-4 text-lg text-muted-foreground">
            From a single dripping tap to a full commercial install, our team handles it
            with the same care and precision.
          </p>
        </div>

        <div className="mt-16 grid sm:grid-cols-2 lg:grid-cols-4 gap-6">
          {services.map((s, i) => (
            <div
              key={s.title}
              className="reveal-zoom group relative bg-card border border-border rounded-2xl p-7 hover:shadow-lift hover:-translate-y-2 hover:border-primary/40 transition-all duration-300"
              style={{ transitionDelay: `${i * 120}ms` }}
            >
              <div className="w-12 h-12 rounded-xl gradient-hero text-primary-foreground flex items-center justify-center group-hover:scale-110 transition-transform">
                <s.icon className="w-6 h-6" />
              </div>
              <h3 className="mt-5 text-xl font-bold">{s.title}</h3>
              <p className="mt-2 text-sm text-muted-foreground leading-relaxed">{s.desc}</p>
              <ArrowUpRight className="absolute top-7 right-7 w-5 h-5 text-muted-foreground/40 group-hover:text-primary group-hover:rotate-12 transition-all" />
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

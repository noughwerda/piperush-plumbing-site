import bathImg from "@/assets/bathroom-modern.jpg";

export function About() {
  return (
    <section id="about" className="py-24 md:py-32">
      <div className="max-w-7xl mx-auto px-6 grid md:grid-cols-2 gap-16 items-center">
        <div className="reveal-left relative" data-parallax="0.15">
          <img
            src={bathImg}
            alt="Modern bathroom installation"
            className="parallax rounded-3xl shadow-lift w-full h-[480px] object-cover"
          />
          <div className="absolute -bottom-6 -right-6 hidden md:block bg-card border border-border rounded-2xl p-6 shadow-lift max-w-[220px] reveal-zoom" style={{ transitionDelay: "300ms" }}>
            <div className="text-4xl font-display font-bold text-primary">100%</div>
            <div className="text-sm text-muted-foreground mt-1">
              Satisfaction guaranteed on every job we complete.
            </div>
          </div>
        </div>
        <div className="reveal-right">
          <span className="text-xs font-semibold uppercase tracking-widest text-primary">About Piperush</span>
          <h2 className="mt-3 text-4xl md:text-5xl font-bold">
            Craftsmanship that <span className="text-primary">flows.</span>
          </h2>
          <p className="mt-6 text-lg text-muted-foreground">
            For over fifteen years, Piperush has been the trusted name in residential and
            commercial plumbing. Our mission is simple: deliver honest, expert workmanship
            that keeps water where it belongs — moving cleanly, quietly, and efficiently.
          </p>
          <p className="mt-4 text-muted-foreground">
            From precision pipe installations to emergency leak repairs, every job is
            backed by transparent pricing, certified technicians, and a satisfaction
            guarantee that never expires.
          </p>

          <div className="mt-8 grid sm:grid-cols-2 gap-4">
            {[
              "Licensed master plumbers",
              "Transparent flat-rate quotes",
              "Eco-friendly materials",
              "Lifetime workmanship warranty",
            ].map((t, i) => (
              <div key={t} className="reveal flex items-start gap-3" style={{ transitionDelay: `${200 + i * 100}ms` }}>
                <span className="mt-1.5 w-2 h-2 rounded-full bg-primary" />
                <span className="text-sm font-medium">{t}</span>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}

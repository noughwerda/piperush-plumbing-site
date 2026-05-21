import g1 from "@/assets/bathroom-vintage.jpg";
import g2 from "@/assets/sink-teal.jpg";
import g3 from "@/assets/garden-tap.jpg";
import g4 from "@/assets/valves.jpg";
import g5 from "@/assets/valve-blue.jpg";
import g6 from "@/assets/pipes.jpg";

const items = [
  { src: g1, label: "Full bathroom refit", span: "md:col-span-2 md:row-span-2" },
  { src: g6, label: "Industrial pipework" },
  { src: g2, label: "Heritage restoration" },
  { src: g4, label: "Valve & meter systems" },
  { src: g3, label: "Outdoor installations" },
  { src: g5, label: "Mainline service" },
];

export function Gallery() {
  return (
    <section id="gallery" className="py-24 md:py-32">
      <div className="max-w-7xl mx-auto px-6">
        <div className="reveal max-w-2xl">
          <span className="text-xs font-semibold uppercase tracking-widest text-primary">Our Work</span>
          <h2 className="mt-3 text-4xl md:text-5xl font-bold">Recent projects we're proud of.</h2>
        </div>

        <div className="mt-14 grid grid-cols-2 md:grid-cols-4 auto-rows-[200px] md:auto-rows-[230px] gap-4">
          {items.map((it, i) => (
            <div
              key={i}
              className={`reveal-blur group relative overflow-hidden rounded-2xl border border-border shadow-soft ${it.span ?? ""}`}
              style={{ transitionDelay: `${i * 120}ms` }}
            >
              <img
                src={it.src}
                alt={it.label}
                className="absolute inset-0 w-full h-full object-cover transition-transform duration-700 group-hover:scale-110"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-foreground/80 via-foreground/10 to-transparent opacity-0 group-hover:opacity-100 transition-opacity" />
              <div className="absolute bottom-4 left-4 right-4 translate-y-3 group-hover:translate-y-0 opacity-0 group-hover:opacity-100 transition-all duration-500">
                <span className="text-background font-semibold">{it.label}</span>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

import { useState } from "react";
import { Mail, Phone, MapPin, Send } from "lucide-react";

export function Contact() {
  const [sent, setSent] = useState(false);

  return (
    <section id="contact" className="py-24 md:py-32">
      <div className="max-w-7xl mx-auto px-6 grid lg:grid-cols-2 gap-12">
        <div className="reveal-left">
          <span className="text-xs font-semibold uppercase tracking-widest text-primary">Contact</span>
          <h2 className="mt-3 text-4xl md:text-5xl font-bold">Let's get your water flowing.</h2>
          <p className="mt-4 text-lg text-muted-foreground max-w-md">
            Tell us what's going on and we'll be in touch within minutes. For emergencies,
            call us directly — we answer 24/7.
          </p>

          <div className="mt-10 space-y-5">
            {[
              { icon: Phone, label: "Call us", value: "(555) 123-4567" },
              { icon: Mail, label: "Email", value: "hello@piperush.com" },
              { icon: MapPin, label: "Service area", value: "Greater Metro & Suburbs" },
            ].map((c) => (
              <div key={c.label} className="flex items-center gap-4">
                <div className="w-12 h-12 rounded-xl bg-primary/10 text-primary flex items-center justify-center">
                  <c.icon className="w-5 h-5" />
                </div>
                <div>
                  <div className="text-xs uppercase tracking-wider text-muted-foreground">{c.label}</div>
                  <div className="font-semibold">{c.value}</div>
                </div>
              </div>
            ))}
          </div>
        </div>

        <form
          className="reveal bg-card border border-border rounded-3xl p-8 md:p-10 shadow-soft"
          onSubmit={(e) => {
            e.preventDefault();
            setSent(true);
            setTimeout(() => setSent(false), 4000);
            (e.target as HTMLFormElement).reset();
          }}
        >
          <div className="space-y-5">
            <div>
              <label className="text-sm font-semibold">Name</label>
              <input
                required
                maxLength={100}
                className="mt-2 w-full px-4 py-3 rounded-xl bg-background border border-input focus:border-primary focus:ring-2 focus:ring-primary/20 outline-none transition"
                placeholder="Jane Doe"
              />
            </div>
            <div>
              <label className="text-sm font-semibold">Email</label>
              <input
                required
                type="email"
                maxLength={255}
                className="mt-2 w-full px-4 py-3 rounded-xl bg-background border border-input focus:border-primary focus:ring-2 focus:ring-primary/20 outline-none transition"
                placeholder="you@email.com"
              />
            </div>
            <div>
              <label className="text-sm font-semibold">Message</label>
              <textarea
                required
                maxLength={1000}
                rows={5}
                className="mt-2 w-full px-4 py-3 rounded-xl bg-background border border-input focus:border-primary focus:ring-2 focus:ring-primary/20 outline-none transition resize-none"
                placeholder="Describe your issue..."
              />
            </div>
            <button
              type="submit"
              className="w-full inline-flex items-center justify-center gap-2 px-6 py-4 rounded-xl gradient-hero text-primary-foreground font-semibold shadow-soft hover:shadow-lift hover:-translate-y-0.5 transition-all"
            >
              {sent ? "Message sent ✓" : (<>Send message <Send className="w-4 h-4" /></>)}
            </button>
          </div>
        </form>
      </div>
    </section>
  );
}

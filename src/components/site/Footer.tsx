import logo from "@/assets/logo.png";

export function Footer() {
  return (
    <footer className="border-t border-border bg-card overflow-hidden">
      <div className="max-w-7xl mx-auto px-6 py-12 flex flex-col md:flex-row items-center justify-between gap-6">
        <img src={logo} alt="Piperush" className="reveal-left h-10 w-auto" />
        <p className="reveal text-sm text-muted-foreground" style={{ transitionDelay: "150ms" }}>
          © {new Date().getFullYear()} Piperush Plumbing Co. All rights reserved.
        </p>
        <div className="reveal-right flex items-center gap-6 text-sm text-muted-foreground" style={{ transitionDelay: "250ms" }}>
          <a href="#services" className="hover:text-primary transition">Services</a>
          <a href="#contact" className="hover:text-primary transition">Contact</a>
          <a
            href="https://www.figma.com/design/Wdjz459xZkGaO9dxljPKzt/Nour-Werda?node-id=2-58&t=sMSOmgVkuk9IW4Nq-1"
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center gap-2 rounded-md border border-border bg-background px-3 py-1.5 text-xs font-medium hover:border-primary hover:text-primary transition"
          >
            Link to Figma
          </a>
        </div>
      </div>
    </footer>
  );
}

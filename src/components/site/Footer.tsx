import { Droplets } from "lucide-react";

export function Footer() {
  return (
    <footer className="border-t border-border bg-card">
      <div className="max-w-7xl mx-auto px-6 py-12 flex flex-col md:flex-row items-center justify-between gap-6">
        <div className="flex items-center gap-2">
          <span className="w-9 h-9 rounded-xl gradient-hero text-primary-foreground flex items-center justify-center">
            <Droplets className="w-5 h-5" />
          </span>
          <span className="font-display font-bold text-lg">Piperush</span>
        </div>
        <p className="text-sm text-muted-foreground">
          © {new Date().getFullYear()} Piperush Plumbing Co. All rights reserved.
        </p>
        <div className="flex gap-6 text-sm text-muted-foreground">
          <a href="#services" className="hover:text-primary transition">Services</a>
          <a href="#contact" className="hover:text-primary transition">Contact</a>
        </div>
      </div>
    </footer>
  );
}

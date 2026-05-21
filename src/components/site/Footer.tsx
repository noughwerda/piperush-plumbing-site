import logo from "@/assets/logo.png";

export function Footer() {
  return (
    <footer className="border-t border-border bg-card">
      <div className="max-w-7xl mx-auto px-6 py-12 flex flex-col md:flex-row items-center justify-between gap-6">
        <img src={logo} alt="Piperush" className="h-10 w-auto" />
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

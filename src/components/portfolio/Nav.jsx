import { Gamepad2 } from "lucide-react";

const links = [
  { href: "#journey", label: "Journey" },
  { href: "#skills", label: "Skills" },
  { href: "#projects", label: "Projects" },
  { href: "#achievements", label: "Trophies" },
  { href: "#about", label: "About" },
  { href: "#contact", label: "Contact" },
];

export function Nav() {
  return (
    <header className="fixed top-0 inset-x-0 z-50">
      <div className="mx-auto mt-4 max-w-7xl px-4">
        <nav className="glass-strong rounded-2xl flex items-center justify-between px-5 py-3">
          <a href="#top" className="flex items-center gap-2 font-display font-bold tracking-widest">
            <span className="relative inline-flex h-8 w-8 items-center justify-center rounded-lg bg-[var(--grad-neon)] text-[color:var(--primary-foreground)]">
              <Gamepad2 className="h-4 w-4" />
            </span>
            <span className="text-gradient-neon">DEV.EXE</span>
          </a>
          <ul className="hidden md:flex items-center gap-7 text-sm uppercase tracking-[0.2em] text-muted-foreground">
            {links.map((l) => (
              <li key={l.href}>
                <a href={l.href} className="hover:text-mint transition-colors hover:text-glow-mint">
                  {l.label}
                </a>
              </li>
            ))}
          </ul>
          <a
            href="#contact"
            className="hidden sm:inline-flex items-center gap-2 rounded-lg border border-mint/40 px-4 py-2 text-sm font-semibold text-mint hover:bg-mint/10 hover:glow-mint transition-all"
          >
            Hire Me
          </a>
        </nav>
      </div>
    </header>
  );
}

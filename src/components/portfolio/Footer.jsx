import { Gamepad2, Mail } from "lucide-react";
import { useData } from "../../context/DataContext";

const GithubIcon = () => (
  <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
    <path d="M15 22v-4a4.8 4.8 0 0 0-1-3.03c3.15-.38 6.47-1.4 6.47-7.05 0-1.5-.5-2.75-1.4-3.7.1-.3.6-1.75-.1-3.65 0 0-1.1-.35-3.6 1.35a12.8 12.8 0 0 0-6.6 0C6.1 1.6 5 1.95 5 1.95c-.7 1.9-.2 3.35-.1 3.65-.9.95-1.4 2.2-1.4 3.7 0 5.65 3.32 6.67 6.47 7.05a4.8 4.8 0 0 0-1.03 2.95V22"></path>
    <path d="M9 20c-3.1 1-5-1-5-3"></path>
  </svg>
);

const LinkedinIcon = () => (
  <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
    <path d="M16 8a6 6 0 0 1 6 6v7h-4v-7a2 2 0 0 0-2-2 2 2 0 0 0-2 2v7h-4v-7a6 6 0 0 1 6-6z"></path>
    <rect x="2" y="9" width="4" height="12"></rect>
    <circle cx="4" cy="4" r="2"></circle>
  </svg>
);

export function Footer() {
  const { about } = useData();

  return (
    <footer className="relative border-t border-white/5">
      <div className="absolute inset-x-0 -top-px h-px bg-gradient-to-r from-transparent via-mint to-transparent opacity-60" />
      <div className="mx-auto max-w-7xl px-4 py-12 grid md:grid-cols-3 gap-8 items-center">
        <div className="flex items-center gap-2 font-display tracking-widest">
          <span className="grid h-9 w-9 place-items-center rounded-lg bg-[var(--grad-neon)] text-[color:var(--primary-foreground)]">
            <Gamepad2 className="h-4 w-4" />
          </span>
          <span className="text-gradient-neon text-lg">ALI AHMAD</span>
        </div>
        <nav className="flex justify-center flex-wrap gap-4 text-xs uppercase tracking-[0.25em] text-muted-foreground">
          <a href="#journey" className="hover:text-mint transition-colors">Journey</a>
          <a href="#skills" className="hover:text-mint transition-colors">Skills</a>
          <a href="#projects" className="hover:text-mint transition-colors">Projects</a>
          <a href="#contact" className="hover:text-mint transition-colors">Contact</a>
          <a href="/admin" className="hover:text-cyan-glow transition-colors">Admin</a>
        </nav>
        <div className="flex md:justify-end gap-3">
          {about && about.github && (
            <a href={about.github} target="_blank" rel="noreferrer" className="grid h-9 w-9 place-items-center rounded-lg glass border border-white/10 text-muted-foreground hover:text-mint hover:border-mint/50 hover:glow-mint transition-all">
              <GithubIcon />
            </a>
          )}
          {about && about.linkedin && (
            <a href={about.linkedin} target="_blank" rel="noreferrer" className="grid h-9 w-9 place-items-center rounded-lg glass border border-white/10 text-muted-foreground hover:text-mint hover:border-mint/50 hover:glow-mint transition-all">
              <LinkedinIcon />
            </a>
          )}
          {about && about.email && (
            <a href={"mailto:" + about.email} className="grid h-9 w-9 place-items-center rounded-lg glass border border-white/10 text-muted-foreground hover:text-mint hover:border-mint/50 hover:glow-mint transition-all">
              <Mail className="h-4 w-4" />
            </a>
          )}
        </div>
      </div>
      <div className="border-t border-white/5">
        <div className="mx-auto max-w-7xl px-4 py-5 flex flex-col sm:flex-row items-center justify-between gap-2 text-xs text-muted-foreground">
          <span>© {new Date().getFullYear()} Ali Ahmad Raza Sheikh. All systems online.</span>
          <span className="font-mono">v1.0.0 · built with neon & caffeine</span>
        </div>
      </div>
    </footer>
  );
}

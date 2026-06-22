import { ExternalLink, FileText } from "lucide-react";

const GithubIcon = () => (
  <svg xmlns="http://www.w3.org/2000/svg" width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
    <path d="M15 22v-4a4.8 4.8 0 0 0-1-3.03c3.15-.38 6.47-1.4 6.47-7.05 0-1.5-.5-2.75-1.4-3.7.1-.3.6-1.75-.1-3.65 0 0-1.1-.35-3.6 1.35a12.8 12.8 0 0 0-6.6 0C6.1 1.6 5 1.95 5 1.95c-.7 1.9-.2 3.35-.1 3.65-.9.95-1.4 2.2-1.4 3.7 0 5.65 3.32 6.67 6.47 7.05a4.8 4.8 0 0 0-1.03 2.95V22"></path>
    <path d="M9 20c-3.1 1-5-1-5-3"></path>
  </svg>
);
import { Header } from "./Journey";
import { useData } from "../../context/DataContext";

export function Projects() {
  const { projects } = useData();

  // If projects is undefined or empty, show loading or empty state
  if (!projects || projects.length === 0) {
    return null;
  }

  return (
    <section id="projects" className="relative py-32">
      <div className="absolute inset-0 bg-aurora opacity-40" />
      <div className="relative mx-auto max-w-7xl px-4">
        <Header eyebrow="Loot Crates" title="PROJECT STACK" subtitle="Each crate is a shipped world. Hover to lift, click to enter." />

        <div className="mt-16 grid md:grid-cols-2 gap-8 [perspective:1400px]">
          {projects.map((p, i) => (
            <article
              key={p.id || p.name}
              className="group relative [transform-style:preserve-3d] transition-all duration-500 hover:[transform:rotateX(4deg)_rotateY(-6deg)_translateY(-10px)]"
            >
              {/* Stacked shadow cubes */}
              <div className="absolute inset-0 translate-x-2 translate-y-2 rounded-2xl border border-cyan-glow/20 bg-cyan-glow/5" />
              <div className="absolute inset-0 translate-x-1 translate-y-1 rounded-2xl border border-mint/20 bg-mint/5" />

              <div className="relative rounded-2xl glass-strong neon-border overflow-hidden h-full flex flex-col">
                {/* Thumbnail */}
                <div className="relative h-44 overflow-hidden shrink-0">
                  <div className="absolute inset-0 grid-bg opacity-50" />
                  <div
                    className="absolute inset-0"
                    style={{
                      background:
                        i % 2 === 0
                          ? "radial-gradient(circle at 30% 40%, rgba(0,255,170,0.4), transparent 60%), radial-gradient(circle at 80% 70%, rgba(0,212,255,0.35), transparent 60%)"
                          : "radial-gradient(circle at 70% 30%, rgba(0,212,255,0.4), transparent 60%), radial-gradient(circle at 20% 80%, rgba(0,255,170,0.35), transparent 60%)",
                    }}
                  />
                  {p.image_url && (
                     <img src={p.image_url} alt={p.name} className="absolute inset-0 w-full h-full object-cover mix-blend-overlay opacity-80" />
                  )}
                  <div className="absolute inset-x-0 h-20 bg-gradient-to-b from-white/10 to-transparent animate-scan" />
                  <div className="absolute top-3 left-3 inline-flex items-center gap-2 rounded-md glass px-2.5 py-1 text-[10px] font-mono uppercase tracking-widest text-mint">
                    <span className="h-1.5 w-1.5 rounded-full bg-mint animate-pulse" /> {p.featured ? "Featured" : "Released"}
                  </div>
                  <div className="absolute top-3 right-3 text-[10px] font-mono uppercase tracking-widest text-cyan-glow glass rounded-md px-2.5 py-1">
                    {p.category || "App"}
                  </div>
                  <div className="absolute bottom-3 left-3 font-display text-3xl text-glow-mint text-foreground drop-shadow-md">{p.name}</div>
                </div>

                <div className="p-6 space-y-4 flex-1 flex flex-col">
                  <p className="text-sm text-muted-foreground flex-1">{p.description}</p>
                  <div className="flex flex-wrap gap-1.5">
                    {p.tech_stack?.map((s) => (
                      <span key={s} className="rounded-md border border-mint/30 bg-mint/5 px-2 py-0.5 text-[11px] font-mono text-mint">
                        {s}
                      </span>
                    ))}
                  </div>
                  <div className="flex flex-wrap gap-2 pt-2 mt-auto">
                    {p.demo_url && (
                      <a href={p.demo_url} target="_blank" rel="noreferrer" className="inline-flex items-center gap-1.5 rounded-lg bg-[var(--grad-neon)] px-3.5 py-2 text-xs font-display uppercase tracking-widest text-[color:var(--primary-foreground)] hover:glow-mint transition-shadow">
                        <ExternalLink className="h-3.5 w-3.5" /> Live Demo
                      </a>
                    )}
                    {p.github_url && (
                      <a href={p.github_url} target="_blank" rel="noreferrer" className="inline-flex items-center gap-1.5 rounded-lg glass border border-white/15 px-3.5 py-2 text-xs font-display uppercase tracking-widest text-foreground hover:border-mint/50">
                        <GithubIcon /> Repo
                      </a>
                    )}
                  </div>
                </div>
              </div>
            </article>
          ))}
        </div>
      </div>
    </section>
  );
}

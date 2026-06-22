import { Mail } from "lucide-react";
import { Header } from "./Journey";
import { useData } from "../../context/DataContext";

const GithubIcon = () => (
  <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
    <path d="M15 22v-4a4.8 4.8 0 0 0-1-3.03c3.15-.38 6.47-1.4 6.47-7.05 0-1.5-.5-2.75-1.4-3.7.1-.3.6-1.75-.1-3.65 0 0-1.1-.35-3.6 1.35a12.8 12.8 0 0 0-6.6 0C6.1 1.6 5 1.95 5 1.95c-.7 1.9-.2 3.35-.1 3.65-.9.95-1.4 2.2-1.4 3.7 0 5.65 3.32 6.67 6.47 7.05a4.8 4.8 0 0 0-1.03 2.95V22"></path>
    <path d="M9 20c-3.1 1-5-1-5-3"></path>
  </svg>
);

const LinkedinIcon = () => (
  <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
    <path d="M16 8a6 6 0 0 1 6 6v7h-4v-7a2 2 0 0 0-2-2 2 2 0 0 0-2 2v7h-4v-7a6 6 0 0 1 6-6z"></path>
    <rect x="2" y="9" width="4" height="12"></rect>
    <circle cx="4" cy="4" r="2"></circle>
  </svg>
);

export function About() {
  const { about } = useData();

  const contacts = [
    { icon: Mail, label: "Email", value: about?.email || "aliahmad071205@gmail.com", color: "cyan-glow", url: about?.email ? "mailto:" + about.email : "#" },
    { icon: LinkedinIcon, label: "LinkedIn", value: "LinkedIn Profile", color: "mint", url: about?.linkedin || "#" },
    { icon: GithubIcon, label: "GitHub", value: "GitHub Profile", color: "mint", url: about?.github || "#" },
  ].filter(c => c.url !== "#");

  const bio = about?.bio_extended || about?.bio || "I build polished web platforms by day and design immersive game worlds by night.";

  return (
    <section id="about" className="relative py-32">
      <div className="absolute inset-0 bg-aurora opacity-50" />
      <div className="relative mx-auto max-w-7xl px-4">
        <Header eyebrow="Player Profile" title="ABOUT ME" />

        <div className="mt-16 grid lg:grid-cols-12 gap-10 items-start">
          {/* Photo card */}
          <div className="lg:col-span-5">
            <div className="relative rounded-3xl glass-strong neon-border p-3 [perspective:1000px]">
              <div className="relative aspect-[4/5] rounded-2xl overflow-hidden bg-black">
                <div className="absolute inset-0 grid-bg opacity-30" />
                <div
                  className="absolute inset-0"
                  style={{
                    background:
                      "radial-gradient(circle at 50% 40%, rgba(0,255,170,0.4), transparent 60%), radial-gradient(circle at 80% 90%, rgba(0,212,255,0.5), transparent 60%)",
                  }}
                />
                {about?.profile_image ? (
                  <img src={about.profile_image} alt="Profile" className="absolute inset-0 w-full h-full object-cover" />
                ) : (
                  <svg viewBox="0 0 200 250" className="absolute inset-0 h-full w-full">
                    <defs>
                      <linearGradient id="g" x1="0" x2="1" y1="0" y2="1">
                        <stop offset="0" stopColor="#00FFAA" />
                        <stop offset="1" stopColor="#00D4FF" />
                      </linearGradient>
                    </defs>
                    <circle cx="100" cy="90" r="38" fill="url(#g)" opacity="0.9" />
                    <path d="M30 230 C 30 160, 170 160, 170 230 Z" fill="url(#g)" opacity="0.85" />
                  </svg>
                )}
                <div className="absolute inset-x-0 bottom-0 p-5 bg-gradient-to-t from-black/90 to-transparent">
                  <div className="text-xs uppercase tracking-[0.3em] text-mint">Class</div>
                  <div className="font-display text-2xl text-foreground">Full-Stack · Dev</div>
                </div>
                <div className="absolute inset-x-0 h-24 bg-gradient-to-b from-mint/10 to-transparent animate-scan" />
              </div>
            </div>
          </div>

          {/* Bio + contact */}
          <div className="lg:col-span-7 space-y-8">
            <div className="glass-strong rounded-2xl p-7 space-y-4">
              <h3 className="font-display text-2xl text-gradient-neon">Hey, I'm Ali Ahmad.</h3>
              <p className="text-muted-foreground whitespace-pre-line">{bio}</p>
              <div className="grid sm:grid-cols-2 gap-3 pt-2">
                {[
                  { k: "Career Goal", v: "Lead an independent gaming studio" },
                  { k: "Now Building", v: "Dynamic Web Applications" },
                  { k: "Tech Interests", v: "Real-time graphics, APIs, Games" },
                  { k: "Status", v: about?.available ? "Available" : "Busy" },
                ].map((s) => (
                  <div key={s.k} className="rounded-lg bg-white/5 p-3">
                    <div className="text-[10px] uppercase tracking-[0.25em] text-cyan-glow">{s.k}</div>
                    <div className="text-sm text-foreground mt-0.5">{s.v}</div>
                  </div>
                ))}
              </div>
            </div>

            {contacts.length > 0 && (
              <div className="grid sm:grid-cols-2 gap-4">
                {contacts.map((c) => {
                  const Icon = c.icon;
                  return (
                    <a
                      key={c.label}
                      href={c.url}
                      target="_blank"
                      rel="noreferrer"
                      className="group relative flex items-center gap-3 rounded-xl glass-strong neon-border p-4 hover:-translate-y-1 transition-all"
                    >
                      <div className={"grid h-11 w-11 place-items-center rounded-lg " + (c.color === "mint" ? "bg-mint/10 text-mint" : "bg-cyan-glow/10 text-cyan-glow")}>
                        <Icon className="h-5 w-5" />
                      </div>
                      <div className="min-w-0">
                        <div className="text-[10px] uppercase tracking-[0.25em] text-muted-foreground">{c.label}</div>
                        <div className="truncate font-mono text-sm text-foreground">{c.value}</div>
                      </div>
                      <span className="absolute inset-x-0 bottom-0 h-px bg-[var(--grad-neon)] opacity-0 group-hover:opacity-100 transition-opacity" />
                    </a>
                  );
                })}
              </div>
            )}
          </div>
        </div>
      </div>
    </section>
  );
}

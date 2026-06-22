import { Award, Briefcase, Code2, GraduationCap, Globe, Joystick, Rocket } from "lucide-react";
import { useData } from "../../context/DataContext";

function getIconForTitle(title) {
  const t = title.toLowerCase();
  if (t.includes("student") || t.includes("learn")) return GraduationCap;
  if (t.includes("game") || t.includes("unity") || t.includes("unreal")) return Joystick;
  if (t.includes("web") || t.includes("front")) return Globe;
  if (t.includes("free") || t.includes("work")) return Briefcase;
  if (t.includes("adv") || t.includes("lead")) return Award;
  if (t.includes("found") || t.includes("studio")) return Rocket;
  return Code2;
}

export function Journey() {
  const { experience } = useData();

  const stages = experience && experience.length > 0
    ? experience.map(function(exp, i) {
        return {
          icon: getIconForTitle(exp.title),
          title: exp.title,
          level: "LVL " + String((i + 1) * 10).padStart(2, "0"),
          desc: exp.bullets ? exp.bullets[0] : exp.company,
          color: i % 2 === 0 ? "mint" : "cyan-glow"
        };
      })
    : [
        { icon: GraduationCap, title: "Student Journey", level: "LVL 01", desc: "Began with algorithms, math, and the curiosity that started it all.", color: "mint" },
        { icon: Code2, title: "Learning Programming", level: "LVL 12", desc: "Mastered C++, Python and JavaScript. First lines of production code shipped.", color: "cyan-glow" }
      ];

  return (
    <section id="journey" className="relative py-32 overflow-hidden">
      <div className="absolute inset-0 bg-aurora opacity-60" />
      <div className="relative mx-auto max-w-7xl px-4">
        <Header eyebrow="Career Progression" title="MY JOURNEY" subtitle="A leveling path through every milestone, boss fight, and breakthrough." />

        <div className="relative mt-20">
          {/* central glowing path */}
          <div className="absolute left-1/2 top-0 bottom-0 w-px -translate-x-1/2 hidden md:block">
            <div className="h-full w-full bg-gradient-to-b from-transparent via-mint to-transparent opacity-60" />
            <div className="absolute inset-0 blur-md bg-gradient-to-b from-transparent via-mint to-transparent opacity-40" />
          </div>

          <ul className="space-y-14">
            {stages.map(function(s, i) {
              const Icon = s.icon;
              const left = i % 2 === 0;
              const widthPct = Math.min((i + 1) * 20, 100) + "%";
              const delay = (i * 0.3) + "s";
              return (
                <li key={s.title + i} className="relative grid md:grid-cols-2 items-center gap-6">
                  <div className={left ? "md:order-1 md:pr-16 md:text-right" : "md:order-2 md:pl-16"}>
                    <article className="glass-strong neon-border rounded-2xl p-6 hover:translate-y-[-4px] transition-transform">
                      <div className={"inline-flex items-center gap-2 text-xs font-display font-bold tracking-widest " + (s.color === "mint" ? "text-mint" : "text-cyan-glow")}>
                        <span className="h-1.5 w-1.5 rounded-full bg-current" /> {s.level}
                      </div>
                      <h3 className="mt-2 font-display text-2xl text-foreground">{s.title}</h3>
                      <p className="mt-2 text-sm text-muted-foreground">{s.desc}</p>
                      <div className="mt-4 h-1.5 rounded-full bg-white/5 overflow-hidden">
                        <div className="h-full bg-[var(--grad-neon)]" style={{ width: widthPct }} />
                      </div>
                    </article>
                  </div>
                  <div className={(left ? "md:order-2" : "md:order-1") + " flex md:justify-center"}>
                    <div className="relative [perspective:800px]">
                      <div
                        className="relative h-28 w-28 [transform-style:preserve-3d] [transform:rotateX(60deg)] animate-float"
                        style={{ animationDelay: delay }}
                      >
                        <div className={"absolute inset-0 rounded-xl border-2 " + (s.color === "mint" ? "bg-mint/20 border-mint/50 glow-mint" : "bg-cyan-glow/20 border-cyan-glow/50 glow-cyan")} />
                        <div className="absolute inset-3 rounded-lg bg-black/60 grid place-items-center">
                          <Icon className={"h-8 w-8 " + (s.color === "mint" ? "text-mint" : "text-cyan-glow")} style={{ transform: "rotateX(-60deg)" }} />
                        </div>
                      </div>
                    </div>
                  </div>
                </li>
              );
            })}
          </ul>
        </div>
      </div>
    </section>
  );
}

export function Header({ eyebrow, title, subtitle }) {
  return (
    <div className="text-center max-w-3xl mx-auto">
      <div className="inline-flex items-center gap-2 rounded-full glass px-4 py-1.5 text-xs uppercase tracking-[0.3em] text-mint">
        <span className="h-1.5 w-1.5 rounded-full bg-mint" /> {eyebrow}
      </div>
      <h2 className="mt-5 font-display text-4xl md:text-6xl font-black text-gradient-neon text-glow-mint">{title}</h2>
      {subtitle && <p className="mt-4 text-muted-foreground">{subtitle}</p>}
    </div>
  );
}

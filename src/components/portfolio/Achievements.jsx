import { Award, Crown, Medal, Shield, Star, Trophy, Zap } from "lucide-react";
import { Header } from "./Journey";

const trophies = [
  { icon: Trophy, name: "First Game Shipped", rarity: "Legendary", color: "mint", desc: "Released debut indie title to public." },
  { icon: Crown, name: "Studio Founder", rarity: "Mythic", color: "cyan-glow", desc: "Founded a game studio with a 4-person team." },
  { icon: Medal, name: "100k Users Served", rarity: "Epic", color: "mint", desc: "Built platforms used by 100k+ unique users." },
  { icon: Star, name: "5★ Client Rating", rarity: "Rare", color: "cyan-glow", desc: "Maintained perfect rating across 40+ contracts." },
];

const rarityTone = {
  Mythic: "text-cyan-glow border-cyan-glow/50",
  Legendary: "text-mint border-mint/50",
  Epic: "text-mint border-mint/40",
  Rare: "text-cyan-glow border-cyan-glow/40",
};

export function Achievements() {
  return (
    <section id="achievements" className="relative py-32 overflow-hidden">
      <div className="absolute inset-0 grid-bg opacity-20 [mask-image:radial-gradient(ellipse_at_center,black_30%,transparent_75%)]" />
      <div className="relative mx-auto max-w-7xl px-4">
        <Header eyebrow="Trophy Room" title="ACHIEVEMENTS" subtitle="Unlocked milestones, certifications, and bragging rights." />

        <div className="mt-16 grid sm:grid-cols-2 lg:grid-cols-4 gap-6">
          {trophies.map(function(t, i) {
            const Icon = t.icon;
            const animDelay = (i * 0.25) + "s";
            return (
              <div
                key={t.name}
                className="group relative rounded-2xl glass-strong neon-border p-6 text-center transition-all hover:-translate-y-2"
              >
                <div className="relative mx-auto h-24 w-24 [perspective:600px]">
                  <div className="absolute inset-0 rounded-full bg-[var(--grad-neon)] opacity-30 blur-2xl group-hover:opacity-70 transition-opacity" />
                  <div
                    className="relative h-full w-full rounded-2xl grid place-items-center glass animate-float"
                    style={{ animationDelay: animDelay }}
                  >
                    <Icon className={"h-10 w-10 " + (t.color === "mint" ? "text-mint" : "text-cyan-glow")} />
                  </div>
                </div>
                <div className={"mt-4 inline-block rounded-md border px-2 py-0.5 text-[10px] font-mono uppercase tracking-widest " + (rarityTone[t.rarity] || "text-mint border-mint/40")}>
                  {t.rarity}
                </div>
                <h3 className="mt-3 font-display text-lg text-foreground">{t.name}</h3>
                <p className="mt-1 text-xs text-muted-foreground">{t.desc}</p>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
}

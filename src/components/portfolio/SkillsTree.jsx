import { useState, useMemo } from "react";
import { Header } from "./Journey";
import { useData } from "../../context/DataContext";

function Node({ b, depth, color }) {
  depth = depth || 0;
  const [open, setOpen] = useState(depth < 1);
  const hasChildren = !!(b.children && b.children.length > 0);
  const toneClass = color === "mint"
    ? "text-mint border-mint/40"
    : "text-cyan-glow border-cyan-glow/40";

  return (
    <div className="relative">
      <button
        onClick={() => hasChildren && setOpen(function(v) { return !v; })}
        className={"group relative w-full text-left rounded-xl glass-strong border px-4 py-3 flex items-center gap-3 transition-all hover:translate-x-1 " + toneClass}
      >
        <span className={"h-2 w-2 rounded-full bg-current " + (color === "mint" ? "shadow-[0_0_10px_var(--mint)]" : "shadow-[0_0_10px_var(--cyan-glow)]")} />
        <span className="flex-1 font-display tracking-wide text-foreground">{b.name}</span>
        <span className="text-[10px] font-mono uppercase tracking-widest text-muted-foreground">{b.xp || (hasChildren ? "Mastery" : "Skill")}</span>
        <div className="hidden sm:block w-28">
          <div className="h-1.5 rounded-full bg-white/10 overflow-hidden">
            <div className="h-full bg-[var(--grad-neon)]" style={{ width: (b.level || 0) + "%" }} />
          </div>
          <div className="mt-0.5 text-right text-[10px] font-mono text-muted-foreground">{b.level || 0}%</div>
        </div>
        {hasChildren && (
          <span className="ml-2 text-xs text-muted-foreground">{open ? "−" : "+"}</span>
        )}
      </button>
      {hasChildren && open && (
        <div className="relative mt-3 ml-6 space-y-3 border-l border-dashed border-mint/30 pl-6">
          <span className="absolute -left-[3px] top-0 bottom-0 w-[3px] bg-gradient-to-b from-mint/60 via-cyan-glow/40 to-transparent rounded-full" />
          {b.children.map(function(c) {
            return (
              <div key={c.name} className="relative">
                <span className="absolute -left-6 top-1/2 h-px w-6 bg-mint/40" />
                <Node b={c} depth={depth + 1} color={color} />
              </div>
            );
          })}
        </div>
      )}
    </div>
  );
}

export function SkillsTree() {
  const { skills } = useData();

  const mappedSkills = useMemo(function() {
    if (!skills || skills.length === 0) return [];

    const categories = {};
    skills.forEach(function(skill) {
      if (!categories[skill.category]) {
        categories[skill.category] = [];
      }
      categories[skill.category].push({
        name: skill.name,
        level: skill.level,
        xp: "Learned"
      });
    });

    const colors = ["mint", "cyan-glow"];
    return Object.keys(categories).map(function(catName, index) {
      const items = categories[catName];
      const avgLevel = Math.round(items.reduce(function(acc, curr) { return acc + curr.level; }, 0) / items.length) || 0;

      return {
        id: catName.toLowerCase().replace(/\s+/g, "-"),
        name: catName,
        color: colors[index % colors.length],
        tree: {
          name: catName + " Core",
          level: avgLevel,
          xp: (avgLevel * 100) + " XP",
          children: items
        }
      };
    });
  }, [skills]);

  const [active, setActive] = useState("");

  useMemo(function() {
    if (mappedSkills.length > 0 && !active) {
      setActive(mappedSkills[0].id);
    }
  }, [mappedSkills, active]);

  if (!mappedSkills || mappedSkills.length === 0) return null;

  const skill = mappedSkills.find(function(s) { return s.id === active; }) || mappedSkills[0];

  return (
    <section id="skills" className="relative py-32">
      <div className="absolute inset-0 grid-bg opacity-20 [mask-image:radial-gradient(ellipse_at_center,black_20%,transparent_70%)]" />
      <div className="relative mx-auto max-w-7xl px-4">
        <Header eyebrow="RPG Skill Tree" title="SKILLS · CLASS TREE" subtitle="Select a class to unlock its full branch of abilities." />

        <div className="mt-12 flex flex-wrap justify-center gap-3">
          {mappedSkills.map(function(s) {
            const isActive = s.id === active;
            return (
              <button
                key={s.id}
                onClick={function() { setActive(s.id); }}
                className={"rounded-xl px-5 py-2.5 font-display tracking-widest text-sm uppercase transition-all " + (isActive ? "bg-[var(--grad-neon)] text-[color:var(--primary-foreground)] glow-mint" : "glass border border-white/10 text-muted-foreground hover:text-foreground hover:border-mint/40")}
              >
                {s.name}
              </button>
            );
          })}
        </div>

        {skill && (
          <div className="mt-12 grid lg:grid-cols-12 gap-8">
            <aside className="lg:col-span-4 glass-strong neon-border rounded-2xl p-6 h-fit">
              <div className="text-xs uppercase tracking-[0.3em] text-cyan-glow">Active Class</div>
              <h3 className="mt-2 font-display text-3xl text-gradient-neon">{skill.name}</h3>
              <p className="mt-3 text-sm text-muted-foreground">Total mastery and breakdown of every branch in this technology tree.</p>
              <div className="mt-6 space-y-3">
                {[
                  { k: "Mastery", v: skill.tree.level + "%" },
                  { k: "Total XP", v: skill.tree.xp },
                  { k: "Branches", v: String(skill.tree.children ? skill.tree.children.length : 0) },
                ].map(function(item) {
                  return (
                    <div key={item.k} className="flex justify-between rounded-lg bg-white/5 px-3 py-2 text-sm">
                      <span className="text-muted-foreground">{item.k}</span>
                      <span className="font-mono text-mint">{item.v}</span>
                    </div>
                  );
                })}
              </div>
            </aside>
            <div className="lg:col-span-8 space-y-3">
              <Node b={skill.tree} color={skill.color} />
            </div>
          </div>
        )}
      </div>
    </section>
  );
}

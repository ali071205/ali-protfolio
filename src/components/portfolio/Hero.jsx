import { ArrowRight, Code2, Gamepad2, Rocket, Send } from "lucide-react";
import { Particles } from "../Particles";
import { useData } from "../../context/DataContext";

export function Hero() {
  const { about } = useData();
  
  // Extract name and split into first and last name for styling if possible
  const fullName = about?.bio ? "Ali Ahmad Raza Sheikh" : "Ali Ahmad Raza Sheikh";
  const nameParts = fullName.split(" ");
  const firstName = nameParts[0];
  const restName = nameParts.slice(1).join(" ");

  return (
    <section id="top" className="relative min-h-screen overflow-hidden pt-32 pb-20">
      {/* Background layers */}
      <div className="absolute inset-0 bg-aurora" />
      <div className="absolute inset-0 grid-bg opacity-60 [mask-image:radial-gradient(ellipse_at_center,black_30%,transparent_75%)]" />
      <Particles count={55} />

      {/* Skyline silhouette */}
      <div className="absolute bottom-0 inset-x-0 h-64 opacity-70 pointer-events-none">
        <div className="absolute bottom-0 inset-x-0 h-full"
             style={{
               background:
                 "linear-gradient(180deg, transparent 0%, rgba(10,10,10,0.8) 90%), repeating-linear-gradient(90deg, rgba(20,20,20,0.4) 0 30px, rgba(30,30,30,0.4) 30px 32px, transparent 32px 80px, rgba(25,25,25,0.4) 80px 110px, transparent 110px 140px)",
               maskImage: "linear-gradient(180deg, black 30%, transparent 100%)",
               WebkitMaskImage: "linear-gradient(180deg, black 30%, transparent 100%)",
             }}
        />
      </div>

      <div className="relative mx-auto max-w-7xl px-4 grid lg:grid-cols-12 gap-10 items-center">
        {/* Copy */}
        <div className="lg:col-span-6 space-y-7">
          <div className="inline-flex items-center gap-2 rounded-full glass px-4 py-1.5 text-xs uppercase tracking-[0.3em] text-mint">
            <span className="h-1.5 w-1.5 rounded-full bg-mint animate-pulse" />
            {about?.available ? "Player 01 — Online" : "Player 01 — Busy"}
          </div>
          <h1 className="font-display text-5xl md:text-7xl font-black leading-[1.05]">
            <span className="block text-foreground">HELLO, I'M</span>
            <span className="block text-gradient-neon text-glow-mint uppercase">{fullName}</span>
          </h1>
          <div className="space-y-2 text-lg md:text-xl text-muted-foreground font-medium">
            <p className="flex items-center gap-2"><Gamepad2 className="h-5 w-5 text-mint" /> Game Developer</p>
            <p className="flex items-center gap-2"><Code2 className="h-5 w-5 text-cyan-glow" /> Full Stack Web Developer</p>
            <p className="flex items-center gap-2"><Rocket className="h-5 w-5 text-mint" /> Future Founder</p>
          </div>
          <p className="max-w-xl text-muted-foreground">
            {about?.bio || "Crafting cinematic web experiences and immersive game worlds. Building the bridge between AAA aesthetics and production-grade engineering."}
          </p>
          <div className="flex flex-wrap gap-4">
            <a href="#projects" className="group relative inline-flex items-center gap-2 rounded-xl bg-[var(--grad-neon)] px-7 py-3.5 font-display font-bold uppercase tracking-widest text-[color:var(--primary-foreground)] glow-mint transition-transform hover:scale-[1.03]">
              View Projects <ArrowRight className="h-4 w-4 group-hover:translate-x-1 transition-transform" />
            </a>
            <a href="#contact" className="group inline-flex items-center gap-2 rounded-xl glass-strong neon-border px-7 py-3.5 font-display font-bold uppercase tracking-widest text-foreground hover:bg-white/5">
              Contact Me <Send className="h-4 w-4 group-hover:translate-x-1 transition-transform" />
            </a>
          </div>

          <div className="grid grid-cols-3 gap-4 pt-6 max-w-md">
            {[
              { k: "1+", v: "Years" },
              { k: "13+", v: "Projects" },
              { k: "5", v: "Tech Stacks" },
            ].map((s) => (
              <div key={s.v} className="glass rounded-xl p-3 text-center">
                <div className="font-display text-2xl text-gradient-neon">{s.k}</div>
                <div className="text-xs uppercase tracking-widest text-muted-foreground">{s.v}</div>
              </div>
            ))}
          </div>
        </div>

        {/* 3D Laptop */}
        <div className="lg:col-span-6 relative h-[480px] [perspective:1400px] hidden md:block">
          <div className="absolute inset-0 flex items-center justify-center">
            {/* glow halo */}
            <div className="absolute h-[420px] w-[420px] rounded-full bg-[var(--grad-neon)] opacity-20 blur-3xl animate-pulse-glow" />
            {/* orbiting ring */}
            <div className="absolute h-[460px] w-[460px] rounded-full border border-mint/20 animate-spin-slow">
              <span className="absolute -top-1 left-1/2 h-2 w-2 -translate-x-1/2 rounded-full bg-mint glow-mint" />
              <span className="absolute top-1/2 -right-1 h-2 w-2 -translate-y-1/2 rounded-full bg-cyan-glow glow-cyan" />
            </div>
            <div className="absolute h-[360px] w-[360px] rounded-full border border-cyan-glow/20 animate-spin-slow" style={{ animationDirection: "reverse", animationDuration: "26s" }} />

            {/* Laptop */}
            <div className="relative animate-float [transform-style:preserve-3d] [transform:rotateX(18deg)_rotateY(-14deg)]">
              {/* Screen */}
              <div className="relative w-[440px] h-[280px] rounded-2xl glass-strong neon-border overflow-hidden shadow-[0_30px_80px_-10px_rgba(0,255,170,0.35)]">
                <div className="absolute inset-0 grid-bg opacity-40" />
                <div className="absolute inset-0 bg-gradient-to-br from-mint/10 via-transparent to-cyan-glow/10" />
                {/* Scanline */}
                <div className="absolute inset-x-0 h-24 bg-gradient-to-b from-mint/20 to-transparent animate-scan" />
                {/* Window chrome */}
                <div className="relative flex items-center gap-1.5 border-b border-white/10 px-3 py-2 bg-black/40">
                  <span className="h-2.5 w-2.5 rounded-full bg-destructive/80" />
                  <span className="h-2.5 w-2.5 rounded-full bg-mint/80" />
                  <span className="h-2.5 w-2.5 rounded-full bg-cyan-glow/80" />
                  <span className="ml-3 text-[10px] font-mono text-muted-foreground">~/portfolio/game.jsx</span>
                </div>
                {/* Code */}
                <pre className="relative p-4 text-[11px] leading-relaxed font-mono text-mint/90">
{`> spawn Player {
   class: "FullStack",
   level: 99,
   weapons: [
     "React", "Node",
     "Unity", "C++"
   ],
   quest: "BuildStudio"
 }
> launching world...
> render: ok ✓`}
                </pre>
                {/* Mini game tiles */}
                <div className="absolute right-4 bottom-4 grid grid-cols-2 gap-2">
                  {["#00FFAA", "#00D4FF", "#00D4FF", "#00FFAA"].map((c, i) => (
                    <div key={i} className="h-10 w-10 rounded-md border border-white/10 backdrop-blur-sm"
                         style={{ background: `linear-gradient(135deg, ${c}33, transparent)` }} />
                  ))}
                </div>
              </div>
              {/* Hinge & base */}
              <div className="mx-auto mt-1 h-2 w-[460px] rounded-b-2xl bg-gradient-to-b from-white/10 to-white/0" />
              <div className="mx-auto h-3 w-[500px] rounded-[40%] bg-gradient-to-b from-white/10 to-transparent blur-sm" />
            </div>

            {/* Floating cubes */}
            <div className="absolute left-6 top-10 h-14 w-14 rounded-xl glass animate-float [animation-delay:1s] grid place-items-center text-mint">
              <Code2 className="h-6 w-6" />
            </div>
            <div className="absolute right-2 top-24 h-14 w-14 rounded-xl glass animate-float [animation-delay:2s] grid place-items-center text-cyan-glow">
              <Gamepad2 className="h-6 w-6" />
            </div>
            <div className="absolute right-10 bottom-6 h-14 w-14 rounded-xl glass animate-float [animation-delay:3s] grid place-items-center text-mint">
              <Rocket className="h-6 w-6" />
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

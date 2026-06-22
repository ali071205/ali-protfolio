import { useMemo } from "react";

export function Particles({ count = 40 }) {
  const items = useMemo(
    () =>
      Array.from({ length: count }).map((_, i) => ({
        id: i,
        left: Math.random() * 100,
        top: Math.random() * 100,
        size: Math.random() * 3 + 1,
        delay: Math.random() * 6,
        dur: 6 + Math.random() * 10,
        cyan: Math.random() > 0.6,
      })),
    [count],
  );
  return (
    <div aria-hidden className="pointer-events-none absolute inset-0 overflow-hidden">
      {items.map((p) => (
        <span
          key={p.id}
          className="absolute rounded-full animate-drift"
          style={{
            left: `${p.left}%`,
            top: `${p.top}%`,
            width: p.size,
            height: p.size,
            background: p.cyan ? "var(--cyan-glow)" : "var(--mint)",
            boxShadow: `0 0 ${p.size * 6}px currentColor`,
            color: p.cyan ? "var(--cyan-glow)" : "var(--mint)",
            opacity: 0.7,
            animationDelay: `${p.delay}s`,
            animationDuration: `${p.dur}s`,
          }}
        />
      ))}
    </div>
  );
}

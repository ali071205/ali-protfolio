/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  darkMode: "class",
  theme: {
    extend: {
      colors: {
        /* ── Neon Forge palette ── */
        background: "#0a0a0a",
        foreground: "#ffffff",
        mint: "#00FFAA",
        "cyan-glow": "#00D4FF",
        surface: "rgba(255,255,255,0.04)",
        "surface-2": "rgba(255,255,255,0.07)",
        card: "#121212",
        "card-foreground": "#ffffff",
        muted: "#1e1e1e",
        "muted-foreground": "#8a99a5",
        primary: "#00FFAA",
        "primary-foreground": "#0a0a0a",
        destructive: "#ff5555",
        "destructive-foreground": "#ffffff",
        border: "rgba(255,255,255,0.08)",
        input: "rgba(255,255,255,0.10)",
        ring: "#00FFAA",

        /* ── Legacy admin colors (kept for admin panel) ── */
        "on-error-container": "#ffdad6",
        "primary-container": "#4ecf9a",
        "surface-bright": "#3a3939",
        "error": "#ffb4ab",
        "outline": "#607a70",
        "on-background": "#edf7f3",
        "on-primary-container": "#080808",
        "on-primary": "#080808",
        "error-container": "#93000a",
        "surface-container-highest": "#353534",
        "surface-dim": "#080808",
        "on-surface": "#edf7f3",
        "secondary-container": "#161616",
        "secondary": "#9ecfd1",
        "surface-container-high": "#2a2a2a",
        "surface-container": "#161616",
        "outline-variant": "#3a4a40",
        "surface-container-low": "#101010",
        "surface-container-lowest": "#080808",
      },
      fontFamily: {
        display: ['"Orbitron"', '"Space Grotesk"', 'sans-serif'],
        sans: ['"Rajdhani"', '"Inter"', 'system-ui', 'sans-serif'],
        mono: ['"JetBrains Mono"', 'ui-monospace', 'monospace'],
        /* Legacy admin fonts */
        "headline-md": ["Libre Caslon Text", "serif"],
        "headline-sm": ["Inter", "sans-serif"],
        "body-lg": ["Inter", "sans-serif"],
        inter: ["Inter", "sans-serif"],
      },
      borderRadius: {
        DEFAULT: "0.75rem",
        lg: "0.75rem",
        xl: "1rem",
        "2xl": "1.25rem",
        full: "9999px",
      },
      animation: {
        "float": "float-y 6s ease-in-out infinite",
        "pulse-glow": "pulse-glow 3s ease-in-out infinite",
        "scan": "scan 4s linear infinite",
        "spin-slow": "spin-slow 18s linear infinite",
        "drift": "drift 14s ease-in-out infinite",
      },
      keyframes: {
        "float-y": {
          "0%, 100%": { transform: "translateY(0)" },
          "50%": { transform: "translateY(-14px)" },
        },
        "pulse-glow": {
          "0%, 100%": { boxShadow: "0 0 16px rgba(0,255,170,0.4), 0 0 40px rgba(0,255,170,0.2)" },
          "50%": { boxShadow: "0 0 28px rgba(0,255,170,0.7), 0 0 80px rgba(0,255,170,0.4)" },
        },
        "scan": {
          "0%": { transform: "translateY(-100%)" },
          "100%": { transform: "translateY(200%)" },
        },
        "spin-slow": {
          to: { transform: "rotate(360deg)" },
        },
        "drift": {
          "0%": { transform: "translate(0,0)" },
          "50%": { transform: "translate(20px,-30px)" },
          "100%": { transform: "translate(0,0)" },
        },
      },
      backgroundImage: {
        "hero-glow": "radial-gradient(circle at 50% 50%, rgba(0, 255, 170, 0.15) 0%, rgba(19, 19, 19, 0) 70%)",
        "grad-neon": "linear-gradient(135deg, #00FFAA 0%, #00D4FF 100%)",
      },
    },
  },
  plugins: [],
}

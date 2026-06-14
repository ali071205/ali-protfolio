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
        "on-error-container": "#ffdad6",
        "primary-container": "#4ecf9a", // Match portfolio primary
        "surface-bright": "#3a3939",
        "primary-fixed-dim": "#4ecf9a", // Match portfolio primary
        "error": "#ffb4ab",
        "on-primary-fixed": "#002112",
        "on-tertiary-fixed-variant": "#474746",
        "primary-fixed": "#4ecf9a", // Match portfolio primary
        "on-primary-fixed-variant": "#005233",
        "outline": "#607a70", // Match portfolio muted
        "on-background": "#edf7f3", // Match portfolio foreground
        "on-primary-container": "#080808", // Match portfolio primaryFg
        "background": "#080808", // Match portfolio bg
        "on-primary": "#080808", // Match portfolio primaryFg
        "error-container": "#93000a",
        "surface-container-highest": "#353534",
        "surface-dim": "#080808", // Match portfolio bg
        "on-surface": "#edf7f3", // Match portfolio foreground
        "inverse-on-surface": "#313030",
        "secondary-container": "#161616", // Match portfolio secondary
        "on-tertiary-fixed": "#1c1b1b",
        "tertiary-fixed": "#edf7f3", // Match portfolio foreground
        "primary": "#4ecf9a", // Match portfolio primary
        "on-secondary-fixed": "#002021",
        "tertiary-container": "#e2dfdf",
        "secondary": "#9ecfd1",
        "inverse-primary": "#006c46",
        "on-secondary-fixed-variant": "#1a4e50",
        "tertiary-fixed-dim": "#c8c6c5",
        "surface-container-high": "#2a2a2a",
        "on-tertiary": "#313030",
        "surface": "#101010", // Match portfolio card
        "inverse-surface": "#edf7f3", // Match portfolio foreground
        "on-tertiary-container": "#636262",
        "surface-tint": "#4ecf9a", // Match portfolio primary
        "on-secondary-container": "#8dbec0",
        "on-secondary": "#003739",
        "surface-variant": "#161616", // Match portfolio secondary
        "on-surface-variant": "#607a70", // Match portfolio muted
        "on-error": "#690005",
        "surface-container": "#161616", // Match portfolio secondary
        "outline-variant": "#3a4a40",
        "secondary-fixed-dim": "#9ecfd1",
        "secondary-fixed": "#b9ecee",
        "surface-container-low": "#101010", // Match portfolio card
        "tertiary": "#fffcfb",
        "surface-container-lowest": "#080808" // Match portfolio bg
      },
      borderRadius: {
        "DEFAULT": "0.125rem",
        "lg": "0.25rem",
        "xl": "0.5rem",
        "full": "0.75rem"
      },
      spacing: {
        "container-padding-desktop": "40px",
        "stack-sm": "12px",
        "container-padding-mobile": "20px",
        "stack-lg": "48px",
        "stack-md": "24px",
        "base": "8px",
        "gutter": "16px"
      },
      fontFamily: {
        "headline-md": ["Libre Caslon Text", "serif"],
        "headline-sm": ["Inter", "sans-serif"],
        "body-lg": ["Inter", "sans-serif"],
        "body-md": ["Inter", "sans-serif"],
        "label-caps": ["Inter", "sans-serif"],
        "display-lg-mobile": ["Libre Caslon Text", "serif"],
        "display-lg": ["Libre Caslon Text", "serif"],
        geist: ["Geist", "sans-serif"],
        inter: ["Inter", "sans-serif"],
        mono: ["JetBrains Mono", "monospace"],
      },
      fontSize: {
        "headline-md": ["32px", {"lineHeight": "1.2", "fontWeight": "400"}],
        "headline-sm": ["20px", {"lineHeight": "1.4", "letterSpacing": "0.01em", "fontWeight": "600"}],
        "body-lg": ["18px", {"lineHeight": "1.6", "fontWeight": "400"}],
        "body-md": ["16px", {"lineHeight": "1.6", "fontWeight": "400"}],
        "label-caps": ["12px", {"lineHeight": "1.2", "letterSpacing": "0.1em", "fontWeight": "700"}],
        "display-lg-mobile": ["40px", {"lineHeight": "1.1", "fontWeight": "400"}],
        "display-lg": ["64px", {"lineHeight": "1.1", "letterSpacing": "-0.02em", "fontWeight": "400"}]
      },
      animation: {
        "float": "float 6s ease-in-out infinite",
        "pulse-slow": "pulse 3s ease-in-out infinite",
        "spin-slow": "spin 3s linear infinite",
      },
      keyframes: {
        float: {
          "0%, 100%": { transform: "translateY(0px)" },
          "50%": { transform: "translateY(-20px)" },
        },
      },
      backgroundImage: {
        "hero-glow": "radial-gradient(circle at 50% 50%, rgba(0, 255, 170, 0.15) 0%, rgba(19, 19, 19, 0) 70%)",
      },
    },
  },
  plugins: [],
}

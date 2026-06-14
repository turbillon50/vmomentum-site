import type { Config } from "tailwindcss";
const config: Config = {
  content: ["./app/**/*.{ts,tsx}", "./components/**/*.{ts,tsx}"],
  theme: {
    extend: {
      colors: {
        void: "var(--color-void)",
        ink: "var(--color-ink)",
        background: "var(--color-background)",
        surface: "var(--color-surface)",
        "surface-low": "var(--color-surface-low)",
        "surface-high": "var(--color-surface-high)",
        "surface-elev": "var(--color-surface-elev)",
        "on-surface": "var(--color-on-surface)",
        "on-surface-variant": "var(--color-on-surface-variant)",
        muted: "var(--color-muted)",
        "violet-300": "var(--color-violet-300)",
        "violet-400": "var(--color-violet-400)",
        "violet-500": "var(--color-violet-500)",
        "cyan-400": "var(--color-cyan-400)",
        "gold-arc": "var(--color-gold-arc)",
        "success-emerald": "var(--color-success-emerald)",
        "error-crimson": "var(--color-error-crimson)",
      },
      fontFamily: {
        sans: ["var(--font-geist)", "system-ui", "sans-serif"],
        mono: ["var(--font-geist-mono)", "monospace"],
      },
      animation: {
        "fade-up": "fadeUp 0.6s cubic-bezier(0.22,1,0.36,1) forwards",
        "pulse-slow": "pulse 3s ease-in-out infinite",
        "float": "float 6s ease-in-out infinite",
        "scan": "scan 8s linear infinite",
      },
      keyframes: {
        fadeUp: {
          "0%": { opacity:"0", transform:"translateY(16px)" },
          "100%": { opacity:"1", transform:"translateY(0)" },
        },
        float: {
          "0%,100%": { transform:"translateY(0px)" },
          "50%": { transform:"translateY(-12px)" },
        },
        scan: {
          "0%": { transform:"translateY(-100%)" },
          "100%": { transform:"translateY(100vh)" },
        },
      },
    },
  },
  plugins: [],
};
export default config;

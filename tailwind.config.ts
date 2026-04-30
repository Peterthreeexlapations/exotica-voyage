import type { Config } from "tailwindcss";
import animate from "tailwindcss-animate";

const config: Config = {
  darkMode: "class",
  content: [
    "./app/**/*.{ts,tsx}",
    "./components/**/*.{ts,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        ink: {
          950: "#0a0908",
          900: "#111110",
          800: "#1a1917",
          700: "#262521",
          600: "#3a3833",
          500: "#5a564f",
        },
        bronze: {
          200: "#d8c180",
          300: "#cdb45f",
          400: "#b89c4f",
          500: "#a08540",
          600: "#856b34",
          700: "#6b5429",
        },
        bone: {
          DEFAULT: "#f4efe6",
          dim: "#cfc8b9",
        },
      },
      fontFamily: {
        display: ["var(--font-display)", "Georgia", "serif"],
        body: ["var(--font-body)", "system-ui", "sans-serif"],
        mono: ["var(--font-mono)", "ui-monospace", "monospace"],
      },
      letterSpacing: {
        tightest: "-0.045em",
        widest2: "0.32em",
      },
      maxWidth: {
        prose2: "65ch",
        content: "1600px",
      },
      transitionTimingFunction: {
        luxury: "cubic-bezier(0.22, 1, 0.36, 1)",
      },
      keyframes: {
        "ken-burns": {
          "0%, 100%": { transform: "scale(1.0)" },
          "50%": { transform: "scale(1.08)" },
        },
        "fade-up": {
          "0%": { opacity: "0", transform: "translateY(20px)" },
          "100%": { opacity: "1", transform: "translateY(0)" },
        },
        marquee: {
          "0%": { transform: "translateX(0)" },
          "100%": { transform: "translateX(-50%)" },
        },
        "accordion-down": {
          from: { height: "0" },
          to: { height: "var(--radix-accordion-content-height)" },
        },
        "accordion-up": {
          from: { height: "var(--radix-accordion-content-height)" },
          to: { height: "0" },
        },
      },
      animation: {
        "ken-burns": "ken-burns 18s ease-in-out infinite",
        "fade-up": "fade-up 1.1s cubic-bezier(0.22, 1, 0.36, 1) both",
        marquee: "marquee 60s linear infinite",
        "accordion-down": "accordion-down 0.2s ease-out",
        "accordion-up": "accordion-up 0.2s ease-out",
      },
    },
  },
  plugins: [animate],
};

export default config;

/** @type {import('tailwindcss').Config} */

import { type PluginAPI } from "tailwindcss/types/config";

module.exports = {
  darkMode: ["class"],
  content: [
    "./pages/**/*.{ts,tsx}",
    "./components/**/*.{ts,tsx}",
    "./app/**/*.{ts,tsx}",
    "./src/**/*.{ts,tsx}",
  ],
  theme: {
    container: {
      center: true,
      padding: "2rem",
      screens: {
        "2xl": "1400px",
      },
    },
    extend: {
      fontSize: {
        xxs: "0.687rem",
        title: "2.3rem",
      },
      colors: {
        border: "hsl(var(--border))",
        input: "hsl(var(--input))",
        ring: "hsl(var(--ring))",
        background: "hsl(var(--background))",
        foreground: "hsl(var(--foreground))",
        primary: {
          DEFAULT: "hsl(var(--primary))",
          foreground: "hsl(var(--primary-foreground))",
        },
        secondary: {
          DEFAULT: "hsl(var(--secondary))",
          foreground: "hsl(var(--secondary-foreground))",
        },
        destructive: {
          DEFAULT: "hsl(var(--destructive))",
          foreground: "hsl(var(--destructive-foreground))",
        },
        muted: {
          DEFAULT: "hsl(var(--muted))",
          foreground: "hsl(var(--muted-foreground))",
        },
        accent: {
          DEFAULT: "hsl(var(--accent))",
          foreground: "hsl(var(--accent-foreground))",
        },
        popover: {
          DEFAULT: "hsl(var(--popover))",
          foreground: "hsl(var(--popover-foreground))",
        },
        tooltip: {
          DEFAULT: "hsl(var(--tooltip))",
          foreground: "hsl(var(--tooltip-foreground))",
        },
        card: {
          DEFAULT: "hsl(var(--card))",
          foreground: "hsl(var(--card-foreground))",
        },
      },
      borderRadius: {
        lg: "var(--radius)",
        md: "calc(var(--radius) - 2px)",
        sm: "calc(var(--radius) - 4px)",
      },
      keyframes: {
        rolling: {
          "0%": { left: "25%" },
          "25%": { left: "0%" },
          "25.0001%": { left: "calc(100% + 120px)" },
          "100%": { left: "25%" },
        },
        "accordion-down": {
          from: { height: 0 },
          to: { height: "var(--radix-accordion-content-height)" },
        },
        "accordion-up": {
          from: { height: "var(--radix-accordion-content-height)" },
          to: { height: 0 },
        },
      },
      animation: {
        "accordion-down": "accordion-down 0.2s ease-out",
        "accordion-up": "accordion-up 0.2s ease-out",
        rolling: "rolling 10s linear",
      },
    },
  },
  plugins: [colorVarsPlugin],
};

function colorVarsPlugin({ addBase, theme }: PluginAPI) {
  const extractColorVars = (
    colorObj: Record<string, string>,
    colorGroup = ""
  ) =>
    Object.entries(colorObj).reduce((vars, [colorKey, value]) => {
      const cssVariable =
        colorKey === "DEFAULT"
          ? `--color${colorGroup}`
          : `--color${colorGroup}-${colorKey}`;

      const newVars: Record<string, string> =
        typeof value === "string"
          ? { [cssVariable]: value }
          : extractColorVars(value, `-${colorKey}`);

      return { ...vars, ...newVars };
    }, {});

  addBase({
    ":root": extractColorVars(theme("colors")),
  });
}

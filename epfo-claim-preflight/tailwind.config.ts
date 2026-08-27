import type { Config } from "tailwindcss";

const config: Config = {
  content: [
    "./src/pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/components/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/app/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      colors: {
        bg: "#f2f5fb",
        card: "#ffffff",
        ink: "#1c2e4a",
        muted: "#4e607f",
        brand: "#0e4a92",
        brandSoft: "#e7effa",
        warn: "#8a5b00",
        warnSoft: "#fff4d6",
        danger: "#8f2d2d",
        success: "#13683a",
        successSoft: "#e4f3ea",
      },
      boxShadow: {
        card: "0 6px 16px rgba(14, 74, 146, 0.08)",
      },
      borderRadius: {
        xl2: "1.25rem",
      },
    },
  },
  plugins: [],
};

export default config;

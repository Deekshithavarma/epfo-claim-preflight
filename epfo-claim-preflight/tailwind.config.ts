import type { Config } from "tailwindcss";

const config: Config = {
  content: [
    "./src/components/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/app/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      colors: {
        ink: "#1c2e4a",
        muted: "#4e607f",
        brand: "#0e4a92",
        warn: "#8a5b00",
        warnSoft: "#fff4d6",
        danger: "#8f2d2d",
        success: "#13683a",
        successSoft: "#e4f3ea",
      },
      boxShadow: {
        card: "0 6px 16px rgba(14, 74, 146, 0.08)",
      },
    },
  },
  plugins: [],
};

export default config;

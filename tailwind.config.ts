import type { Config } from "tailwindcss";

const config: Config = {
  content: [
    "./app/**/*.{js,ts,jsx,tsx,mdx}",
    "./components/**/*.{js,ts,jsx,tsx,mdx}",
    "./data/**/*.{js,ts,jsx,tsx,mdx}"
  ],
  theme: {
    extend: {
      colors: {
        cream: "#FFF8EA",
        linen: "#F7ECD8",
        butter: "#FFE5B5",
        clay: "#D77C42",
        cocoa: "#4A2F23",
        coffee: "#2F211B",
        moss: "#7E8B62"
      },
      fontFamily: {
        sans: [
          "var(--font-sans)",
          "ui-sans-serif",
          "system-ui",
          "sans-serif"
        ]
      },
      boxShadow: {
        soft: "0 18px 50px rgba(74, 47, 35, 0.12)"
      }
    }
  },
  plugins: []
};

export default config;

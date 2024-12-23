import type { Config } from "tailwindcss";

export default {
  content: [
    "./src/pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/components/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/app/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      colors: {
        background: "var(--background)",
        foreground: "var(--foreground)",
        christmas: {
          red: "#D63447",
          green: "#2D5A27",
          gold: "#FFD700",
          snow: "#FFFFFF",
          dark: "#0F172A",
          accent: "#FF8C42",
          pine: "#1B4332",
          berry: "#9E2B25",
        },
      },
      backgroundImage: {
        "gradient-radial": "radial-gradient(var(--tw-gradient-stops))",
        "snow-pattern": 'url("data:image/svg+xml,%3Csvg...%22)',
      },
      animation: {
        "snow-fall": "snow 10s linear infinite",
        float: "float 3s ease-in-out infinite",
        twinkle: "twinkle 2s ease-in-out infinite",
        "scale-up": "scale-up 0.3s ease-in-out",
      },
      keyframes: {
        snow: {
          "0%": { transform: "translateY(-10px)" },
          "100%": { transform: "translateY(100vh)" },
        },
        float: {
          "0%, 100%": { transform: "translateY(0)" },
          "50%": { transform: "translateY(-10px)" },
        },
        "scale-up": {
          "0%": { transform: "scale(1)" },
          "100%": { transform: "scale(1.05)" },
        },
      },
    },
  },
  plugins: [],
} satisfies Config;

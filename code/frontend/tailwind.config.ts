import type { Config } from "tailwindcss";

const config: Config = {
  content: ["./app/**/*.{js,ts,jsx,tsx,mdx}"],
  theme: {
    extend: {
      colors: {
        primary: "#2563EB",
        "primary-dark": "#1E40AF",
        background: "#F8FAFC",
        surface: "#FFFFFF",
        accent: "#10B981",
      },
    },
  },
  plugins: [],
};

export default config;

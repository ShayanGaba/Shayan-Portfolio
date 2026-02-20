/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ["./index.html", "./src/**/*.{js,ts,jsx,tsx}"], // Scans your files for Tailwind classes
  theme: {
    extend: {
      colors: {
        primary: "#e5e5e0",
        DarkLava: "#393632",
        SageGray: "#8b8b73",
        gold: "#cfa355",
      },
      fontFamily: {
        "space-grotesk": ["Space Grotesk", "sans-serif"],
        "clash-display": ["Clash Display", "sans-serif"],
      },
    },
  },
  plugins: [],
};

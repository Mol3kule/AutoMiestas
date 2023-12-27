/** @type {import('tailwindcss').Config} */
module.exports = {
  darkMode: ["class"],
  content: [
    './pages/**/*.{ts,tsx}',
    './components/**/*.{ts,tsx}',
    './app/**/*.{ts,tsx}',
    './src/**/*.{ts,tsx}'
  ],
  theme: {
    fontSize: {
      base: "0.75rem",
      base_xl: "1.25rem"
    },
    colors: {
      primary: "#161A30",
      secondary: "#000",
      placeholder: "#D8D8D8",
      placeholder_secondary: "#A1A1A1",
      border: "#E9E9E9",
      highlight: "#5C8374",
      highlight_secondary: "#F5F6F9",
      error: "#FDBDBD",
      error_secondary: "#FF6F6F"
    },
  },
  plugins: [require("tailwindcss-animate")],
}
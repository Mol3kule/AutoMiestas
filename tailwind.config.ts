import { withUt } from "uploadthing/tw";

export default withUt({
  darkMode: ["class"],
  content: [
    './pages/**/*.{ts,tsx}',
    './components/**/*.{ts,tsx}',
    './app/**/*.{ts,tsx}',
    './src/**/*.{ts,tsx}'
  ],
  theme: {
    fontSize: {
      header: "0.9375rem",
      base: "0.75rem",
      sm: "0.625rem",

      header_2xl: "1.25rem",
      base_2xl: "1rem",
      sm_2xl: "0.813rem"
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
      error_secondary: "#FF6F6F",
      error_third: "#FFA800"
    },
    screens: {
      tablet: '640px',
      laptop: '1024px',
      hd: '1920px',
      full_hd: '2560px'
    }
  },
  plugins: [require("tailwindcss-animate")],
});

// /** @type {import('tailwindcss').Config} */
// module.exports = {
//   darkMode: ["class"],
//   content: [
//     './pages/**/*.{ts,tsx}',
//     './components/**/*.{ts,tsx}',
//     './app/**/*.{ts,tsx}',
//     './src/**/*.{ts,tsx}'
//   ],
//   theme: {
//     fontSize: {
//       header: "0.9375rem",
//       base: "0.75rem",
//       sm: "0.625rem",

//       header_2xl: "1.25rem",
//       base_2xl: "1rem",
//       sm_2xl: "0.813rem"
//     },
//     colors: {
//       primary: "#161A30",
//       secondary: "#000",
//       placeholder: "#D8D8D8",
//       placeholder_secondary: "#A1A1A1",
//       border: "#E9E9E9",
//       highlight: "#5C8374",
//       highlight_secondary: "#F5F6F9",
//       error: "#FDBDBD",
//       error_secondary: "#FF6F6F",
//       error_third: "#FFA800"
//     },
//     screens: {
//       tablet: '640px',
//       laptop: '1024px',
//       hd: '1920px',
//       full_hd: '2560px'
//     }
//   },
//   plugins: [require("tailwindcss-animate")],
// }
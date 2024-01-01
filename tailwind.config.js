/** @type {import('tailwindcss').Config} */
module.exports = {
  darkMode: "class",
  content: [
    "./pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./components/**/*.{js,ts,jsx,tsx,mdx}",
    "./app/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      colors: {
        rose: {
          'utube': '#ff0101'
        }
      },
      fontFamily: {
        sans: ["var(--font-montserrat)"],
        // mono: ['var(--font-roboto-mono)'],
      },
      backgroundImage: {
        blueBlack: "bg-gradient-to-tr from-blue-950 to-black",
      },
    },
  },
  plugins: [],
};

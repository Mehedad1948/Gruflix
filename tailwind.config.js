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
        sans: ["Montserrat"],
        mono: ['var(--font-roboto-mono)'],
      },
      backgroundImage: {
        blueBlack: "bg-gradient-to-tr from-blue-950 to-black",
        smooth: 'bg-[linear-gradient(9deg,_rgba(249,240,231,1)_0%,_rgba(225,226,221,1)_35%,_rgba(165,218,222,1)_100%)]',
        frame: 'bg-[linear-gradient(9deg,_rgba(235,248,205,1)_0%,_rgba(212,200,190,1)_19%,_rgba(242,251,216,1)_49%,_rgba(199,202,200,1)_100%)]'

      },
      animation: {
        'spin-slow': 'spin 100s linear infinite',
        'spin-slow-3': 'spin 6s linear infinite',
      }
    },
  },
  plugins: [],
};

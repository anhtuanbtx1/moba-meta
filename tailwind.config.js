/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        gold: {
          primary: '#d4af37',
          glow: '#e8bc2a',
        },
        tier: {
          s: '#c4882a',
          a: '#8b7355',
          b: '#7a9e7f',
          c: '#9a9a8a',
        }
      },
      fontFamily: {
        sans: ['"Be Vietnam Pro"', 'sans-serif'],
        chakra: ['"Chakra Petch"', 'sans-serif'],
      }
    },
  },
  plugins: [],
}

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
      },
      keyframes: {
        pointsFlyUp: {
          '0%': { transform: 'translateY(0) scale(1)', opacity: '1' },
          '100%': { transform: 'translateY(-40px) scale(1.2)', opacity: '0' },
        },
        heroReveal: {
          '0%': { transform: 'scale(0.8) translateY(20px)', opacity: '0' },
          '50%': { transform: 'scale(1.05) translateY(-5px)', opacity: '1' },
          '100%': { transform: 'scale(1) translateY(0)', opacity: '1' },
        }
      },
      animation: {
        pointsFlyUp: 'pointsFlyUp 0.8s ease-out forwards',
        heroReveal: 'heroReveal 0.5s ease-out forwards',
      }
    },
  },
  plugins: [],
}

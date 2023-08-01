/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./src/**/*.{js,jsx,ts,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        blue: {
          DEFAULT: "#11051D",
          25: "#A257F1",
          50: "#8632DF",
          100: "#7C22DB",
          200: "#5E0DB8",
          300: "#3F0085",
          400: "#2C0C4E",
          500: "#2C0C4E",
          600: "#11051D",
          700: "#0D0416"
        },
        green: {
          DEFAULT: "#ADE374"
        }
      },
    },
    fontFamily: {
        'sans': ['Bebas Neue', 'sans-serif'],
    }
  },
  plugins: [],
}

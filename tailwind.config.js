/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./src/**/*.{js,jsx,ts,tsx}",
  ],
  theme: {
    extend: {
      fontFamily:{
        'Archivo': ['"Archivo"', 'sans-serif'],
        'Ubuntu': ['"Ubuntu"', 'sans-serif'],
      },
      backgroundImage: {
        'hero': "url('./image/hero.jpg')",
      }
    },
  },
  plugins: [],
}


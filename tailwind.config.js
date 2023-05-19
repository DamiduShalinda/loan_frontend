/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        'matt-gray': '#1E1E1E',
        '-hasaru-yellow': '#F5C249'
      },
      width: {
        'normla-width': '300px',
      }
    },
  },
  plugins: [],
}


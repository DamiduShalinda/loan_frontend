/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        'matt-gray': '#1b1b1b',
        '-hasaru-yellow': '#F5C249',
        'input-gray': '#2b2b2b',
        'input-label-color' : '#ffffff',
      },
      width: {
        'normla-width': '300px',
      }
    },
  },
  plugins: [],
}


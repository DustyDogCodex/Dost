/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  mode: 'jit',
  theme: {
    extend: {
        fontFamily: {
            'marker': ['Permanent Marker', "cursive"]
        }
    },
  },
  plugins: [],
  darkMode: 'class'
}
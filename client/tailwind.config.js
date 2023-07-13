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
    screens: {
      xs: "480px",
      sm: "780px",
      md: "1060px",
      lg: "1200px",
      xl: "1700px"
    }
  },
  plugins: [],
  darkMode: 'class'
}
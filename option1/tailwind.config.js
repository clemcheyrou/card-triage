/** @type {import('tailwindcss').Config} */

export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        navy:'#08244C',
        white:'#f2f2f2',
        orange:'#FFDE73',
        green: '#82D9A0',
      },
      fontSize: {
        xs: "0.6rem",
        sm: "0.7rem",
        base: "0.8rem",
      },
    },
  },
  plugins: [
  ],
}
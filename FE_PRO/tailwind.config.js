/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      boxShadow: {
        Shadowcur: 'rgba(17, 12, 46, 0.15) 0px 48px 100px 0px',
      },
    },
    fontFamily: {
      Poppins: ['Poppins', 'sans-serif'],
    },
  },
  plugins: [],
}

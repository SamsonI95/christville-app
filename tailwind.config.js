/** @type {import('tailwindcss').Config} */
export default {
  content: ["./src/**/*.{html,js,jsx}"],
  theme: {
    extend: {
      fontFamily: {
        Inria: ['"Inria Serif"', "serif"],
        Poppins: ['"Poppins"', "sans-serif"],
      },
      colors: {
        customGold: "#DDBF5F"
      }
    },
  },
  plugins: [],
}


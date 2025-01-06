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
        customGold: "#DDBF5F",
        customGray: "#a0a0a0"
      },
      animation: {
        bounce: "bounce 5s ease-in-out infinite",
      },
      keyframes: {
        bounce: {
          "0%, 100%": { transform: "translateY(0)" },
          "5%": { transform: "translateY(-10px)" },
        },
      },
    },
  },
  plugins: [],
};

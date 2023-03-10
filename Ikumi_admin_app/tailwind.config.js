/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ["./index.html", "./src/**/*.{vue,js,ts,jsx,tsx}"],
  theme: {
    extend: {
      colors: {
        customRed: "#ff002b",
        customGreen: "#4c956c",
        customBlue: "#8fb0c1",
      },
    },
  },
  plugins: [],
};

/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ["./src/**/*.{js,jsx,ts,tsx}"],
  theme: {
    extend: {
      fontFamily: {
        mulish: ["Mulish", "sans-serif"],
      },
      spacing: {
        128: "32rem",
        144: "36rem",
        160: "40rem",
        176: "44rem",
        192: "48rem",
        208: "52rem",
      },
      colors: {
        royalBlue: "#5138EE",
        turquoiseBlue: "#5EC6E8",
      },
    },
  },
  plugins: [],
};

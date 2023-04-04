/** @type {import('tailwindcss').Config} */
const defaultTheme = require("tailwindcss/defaultTheme");
module.exports = {
  mode: "jit",
  content: ["./src/**/*.{html,js}"],
  theme: {
    extend: {
      screens: {
        destop: "1248px",
        tablet: "960px",
        xxs: "280px",
        xs: "375px",
        // => @media (min-width: 992px) { ... }
      },
      fontFamily: {
        Inter: ["Inter", "sans-serif"],
        Roboto: ["Roboto", "sans-serif"],
        Unbounded: ["Unbounded", "sans-serif"],
        Albert: ['"Albert Sans"', "sans-serif"],
        Merriweather: ["Merriweather", "sans-serif"],
      },
      colors: {
        primary: "#008FBB",
        secodary: "#9C505A",
        mainbg: "#EDEDE5",
        codepen: "#7fb6ca",
        btncolor: "#F1693C",
        purple: "#3F3CBB",
        midnight: "#121063",
        metal: "#565584",
        _accent: "#8855ff",
        _black: "#2E2C2D",
        _pink1: "#EAC1B1",
        _blue: "#00ADB5",
        _yellow: "#F9ED69",
        _pink: "#F38181",
        _orange: "#F08A5D",
        _green: "#1FAB89",
        _brown: "#9E7676",
        _darkblue: "#2B2E4A",
        _red: "#E84545",
        _dark: "#252A34",
        _w_bg: "#322638",
        _w_text: "#ECEFF1",
        _w_match: "#388E3C",
        _w_no_match: "#ebeff1",
        _w_almost: "#F9A825",
      },
    },
  },
  plugins: [],
};

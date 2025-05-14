module.exports = {
  mode: "jit",
  content: [
    "./src/pages/**/*.{js,ts,jsx,tsx}",
    "./src/components/**/*.{js,ts,jsx,tsx}",
    "./src/sections/**/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      screens: {
        'md' : '800px'
      },
      colors: {
        "athens-gray": "#F5F3F6",
        orange: "#F64900",
        "shuttle-gray": "#656668",
        "pale-sky": "#6C757D",
        "rolling-stone": "#797C80",
        silver: "#C4C4C4",
        trout: "#495057",
        "cape-cod": "#323333",
        gallery: "#EAEAEA",
        vermilion: "#F64900",
        "light-orange": "#FDD7C7",
      },
      fontFamily: {
        rubik: ["Rubik", "sans-serif"],
      },
      fontSize: {
        base: ["1rem", "1.185rem"],
        lg: ["1.125rem", "1.333rem"],
        xl: ["1.25rem", "1.5rem"],
        "15xl": ["52px", "64px"],
      },
    },
  },
  variants: {
    extend: {},
  },
  plugins: [],
};

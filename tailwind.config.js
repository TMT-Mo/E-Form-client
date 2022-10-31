/** @type {import('tailwindcss').Config} */
const { fontFamily } = require("tailwindcss/defaultTheme");
module.exports = {
  content: ["./src/**/*.{ts,tsx}"],
  important: "#root",
  darkMode: 'class',
  theme: {
    extend: {
      colors: {
        'blue-light-config': '#EBF1F9',
        'blue-config': '#407AFF',
        'white-config': '#FAFAFA',
        'gray-config': '#6F7276',
        'less-gray-config': '#F2F2F2',
        'dark-config': '#1D242B',
        'less-dark-config': '#404952'
      },
      animation: {
        "spin-slow": "spin 3s linear infinite",
      },
    },
    fontFamily: {
      sans: ["Roboto", ...fontFamily.sans],
    },

    screens: {
      sm: "480px",
      // => @media (min-width: 480px) { Mobile }

      md: "768px",
      // => @media (min-width: 768px) { ... }

      lg: "1024px",
      // => @media (min-width: 1024px) { ... }

      xl: "1280px",
      // => @media (min-width: 1280px) { ... }
    },
  },
  variants: {
    extend: {
      visibility: ["group-hover"],
    },
  },
  // plugins: [require("daisyui")],
  // daisyui: {
  //   styled: true,
  //   themes: false,
  //   base: true,
  //   utils: true,
  //   logs: true,
  //   rtl: false,
  //   prefix: "",
  //   darkTheme: "dark",
  // },
};

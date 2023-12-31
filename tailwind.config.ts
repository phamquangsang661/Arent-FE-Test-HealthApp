import { type Config } from "tailwindcss";
export default {
  content: ["./src/**/*.{js,ts,jsx,tsx}"],
  theme: {
    colors: {
      light: "white",
      primary: {
        300: "#FFCC21",
        400: "#FF963C",
        500: "#EA6C00",
      },
      secondary: {
        300: "#8FE9D0",
      },
      dark: {
        600: "#2E2E2E",
        500: "#414141",
      },
      gray: {
        400: "#777777",
      },
    },
    fontFamily: {
      primary: ["NotoSansJP", "Roboto", "sans-serif"],
      secondary: ["Inter", "sans-serif"],
      hiragino: ["Hiragino", "sans-serif"],
    },
    extend: {},
  },
  plugins: [],
} satisfies Config;

/** @type {import('tailwindcss').Config} */
const defaultTheme = require("tailwindcss/defaultTheme");

export default {
  content: ["./index.html", "./src/**/*.{js,ts,jsx,tsx}"],
  theme: {
    extend: {
      fontFamily: {
        sans: ["Inter var", ...defaultTheme.fontFamily.sans],
      },
      screens: {
        xs: "480px", // Add custom breakpoint for extra small screens
      },
      height: {
        30: "7.5rem", // Custom height value (e.g., 30 * 0.25rem = 7.5rem)
        40: "10rem", // Custom height value (e.g., 30 * 0.25rem = 7.5rem)
        50: "13.5rem", // Custom height value (e.g., 30 * 0.25rem = 7.5rem)
      },
    },
  },
  plugins: [],
};

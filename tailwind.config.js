/** @type {import('tailwindcss').Config} */
export default {
  content: ["./src/**/*.html", "./src/**/*.jsx", "./src/**/*.js"],
  theme: {
    extend: {
      colors: {
        "blue-custom": "#00ccff",
        "blue-custom-hover": "#19b9e0",
      },
      fontFamily: {
        custom: ["Bahnschrift Condensed", "sans-serif"],
      },
    },
  },
  plugins: [],
};

/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./components/**/*.{js,vue,ts}",
    "./layouts/**/*.vue",
    "./pages/**/*.vue",
    "./plugins/**/*.{js,ts}",
    "./app.vue",
    "./error.vue",
  ],
  theme: {
    colors: {
      main: "#5B21B6",
      gold: "#FFD700",
      black: "#020617",
      purple: "#6C35C9",
      red: "#DA002B",
      gray: "#d1d5db",
      borderGray: "#8b8b8b",
      white: "#ffffff",
    },
    extend: {},
  },
  plugins: [],
};

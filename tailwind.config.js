/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./index.html",
    "./src/**/*.{vue,js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {},
  },
  darkMode: ['selector', '[data-mode="dark"]'],
  plugins: [require("tw-elements/plugin.cjs")],
}


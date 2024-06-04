/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{vue,js,ts,jsx,tsx}",
    "./node_modules/tw-elements/js/**/*.js",
    "./node_modules/flowbite/**/*.js",
    './node_modules/flowbite-vue/**/*.{js,jsx,ts,tsx,vue}',
  ],
  safelist: [
    {
      pattern: /bg-(red|green|blue|orange)-(100|500|700)/,
      variants: ['lg', 'hover', 'focus', 'lg:hover'],
    },
  ],
  theme: {
    extend: {},
  },
  darkMode: 'selector',
  plugins: [
    require("tw-elements/plugin.cjs"),
    require('flowbite/plugin')
  ]
}


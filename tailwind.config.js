const flowbite = require("flowbite-react/tailwind");

/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ["./src/**/*.{js,jsx,ts,tsx}", flowbite.content()],
  plugins: [
    require('flowbite/plugin')
  ],
  theme: {
    extend: {},
  },
};

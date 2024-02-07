/** @type {import('tailwindcss').Config} */

const colors = require('tailwindcss/colors')

module.exports = {
  mode: 'jit',
  content: [
    "./src/**/*.{js,jsx,ts,tsx}",
  ],
  theme: {
    extend: {
      
      colors: {
        'blue': {
          light: "#297EFE",
          DEFAULT: "#22283A",
        },
        'gray': {
          100: "#F6F8FE",
          200: "#E7E9F4",
          300: "#DAE2EC"
        },
        'red': "#FF3243",
        'yellow': {
          light: "#FFF1BE",
          dark: "#FFC701"
        },
        'green': {
          light: "#C9EBC1",
          dark: "#61BF36"
        }
      }
    },
  },
  plugins: [],
}


/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,jsx,ts,tsx}",
  ],
  theme: {
    extend: {
      width: {
        '120' : '380px'
      },
      height: {
        '70' : '289px'
      },
      lineClamp : {
        20 : '20'
      }
    },
  },
  plugins: [],
}


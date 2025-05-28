/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors:{
        'aside' : '#F0EFE8',
        'border-aside' : '#e0b44B',

      },
      backgroundColor:{
        'body':'#FEFEFE',
        'section' : '#F9F7F3',
        'main' : '#EFE7D9',
        'border-aside' : '#e0b44B',
      }
    },
  },
  plugins: [],
}


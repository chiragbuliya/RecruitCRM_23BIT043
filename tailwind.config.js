/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        airbnb: {
          primary: '#FF385C',
          hover: '#E00B41',
          active: '#D70466',
          light: '#FFF0F3',
          dark: '#222222',
          gray: '#717171',
          border: '#EBEBEB',
        }
      }
    },
  },
  plugins: [],
}

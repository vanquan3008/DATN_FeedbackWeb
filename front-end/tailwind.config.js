/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./src/**/*.{js,jsx,ts,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        'color-basic': '#979797',
        'color-text-subject': '#252F40',
        'color-text-download':'#3A416F',
        'color-checkbox': '#3A416F',
        'color-button':'#3A416F',
        'blue-title':"#21D4FD",
        'color-title-main':"#3A416F",
        'color-navbar-login':"#F2F2F2",
        'color-background-main':"#F8F9FA"
      },
      height: {
        'profile': '7rem',
      }
    },
  },
  plugins: [],
}
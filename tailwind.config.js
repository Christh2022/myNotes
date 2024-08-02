/** @type {import('tailwindcss').Config} */
module.exports = {
  content:["./App.{js,jsx,ts,tsx}", "./<custom directory>/**/*.{js,jsx,ts,tsx}"],
  
   theme: {
    extend: {
      fontFamily: {
        manrope: ['Manrope', 'sans-serif'],
      },
      colors: {
        gray: {
          900: '#3D3B3B',
          500: '#868484',
        },
        blue: {
          600: '#3354FF',
        },
      },
    },
  }, 
  plugins: [],
}

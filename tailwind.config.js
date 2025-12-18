/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./index.tsx",
    "./App.tsx",
    "./pages/**/*.{js,ts,jsx,tsx}",
    "./components/**/*.{js,ts,jsx,tsx}",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      fontFamily: {
        sans: ['Inter', 'sans-serif'],
      },
      colors: {
        dtales: {
          navy: '#000F55',
          white: '#ffffff',
          black: '#000000',
          gray: '#EEEEEE',
          accent: '#001980'
        }
      }
    }
  },
  plugins: [],
}

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
  safelist: [
    "animate-gradient-foreground-1",
    "animate-gradient-foreground-2",
    "animate-gradient-foreground-3",
    "before:animate-gradient-background-1",
    "before:animate-gradient-background-2",
    "before:animate-gradient-background-3",
    "from-gradient-1-start",
    "to-gradient-1-end",
    "from-gradient-2-start",
    "to-gradient-2-end",
    "from-gradient-3-start",
    "to-gradient-3-end",
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

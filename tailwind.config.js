/** @type {import('tailwindcss').Config} */
export default {
  content: ['./index.html', './src/**/*.{js,ts,jsx,tsx}'],
  theme: {
    extend: {
      colors: {
        primary: '#89B8CA',
        secondary: "#F97316",
        background: '#F1F3F6',
        backgroundDark: '#101010',
      },
    },
  },
  plugins: [],
}


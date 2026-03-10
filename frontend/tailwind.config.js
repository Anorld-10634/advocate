/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        navy: {
          800: '#001f3f', // Navy Blue
          900: '#00172e',
        },
        jungle: {
          500: '#29ab87', // Jungle Green
          600: '#228f71',
        }
      }
    },
  },
  plugins: [],
}
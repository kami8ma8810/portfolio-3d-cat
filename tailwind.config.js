/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        'primary-yellow': 'var(--color-yellow)',
        'primary-black': 'var(--color-black)',
        'primary-white': 'var(--color-white)',
      }
    },
  },
  plugins: [],
}
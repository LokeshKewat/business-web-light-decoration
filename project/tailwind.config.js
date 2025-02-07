/** @type {import('tailwindcss').Config} */
export default {
  content: ['./index.html', './src/**/*.{js,ts,jsx,tsx}'],
  darkMode: 'class',
  theme: {
    extend: {
      colors: {
        primary: {
          DEFAULT: '#064E3B',
          dark: '#064E3B'
        },
        secondary: '#10B981',
        background: {
          DEFAULT: 'var(--background)',
        },
        content: {
          DEFAULT: 'var(--content)',
        }
      }
    },
  },
  plugins: [],
};
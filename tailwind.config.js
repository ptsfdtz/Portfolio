/** @type {import('tailwindcss').Config} */
export default {
  // Use class strategy so toggling `document.documentElement.classList` works
  darkMode: 'class',
  content: ['./index.html', './src/**/*.{js,ts,jsx,tsx}'],
  theme: {
    extend: {},
  },
  plugins: [],
};

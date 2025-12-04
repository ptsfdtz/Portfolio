/** @type {import('tailwindcss').Config} */
export default {
  // Use class strategy so toggling `document.documentElement.classList` works
  darkMode: 'class',
  content: ['./index.html', './src/**/*.{js,ts,jsx,tsx}'],
  theme: {
    extend: {
      maxWidth: {
        '8xl': '96rem',
        '9xl': '112rem',
        '10xl': '128rem',
      },
    },
  },
  plugins: [require('tailwindcss-debug-screens')],
};

/** @type {import('tailwindcss').Config} */
export default {
  content: ['./index.html', './src/**/*.{js,jsx}'],
  theme: {
    extend: {
      width: {
        xl: '36rem',
      },
      backgroundImage: {
        table: "url('/src/assets/green-felt-background.jpg')",
      },
    },
  },
  plugins: [],
};

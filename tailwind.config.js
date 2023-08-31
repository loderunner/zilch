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
        'gradient-radial':
          'radial-gradient(circle at center, var(--tw-gradient-stops))',
      },
    },
  },
  plugins: [],
};

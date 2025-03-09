/** @type {import('tailwindcss').Config} */
export default {
  content: ['./index.html', './src/**/*.{js,ts,jsx,tsx}'],
  theme: {
    extend: {
      colors: {
        primary: {
          DEFAULT: "#276B4E",
          light: "#36936b",
          90: "#e4f5ee",
        },
      },
    },
  },
  plugins: [],
};

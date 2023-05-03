/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      boxShadow: {
        secondary: '5px 5px 10px rgba(1, 1, 1, 0.5)',
      },
    },
  },
  plugins: [],
}


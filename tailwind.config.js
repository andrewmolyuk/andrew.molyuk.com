/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ["./content/**/*.html", "./layouts/**/*.html"],
  theme: {
    extend: {},
  },
  plugins: [
    require('@tailwindcss/typography'),
  ],
}
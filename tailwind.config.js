/** @type {import('tailwindcss').Config} */
module.exports = {
    content: ["./content/**/*.html", "./layouts/**/*.html", "./node_modules/tw-elements/dist/js/**/*.js"],
    theme: {
        extend: {},
    },
    plugins: [require("tw-elements/dist/plugin.cjs")],
    darkMode: "class"
}



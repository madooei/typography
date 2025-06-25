/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
    // Include the component library so Tailwind finds its classes
    "./node_modules/@madooei/typography/dist/**/*.{js,cjs}"
  ],
  theme: {
    extend: {},
  },
  plugins: [],
}
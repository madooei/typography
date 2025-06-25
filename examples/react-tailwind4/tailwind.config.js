/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
    // Include the component library so Tailwind finds its classes
    "./node_modules/@madooei/react-example-package/dist/**/*.{js,cjs}"
  ],
}
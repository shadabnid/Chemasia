/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./src/pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/components/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/app/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  darkMode: 'class',
  theme: {
    extend: {
      colors: {
        "primary-color":"#5EBDB1",
        "secondary-color":"#C47DB5",
        "form-bg":"#eff8f7",
        "button-hover":"#4b978e",
        "border-color":"#afded8"
      },
    },
  },
  plugins: [],
};

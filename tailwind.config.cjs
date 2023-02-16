/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ["./index.html", "./src/**/*.{js,ts,jsx,tsx}"],
  darkMode: "class",
  theme: {
    extend: {
      colors: {
        "main-color": "#1E2A47",
        "secondary-color": "#141D2F",
        "third-color": "#141D2F",
        "btn-color": "#0079ff",
        "white-color": "#f6f8ff",
        "plane-White-color": "#fefefe",
        "text-color": "#4b6a9b",
      },
    },
  },
  plugins: [],
};

// frontend/tailwind.config.js
module.exports = {
  content: [
    "./pages/**/*.{js,ts,jsx,tsx}",
    "./components/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        brand: "#0f172a",         // custom dark blue background
        "brand-light": "#1e293b"  // slightly lighter version
      },
    },
  },
  plugins: [],
}



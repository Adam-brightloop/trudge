/** @type {import('tailwindcss').Config} */
module.exports = {
    content: [
      "./pages/**/*.{js,ts,jsx,tsx,mdx}",
      "./components/**/*.{js,ts,jsx,tsx,mdx}",
      "./app/**/*.{js,ts,jsx,tsx,mdx}",
    ],
    theme: {
      extend: {
        colors: {
          // You can add your BrightLoop brand colors here
          // For example:
          // primary: "#3490dc",
          // secondary: "#ffed4a",
          primary: '#1B263B', // Navy
          accent: '#EAB543', // Gold
          neutral: '#FFFFFF', // White
        },
        fontFamily: {
          // Add custom fonts if needed
          // sans: ['Inter', 'sans-serif'],
        },
      },
    },
    plugins: [],
  }
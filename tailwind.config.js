/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ["./src/**/*.{html,ts}",],
  theme: {
    extend: {
      colors: {
        'intelli-light': '#E8F2FC',
        'intelli-blue': '#3273AF',
        'intelli-dark-blue': '#0A385F',
        'intelli-dark': '#1C2227'
      },
      fontFamily: {
        'poppins': ['Poppins', 'sans-serif']
      },
      screens: {
        'xs': '475px',
        'sm': '640px',
        'md': '768px',
        'lg': '1024px',
        'xl': '1280px',
        '2xl': '1536px',
      },
    },
  },
  plugins: [],
}


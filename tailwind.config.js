/** @type {import('tailwindcss').Config} */
export default {
  content: ["./index.html", "./src/**/*.{ts,tsx}"],
  theme: {
    extend: {
      colors: {
        'syngenta-green': '#73dc78',
        'syngenta-green-dark': '#5f7800',
        'syngenta-navy': '#00004b',
        'syngenta-orange': '#ffaa00',
        'syngenta-orange-dark': '#eb8200',
        'cropwise-green': '#73dc78',
      },
      fontFamily: {
        sans: ['"Poppins"', 'sans-serif'],
      },
    },
  },
  plugins: [],
}

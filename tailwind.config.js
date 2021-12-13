module.exports = {
  purge: ['./src/**/*.{js,jsx,ts,tsx}', './public/index.html'],
  darkMode: false, // or 'media' or 'class'
  theme: {
    extend: {
      backgroundImage: {
        'Login-lg': "url('components/img/Login.jpeg')",
      },
    },
  },
  variants: {
    extend: {},
  },
  plugins: [
    require('tailwind-scrollbar-hide'),
  ],
}

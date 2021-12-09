module.exports = {
  purge: ['./src/**/*.{js,jsx,ts,tsx}', './public/index.html'],
  darkMode: false, // or 'media' or 'class'
  theme: {
    extend: {
      backgroundImage: {
        'Home-lg': "url('components/img/Home.jpeg')",
        'Login-lg': "url('components/img/Login.jpeg')",
      },
    },
  },
  variants: {
    extend: {},
  },
  plugins: [],
}

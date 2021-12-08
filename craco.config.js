// craco.config.js
module.exports = {
    style: {
      postcss: {
        plugins: [
          require('tailwindcss'),
          require('autoprefixer'),
          // require('tailwind-scrollbar-hide')

        ],
      },
    },
  }
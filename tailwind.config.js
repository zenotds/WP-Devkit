/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ['./**/*.twig'],
  theme: {
    container: {
      center: true,
      padding: '1.5rem',
    },
    screens: {
      'sm': '576px',
      'md': '768px',
      'lg': '992px',
      'xl': '1200px',
      '2xl': '1400px',
      '3xl': '1600px',
    }
  },
}
/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ['./src/renderer/**/*.{js,ts,jsx,tsx}'],
  theme: {
    extend: {
      colors: {
        neutral: {
          50: '#fafafa',
          100: '#f5f5f5',
          150: '#f0f0f0',
          200: '#e5e5e5',
          250: '#dadada',
          300: '#d4d4d4',
          350: '#c9c9c9',
          400: '#a3a3a3',
          450: '#989898',
          500: '#737373',
          550: '#686868',
          600: '#525252',
          650: '#474747',
          700: '#404040',
          750: '#353535',
          800: '#262626',
          850: '#1b1b1b',
          900: '#171717',
          950: '#0a0a0a',
        }
      }
    }
  },
  plugins: [
    require('@tailwindcss/typography'),
    require('@tailwindcss/forms'),
  ]
}

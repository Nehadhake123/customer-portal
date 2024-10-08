/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./src/**/*.{js,jsx,ts,tsx}",
  ],
  theme: {
    extend: {
      scrollbar: {
        hide: {
          'overflow-y': 'scroll',
          '::-webkit-scrollbar': {
            display: 'none'
          },
          'scrollbar-width': 'none'
        }
      },
      colors: {
        'primary': '#1a202c',
        'secondary': '#2d3748',
        'accent': '#38b2ac',
      },
      boxShadow: {
        'card': '0 4px 8px rgba(0, 0, 0, 0.1)',
      },
    },
  },
  plugins: [
    require('tailwind-scrollbar') 
  ]
}

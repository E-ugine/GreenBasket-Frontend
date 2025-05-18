/** @type {import('tailwindcss').Config} */
export default {
  content: ['./src/**/*.{js,jsx,ts,tsx,html}'],
  theme: {
    extend: {
      colors: {
        primary: {
          600: '#059669', // Your green color
        },
      },
      spacing: {
        18: '4.5rem',
        22: '5.5rem',
      }
    }
  },
  plugins: [],
}

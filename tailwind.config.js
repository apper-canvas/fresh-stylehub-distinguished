/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        primary: {
          DEFAULT: '#FF3F6C',
          50: '#FFE5ED',
          100: '#FFB3CC',
          200: '#FF80AB',
          300: '#FF4D8A',
          400: '#FF3F6C',
          500: '#FF3F6C',
          600: '#E6396A',
          700: '#CC3268',
          800: '#B32C66',
          900: '#992664'
        },
        secondary: {
          DEFAULT: '#282C3F',
          50: '#F7F8FA',
          100: '#E3E5E8',
          200: '#C7CAD0',
          300: '#9BA0A9',
          400: '#6F7582',
          500: '#4A5065',
          600: '#3B4048',
          700: '#282C3F',
          800: '#1F2236',
          900: '#16182D'
        },
        accent: {
          DEFAULT: '#FF9F00',
          50: '#FFF4E6',
          100: '#FFE5CC',
          200: '#FFD699',
          300: '#FFC766',
          400: '#FFB833',
          500: '#FF9F00',
          600: '#E68F00',
          700: '#CC7F00',
          800: '#B36F00',
          900: '#995F00'
        },
        surface: '#FFFFFF',
        background: '#FAFBFC',
        success: '#03A685',
        warning: '#FF9F00',
        error: '#EE5A6F',
        info: '#4A90E2'
      },
      fontFamily: {
        'display': ['Bebas Neue', 'sans-serif'],
        'body': ['Inter', 'sans-serif']
      },
      animation: {
        'bounce-cart': 'bounce 0.5s ease-in-out',
        'shimmer': 'shimmer 2s infinite linear'
      },
      keyframes: {
        shimmer: {
          '0%': { transform: 'translateX(-100%)' },
          '100%': { transform: 'translateX(100%)' }
        }
      }
    },
  },
  plugins: [],
}
/** @type {import('tailwindcss').Config} */
module.exports = {
  darkMode: ['class'],
  content: ['./src/**/*.{js,ts,jsx,tsx,scss,css}'],
  theme: {
    screens: {
      xsm: { max: '576px' },
      sm: { min: '576px', max: '768px' },
      md: { min: '768px', max: '992px' },
      lg: { min: '992px', max: '1200px' },
      xl: { min: '1200px', max: '1400px' },
      exl: { min: '1400px' },
    },
    container: {
      center: true,
      padding: '1rem',
      screens: {
        '2xl': '1400px',
      },
    },
    extend: {
      colors: {
        accent: {
          100: '#73a5ff',
          300: '#4c8dff',
          500: '#397df6',
          700: '#2f68cc',
          900: '#234e99',
        },
        success: {
          100: '#80ffbf',
          300: '#22e584',
          500: '#14cc70',
          700: '#0f9954',
          900: '#0a6638',
        },
        danger: {
          100: '#ff8099',
          300: '#f23d61',
          500: '#cc1439',
          700: '#990f2b',
          900: '#660a1d',
        },
        warning: {
          100: '#ffd073',
          300: '#e5ac39',
          500: '#d99000',
          700: '#996600',
          900: '#664400',
        },
        dark: {
          100: '#4C4C4C',
          300: '#333333',
          500: '#171717',
          700: '#0D0D0D',
          900: '#000000',
        },
        light: {
          100: '#ffffff',
          300: '#f7fbff',
          500: '#edf3fa',
          700: '#d5dae0',
          900: '#bdc1c7',
        },
        secondBgColor: '#171717',
        bgColor: '#0d0d0d',
        bgLog: '#101010',
        bgLogBorder: '#333333',
      },
      keyframes: {
        'accordion-down': {
          from: { height: 0 },
          to: { height: 'var(--radix-accordion-content-height)' },
        },
        'accordion-up': {
          from: { height: 'var(--radix-accordion-content-height)' },
          to: { height: 0 },
        },
      },
      animation: {
        'accordion-down': 'accordion-down 0.2s ease-out',
        'accordion-up': 'accordion-up 0.2s ease-out',
      },
    },
  },
  plugins: [require('tailwindcss-animate'), require('tailwindcss-debug-screens')],
}

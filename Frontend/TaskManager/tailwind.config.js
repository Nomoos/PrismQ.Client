/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{vue,js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      // Mobile-first breakpoints
      screens: {
        'xs': '360px',
        'sm': '428px',
        'md': '768px',
        'lg': '1024px',
        'xl': '1280px',
      },
      // Touch-friendly spacing
      spacing: {
        'touch': '44px',  // Minimum touch target
      },
      // Mobile-optimized colors
      colors: {
        primary: {
          50: '#f0f9ff',
          100: '#e0f2fe',
          500: '#0ea5e9',
          600: '#0284c7',
          700: '#0369a1',
        },
      },
    },
  },
  plugins: [],
}

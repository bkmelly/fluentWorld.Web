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
          DEFAULT: '#2563EB', // Change this to your brand's primary color
          light: '#3B82F6',
          dark: '#1D4ED8',
        },
        secondary: {
          DEFAULT: '#10B981', // Change this to your brand's secondary color
          light: '#34D399',
          dark: '#059669',
        },
        accent: {
          DEFAULT: '#F59E0B', // Change this to your brand's accent color
          light: '#FBBF24',
          dark: '#D97706',
        }
      },
    },
  },
  plugins: [],
} 
/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./src/**/*.{js,jsx,ts,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        brand: {
          primary: '#024D5E',
          secondary: '#C18721',
        }
      },
    },
  },
  plugins: [
    require('@tailwindcss/typography'),
  ],
  safelist: [
    'bg-[#024D5E]',
    'bg-[#C18721]',
    'text-[#024D5E]',
    'text-[#C18721]',
    'border-[#024D5E]',
    'border-[#C18721]',
    'hover:bg-[#024D5E]',
    'hover:bg-[#C18721]',
    'hover:text-[#024D5E]',
    'hover:text-[#C18721]',
  ]
}; 
/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./src/**/*.{js,jsx,ts,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        primary: '#024D5E',
        secondary: '#C18721',
        'primary-light': '#E6EEF0',
        'primary-dark': '#023E4B',
        'secondary-light': '#FCF4E6',
        'secondary-dark': '#9A6C1A',
      },
      animation: {
        'ripple': 'ripple 1s cubic-bezier(0.4, 0, 0.2, 1)',
      },
      keyframes: {
        ripple: {
          '0%': { transform: 'scale(0)', opacity: '0.5' },
          '100%': { transform: 'scale(4)', opacity: '0' },
        },
      },
    },
  },
  plugins: [
    require('@tailwindcss/typography'),
  ],
  safelist: [
    'bg-primary',
    'text-primary',
    'border-primary',
    'bg-secondary',
    'text-secondary',
    'border-secondary',
    {
      pattern: /(bg|text|border)-(primary|secondary)-(50|100|200|300|400|500|600|700|800|900)/,
    },
  ]
}; 
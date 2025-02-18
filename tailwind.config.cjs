/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./src/**/*.{js,jsx,ts,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        white: '#ffffff',
        black: '#000000',
        primary: '#024D5E',
        secondary: '#C18721',
        'primary-light': '#E6EEF0',
        'primary-dark': '#023E4B',
        'secondary-light': '#FCF4E6',
        'secondary-dark': '#9A6C1A',
        gray: {
          50: '#F9FAFB',
          100: '#F3F4F6',
          200: '#E5E7EB',
          300: '#D1D5DB',
          400: '#9CA3AF',
          500: '#6B7280',
          600: '#4B5563',
          700: '#374151',
          800: '#1F2937',
          900: '#111827',
        },
        social: {
          twitter: '#1DA1F2',
          facebook: '#4267B2',
          linkedin: '#0077B5',
          instagram: '#E1306C',
          youtube: '#FF0000'
        }
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
  safelist: [
    'bg-white',
    'bg-black',
    'text-white',
    'text-black',
    'text-gray-900',
    'bg-primary',
    'text-primary',
    'border-primary',
    'bg-secondary',
    'text-secondary',
    'border-secondary',
    {
      pattern: /(bg|text|border)-(primary|secondary|gray)-(50|100|200|300|400|500|600|700|800|900)/,
    },
    'text-social-twitter',
    'text-social-facebook',
    'text-social-linkedin',
    'text-social-instagram',
    'text-social-youtube'
  ]
}; 
const { hairlineWidth } = require('nativewind/theme');

/** @type {import('tailwindcss').Config} */
module.exports = {
  darkMode: 'class',
  content: [
    './src/**/*.{ts,tsx}',
    './app/**/*.{ts,tsx}',
    './components/**/*.{ts,tsx}',
  ],
  presets: [require('nativewind/preset')],
  theme: {
    extend: {
      colors: {
        border: {
          DEFAULT: 'hsl(0, 0%, 89.8%)',
          dark: 'hsl(0, 0%, 14.9%)',
        },
        input: {
          DEFAULT: 'hsl(0, 0%, 89.8%)',
          dark: 'hsl(0, 0%, 14.9%)',
        },
        ring: {
          DEFAULT: 'hsl(0, 0%, 63%)',
          dark: 'hsl(300, 0%, 45%)',
        },
        background: {
          DEFAULT: 'hsl(0, 0%, 100%)',
          dark: 'hsl(0, 0%, 3.9%)',
        },
        foreground: {
          DEFAULT: 'hsl(0, 0%, 3.9%)',
          dark: 'hsl(0, 0%, 98%)',
        },
        primary: {
          DEFAULT: 'hsl(0, 0%, 9%)',
          dark: 'hsl(0, 0%, 98%)',
          foreground: 'hsl(0, 0%, 98%)',
          'foreground-dark': 'hsl(0, 0%, 9%)',
        },
        secondary: {
          DEFAULT: 'hsl(0, 0%, 96.1%)',
          dark: 'hsl(0, 0%, 14.9%)',
          foreground: 'hsl(0, 0%, 9%)',
          'foreground-dark': 'hsl(0, 0%, 98%)',
        },
        destructive: {
          DEFAULT: 'hsl(0, 84.2%, 60.2%)',
          dark: 'hsl(0, 70.9%, 59.4%)',
          foreground: 'hsl(0, 0%, 98%)',
        },
        muted: {
          DEFAULT: 'hsl(0, 0%, 96.1%)',
          dark: 'hsl(0, 0%, 14.9%)',
          foreground: 'hsl(0, 0%, 45.1%)',
          'foreground-dark': 'hsl(0, 0%, 63.9%)',
        },
        accent: {
          DEFAULT: 'hsl(0, 0%, 96.1%)',
          dark: 'hsl(0, 0%, 14.9%)',
          foreground: 'hsl(0, 0%, 9%)',
          'foreground-dark': 'hsl(0, 0%, 98%)',
        },
        popover: {
          DEFAULT: 'hsl(0, 0%, 100%)',
          dark: 'hsl(0, 0%, 3.9%)',
          foreground: 'hsl(0, 0%, 3.9%)',
          'foreground-dark': 'hsl(0, 0%, 98%)',
        },
        card: {
          DEFAULT: 'hsl(0, 0%, 100%)',
          dark: 'hsl(0, 0%, 3.9%)',
          foreground: 'hsl(0, 0%, 3.9%)',
          'foreground-dark': 'hsl(0, 0%, 98%)',
        },
      },
      borderRadius: {
        lg: 'var(--radius)',
        md: 'calc(var(--radius) - 2px)',
        sm: 'calc(var(--radius) - 4px)',
      },
      borderWidth: {
        hairline: hairlineWidth(),
      },
      keyframes: {
        'accordion-down': {
          from: { height: '0' },
          to: { height: 'var(--radix-accordion-content-height)' },
        },
        'accordion-up': {
          from: { height: 'var(--radix-accordion-content-height)' },
          to: { height: '0' },
        },
      },
      animation: {
        'accordion-down': 'accordion-down 0.2s ease-out',
        'accordion-up': 'accordion-up 0.2s ease-out',
      },
    },
  },
  future: {
    hoverOnlyWhenSupported: true,
  },
  plugins: [require('tailwindcss-animate')],
};

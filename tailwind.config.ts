import type { Config } from 'tailwindcss'

const config: Config = {
  content: [
    './pages/**/*.{js,ts,jsx,tsx,mdx}',
    './components/**/*.{js,ts,jsx,tsx,mdx}',
    './app/**/*.{js,ts,jsx,tsx,mdx}',
  ],
  darkMode: 'class',
  theme: {
    extend: {
      colors: {
        halloween: {
          orange: '#ff6b35',
          purple: '#8b5cf6', 
          dark: '#0a0a0a',
          'dark-gray': '#1a1a1a',
          gray: '#374151',
          light: '#f5f5f5',
          red: '#dc2626',
        }
      },
      fontFamily: {
        spooky: ['Creepster', 'cursive'],
        gothic: ['Gothic A1', 'sans-serif'],
      },
      animation: {
        'spooky-glow': 'spooky-glow 2s ease-in-out infinite alternate',
        'text-flicker': 'text-flicker 1.5s linear infinite',
        'fade-in-up': 'fade-in-up 0.6s ease-out',
      },
      keyframes: {
        'spooky-glow': {
          '0%': { textShadow: '0 0 5px currentColor' },
          '100%': { textShadow: '0 0 20px currentColor, 0 0 30px currentColor' },
        },
        'text-flicker': {
          '0%, 18%, 22%, 25%, 53%, 57%, 100%': { textShadow: '0 0 4px currentColor' },
          '20%, 24%, 55%': { textShadow: 'none' },
        },
        'fade-in-up': {
          '0%': { opacity: '0', transform: 'translateY(20px)' },
          '100%': { opacity: '1', transform: 'translateY(0)' },
        },
      }
    },
  },
  plugins: [],
}

export default config
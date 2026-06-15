/** @type {import('tailwindcss').Config} */
export default {
  content: ['./index.html', './src/**/*.{ts,tsx}'],
  theme: {
    extend: {
      colors: {
        navy: {
          950: '#071827',
          900: '#0B1C2D',
        },
        orange: {
          500: '#FF5A00',
          600: '#FF6500',
        },
        bg: {
          light: '#F7F9FC',
        },
        text: {
          secondary: '#5B677A',
        },
        border: {
          DEFAULT: '#DDE3EA',
        },
      },
      boxShadow: {
        soft: '0 12px 30px rgba(7,24,39,0.10)',
        softer: '0 10px 22px rgba(7,24,39,0.08)',
      },
      borderRadius: {
        '4xl': '2rem',
      },
      fontFamily: {
        sans: [
          'ui-sans-serif',
          'system-ui',
          '-apple-system',
          'Segoe UI',
          'Roboto',
          'Inter',
          'Arial',
          'Noto Sans',
          'sans-serif',
        ],
      },
    },
  },
  plugins: [],
}

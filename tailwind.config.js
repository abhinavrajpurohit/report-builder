/** @type {import('tailwindcss').Config} */
export default {
  content: ['./index.html', './src/**/*.{ts,tsx}'],
  theme: {
    extend: {
      colors: {
        canvas: '#F7F8FA',
        panel: '#FFFFFF',
        ink: '#1A1D24',
        muted: '#5B6270',
        line: '#E4E7EC',
        brand: {
          DEFAULT: '#2F5DD3',
          dark: '#1F3F9C',
        },
        danger: '#C4432B',
      },
    },
  },
  plugins: [],
}


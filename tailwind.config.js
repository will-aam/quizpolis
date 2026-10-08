/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        polis: {
          50: '#f0f5ff',
          100: '#e5edff',
          200: '#cddbfe',
          300: '#b4c6fc',
          400: '#8da2fb',
          500: '#6366f1',
          600: '#4f46e5',
          700: '#4338ca',
          800: '#3730a3',
          900: '#312e81',
          950: '#1e1b4b',
        }
      },
      fontFamily: {
        sans: ['Sora', 'system-ui', '-apple-system', 'BlinkMacSystemFont', 'Segoe UI', 'Roboto', 'sans-serif'],
      },
      animation: {
        aurora: "aurora 8s ease-in-out infinite alternate",
      },
      keyframes: {
        aurora: {
          "0%": {
            "background-position": "0% 50%",
            transform: "rotate(-5deg) scale(0.9)",
          },
          "25%": {
            "background-position": "50% 100%",
            transform: "rotate(5deg) scale(1.1)",
          },
          "50%": {
            "background-position": "100% 50%",
            transform: "rotate(-3deg) scale(0.95)",
          },
          "75%": {
            "background-position": "50% 0%",
            transform: "rotate(3deg) scale(1.05)",
          },
          "100%": {
            "background-position": "0% 50%",
            transform: "rotate(-5deg) scale(0.9)",
          },
        },
      }
    },
  },
  plugins: [],
}

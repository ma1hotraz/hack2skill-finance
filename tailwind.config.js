/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        jsfinance: {
          bg: '#0f172a',
          surface: '#1e293b',
          border: '#334155',
          accent: '#6366f1',
          accentHover: '#4f46e5',
          text: '#f1f5f9',
          muted: '#94a3b8',
          success: '#22c55e',
          error: '#ef4444',
          warning: '#f59e0b'
        }
      }
    },
  },
  plugins: [],
}

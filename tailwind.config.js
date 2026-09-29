/** @type {import('tailwindcss').Config} */
export default {
  content: ['./index.html', './src/**/*.{vue,js,ts,jsx,tsx}'],
  theme: {
    extend: {
      colors: {
        primary: '#2563eb',
        'primary-dark': '#1d4ed8',
        canvas: '#f8fafc',
        surface: '#ffffff',
        ink: '#172033',
        muted: '#64748b',
        border: '#e2e8f0',
        income: '#16a34a',
        expense: '#dc2626',
        warning: '#d97706',
      },
      boxShadow: {
        card: '0 1px 3px rgba(15, 23, 42, 0.08), 0 1px 2px rgba(15, 23, 42, 0.04)',
      },
      borderRadius: {
        card: '14px',
      },
    },
  },
  plugins: [],
}

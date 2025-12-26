/** @type {import('tailwindcss').Config} */
export default {
  darkMode: 'class',
  content: ['./index.html', './src/**/*.{js,ts,jsx,tsx}'],
  theme: {
    extend: {
      colors: {
        primary: '#137fec',
        'background-light': '#f6f7f8',
        'background-dark': '#101922',
        'surface-light': '#ffffff',
        'surface-dark': '#182430',
        'header-light': '#ffffff',
        'header-dark': '#111a22',
        'sub-surface-light': '#f8fafc',
        'sub-surface-dark': '#1c2a38',
        'text-main-light': '#0f172a',
        'text-main-dark': '#ffffff',
        'text-sub-light': '#64748b',
        'text-sub-dark': '#92adc9',
        'text-muted-light': '#94a3b8',
        'text-muted-dark': '#586e85',
        'card-light': '#ffffff',
        'card-dark': '#283039',
        // Status colors
        danger: '#EB001B',
        warning: '#f59e0b',
        success: '#10b981',
        info: '#3b82f6',
        // Legacy colors (keep for backward compatibility)
        title: '#000000',
        'light-text': '#8D8D8D',
      },
      fontFamily: {
        display: ['"Public Sans"', 'sans-serif'],
        body: ['"Noto Sans"', '"Public Sans"', 'sans-serif'],
        sans: ['"Public Sans"', '"Noto Sans"', 'sans-serif'],
        jersey25: ['"Jersey 25"', 'sans-serif'],
      },
      borderRadius: {
        DEFAULT: '0.25rem',
        lg: '0.5rem',
        xl: '0.75rem',
        full: '9999px',
      },
      maxWidth: {
        content: '1200px',
      },
      width: {
        sidebar: '256px',
      },
    },
  },
  plugins: [require('@tailwindcss/typography'), require('@tailwindcss/forms')],
};

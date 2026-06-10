import type { Config } from 'tailwindcss'

const config: Config = {
  content: [
    './app/**/*.{ts,tsx}',
    './components/**/*.{ts,tsx}',
    './context/**/*.{ts,tsx}',
    './lib/**/*.{ts,tsx}',
  ],
  theme: {
    extend: {
      colors: {
        blue: {
          DEFAULT: '#2563EB',
          dark: '#1D4ED8',
          light: '#EFF6FF',
          muted: '#BFDBFE',
        },
        cyan: {
          DEFAULT: '#38BDF8',
          light: '#E0F7FF',
          dark: '#0EA5E9',
        },
        surface: {
          DEFAULT: '#F8FAFC',
          card: '#FFFFFF',
          border: '#E2E8F0',
        },
        text: {
          primary: '#0F172A',
          secondary: '#475569',
          muted: '#94A3B8',
        },
        status: {
          confirmed: '#16A34A',
          'confirmed-bg': '#F0FDF4',
          pending: '#D97706',
          'pending-bg': '#FFFBEB',
          cancelled: '#DC2626',
          'cancelled-bg': '#FEF2F2',
          completed: '#475569',
          'completed-bg': '#F8FAFC',
          active: '#16A34A',
          'active-bg': '#F0FDF4',
          inactive: '#D97706',
          'inactive-bg': '#FFFBEB',
          removed: '#DC2626',
          'removed-bg': '#FEF2F2',
        },
      },
      fontFamily: {
        hebrew: ['Heebo', 'Arial Hebrew', 'Arial', 'sans-serif'],
      },
      fontSize: {
        xs: ['0.75rem', { lineHeight: '1.7' }],
        sm: ['0.875rem', { lineHeight: '1.7' }],
        base: ['1rem', { lineHeight: '1.7' }],
        lg: ['1.125rem', { lineHeight: '1.6' }],
        xl: ['1.25rem', { lineHeight: '1.5' }],
        '2xl': ['1.5rem', { lineHeight: '1.4' }],
        '3xl': ['1.875rem', { lineHeight: '1.3' }],
      },
      borderRadius: {
        DEFAULT: '12px',
        sm: '8px',
        md: '12px',
        lg: '16px',
        xl: '20px',
        full: '9999px',
      },
      maxWidth: {
        app: '430px',
      },
      boxShadow: {
        card: '0 2px 12px rgba(0,0,0,0.06)',
        'card-hover': '0 4px 20px rgba(0,0,0,0.10)',
        nav: '0 -2px 16px rgba(0,0,0,0.06)',
        modal: '0 8px 40px rgba(0,0,0,0.14)',
      },
      spacing: {
        'bottom-nav': '64px',
        'safe-bottom': '80px',
      },
    },
  },
  plugins: [],
}

export default config

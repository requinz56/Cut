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
          DEFAULT: '#1B4FD8',
          dark: '#1338B0',
          light: '#EBF2FF',
          muted: '#C7D9FF',
          accent: '#3B82F6',
          xlight: '#F4F8FF',
        },
        cyan: {
          DEFAULT: '#0EA5E9',
          light: '#E0F2FE',
          dark: '#0369A1',
        },
        surface: {
          DEFAULT: '#F4F8FF',
          card: '#FFFFFF',
          border: '#E2EAFF',
        },
        text: {
          primary: '#0B1629',
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
        xs:   ['0.75rem',   { lineHeight: '1.65' }],
        sm:   ['0.875rem',  { lineHeight: '1.65' }],
        base: ['1.0625rem', { lineHeight: '1.7'  }],
        lg:   ['1.125rem',  { lineHeight: '1.5'  }],
        xl:   ['1.25rem',   { lineHeight: '1.4'  }],
        '2xl':['1.5rem',    { lineHeight: '1.25' }],
        '3xl':['1.875rem',  { lineHeight: '1.2'  }],
      },
      borderRadius: {
        DEFAULT: '14px',
        sm: '8px',
        md: '14px',
        lg: '18px',
        xl: '22px',
        '2xl': '28px',
        full: '9999px',
      },
      maxWidth: {
        app: '430px',
      },
      boxShadow: {
        card:         '0 1px 4px rgba(15,30,80,0.06), 0 4px 16px rgba(27,79,216,0.07)',
        'card-hover': '0 4px 24px rgba(27,79,216,0.15)',
        nav:          '0 -1px 0 rgba(226,234,255,0.8), 0 -4px 24px rgba(27,79,216,0.08)',
        modal:        '0 8px 48px rgba(27,79,216,0.20)',
        'hero-glow':  '0 12px 40px rgba(27,79,216,0.3)',
      },
      spacing: {
        'bottom-nav': '72px',
        'safe-bottom': '88px',
      },
    },
  },
  plugins: [],
}

export default config

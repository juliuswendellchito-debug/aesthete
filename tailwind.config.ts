import type { Config } from 'tailwindcss'

const config: Config = {
  content: [
    './app/**/*.{ts,tsx}',
    './components/**/*.{ts,tsx}',
  ],
  theme: {
    extend: {
      colors: {
        'surface':                   '#f9f9f9',
        'surface-dim':               '#dadada',
        'surface-bright':            '#f9f9f9',
        'surface-container-lowest':  '#ffffff',
        'surface-container-low':     '#f3f3f3',
        'surface-container':         '#eeeeee',
        'surface-container-high':    '#e8e8e8',
        'surface-container-highest': '#e2e2e2',
        'on-surface':                '#1a1c1c',
        'on-surface-variant':        '#444748',
        'inverse-surface':           '#2f3131',
        'inverse-on-surface':        '#f1f1f1',
        'outline':                   '#747878',
        'outline-variant':           '#c4c7c7',
        'surface-tint':              '#5f5e5e',
        'primary':                   '#000000',
        'on-primary':                '#ffffff',
        'primary-container':         '#1c1b1b',
        'on-primary-container':      '#858383',
        'inverse-primary':           '#c8c6c5',
        'secondary':                 '#685c53',
        'on-secondary':              '#ffffff',
        'secondary-container':       '#f0e0d3',
        'on-secondary-container':    '#6e6258',
        'tertiary':                  '#000000',
        'on-tertiary':               '#ffffff',
        'tertiary-container':        '#1c1b1a',
        'error':                     '#ba1a1a',
        'on-error':                  '#ffffff',
        'error-container':           '#ffdad6',
        'background':                '#f9f9f9',
        'on-background':             '#1a1c1c',
        // Brand aliases
        'brand-black':     '#1a1a1a',
        'brand-champagne': '#d4c5b9',
        'brand-bone':      '#f9f9f9',
        'brand-sand':      '#e8e2da',
      },
      fontFamily: {
        playfair: ['var(--font-playfair)', 'Georgia', 'serif'],
        inter:    ['var(--font-inter)', 'system-ui', 'sans-serif'],
      },
      spacing: {
        'section': '7.5rem',
      },
      maxWidth: {
        'aesthete': '1440px',
      },
    },
  },
  plugins: [],
}

export default config

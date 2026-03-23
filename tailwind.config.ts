import type { Config } from 'tailwindcss';

const config: Config = {
  content: ['./src/**/*.{js,ts,jsx,tsx,mdx}'],
  theme: {
    extend: {
      fontFamily: {
        sans: ['var(--font-inter)'],
      },
      colors: {
        background: '#0A0A0A',
        surface: {
          DEFAULT: '#141414',
          light: '#1A1A1A',
        },
        border: '#262626',
        accent: {
          DEFAULT: '#E85D26',
          hover: '#FF6B35',
        },
        text: {
          primary: '#FFFFFF',
          secondary: '#A3A3A3',
          muted: '#737373',
        },
      },
    },
  },
  plugins: [require('@tailwindcss/typography')],
};

export default config;

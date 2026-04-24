import type { Config } from 'tailwindcss';

const config: Config = {
  content: [
    './app/**/*.{js,ts,jsx,tsx,mdx}',
    './lib/**/*.{js,ts,jsx,tsx}',
  ],
  theme: {
    extend: {
      colors: {
        ink: '#1a1a1a',
        cream: '#faf7f2',
        sage: {
          50:  '#f4f7f3',
          100: '#e5ebe1',
          600: '#5a7a56',
          700: '#476040',
          900: '#1f2a1c',
        },
        clay: {
          500: '#c97b4a',
          600: '#b5663a',
        },
      },
      fontFamily: {
        display: ['ui-serif', 'Georgia', 'serif'],
      },
    },
  },
  plugins: [],
};
export default config;

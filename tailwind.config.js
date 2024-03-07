import animations from '@midudev/tailwind-animations'

/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    './src/pages/**/*.{js,ts,jsx,tsx,mdx}',
    './src/components/**/*.{js,ts,jsx,tsx,mdx}',
    './src/app/**/*.{js,ts,jsx,tsx,mdx}'
  ],
  theme: {
    extend: {
      backgroundImage: {
        'gradient-radial': 'radial-gradient(var(--tw-gradient-stops))',
        'gradient-conic':
          'conic-gradient(from 180deg at 50% 50%, var(--tw-gradient-stops))'
      },
      colors: {
        nav: {
          bg: 'var(--nav-bg)'
        },
        itesus: {
          primary: 'var(--itesus-primary)',
          secondary: 'var(--itesus-secondary)',
          tertiary: 'var(--itesus-tertiary)'
        }
      }
    }
  },
  plugins: [animations]
}

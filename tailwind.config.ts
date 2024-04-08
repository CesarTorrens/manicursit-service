import type { Config } from 'tailwindcss';

const config: Config = {
  content: [
    './src/pages/**/*.{js,ts,jsx,tsx,mdx}',
    './src/components/**/*.{js,ts,jsx,tsx,mdx}',
    './src/app/**/*.{js,ts,jsx,tsx,mdx}',
  ],
  theme: {
    extend: {
      backgroundImage: {
        'gradient-radial': 'radial-gradient(var(--tw-gradient-stops))',
        'gradient-conic':
          'conic-gradient(from 180deg at 50% 50%, var(--tw-gradient-stops))',
      },
      colors: {
        greenStep: '#1AAE9F',
        colorBorder: '#C6D1DB',
        fontColor: '#888F97',
        bgCategoryItem: '#F2F5F7',
        iconPlus: '#788896',
        textColor: '#5B6671',
        colorBtnTurn: '#C3CFD9',
        btnSelected: '#4B5C6B',
      },
    },
  },
  plugins: [],
};
export default config;

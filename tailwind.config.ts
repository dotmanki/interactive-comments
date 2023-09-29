import type { Config } from 'tailwindcss'

const config: Config = {
  content: [
    './src/pages/**/*.{js,ts,jsx,tsx,mdx}',
    './src/components/**/*.{js,ts,jsx,tsx,mdx}',
    './src/app/**/*.{js,ts,jsx,tsx,mdx}',
  ],
  theme: {
    extend: {
      colors: {
        primary: 'hsl(238, 40%, 52%)',
        grayishBlue: 'hsl(211, 10%, 45%)',
        lightGrey: 'hsl(223, 19%, 93%)',
        veryLightGrey: 'hsl(228, 33%, 97%)',
      },
    },
  },
  plugins: [],
}
export default config

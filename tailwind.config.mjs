/** @type {import('tailwindcss').Config} */
export default {
  content: [
    './src/**/*.{astro,html,js,jsx,md,mdx,svelte,ts,tsx,vue}'
  ],

  theme: {
    extend: {
      colors: {
        primary: '#06B6D4',   // cyan
        secondary: '#0EA5E9', // sky
        accent: '#38BDF8',    // bleu clair

        dark: '#0F172A',
        light: '#F8FAFC',
        border: '#DBEAFE',
      },

      fontFamily: {
        sans: ['Alexandria', 'Inter', 'system-ui', 'sans-serif'],
        display: ['Playfair Display', 'serif'],
      },

      boxShadow: {
        soft: '0 10px 30px rgba(15,23,42,0.08)',
        card: '0 15px 40px rgba(15,23,42,0.10)',
      },
    },
  },

  plugins: [],
}
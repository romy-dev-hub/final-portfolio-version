// tailwind.config.js
/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    './pages/**/*.{js,ts,jsx,tsx,mdx}',
    './components/**/*.{js,ts,jsx,tsx,mdx}',
    './app/**/*.{js,ts,jsx,tsx,mdx}',
    './node_modules/@heroui/theme/dist/**/*.{js,ts,jsx,tsx}'
  ],
  darkMode: 'class',
  theme: {
    extend: {
      colors: {
        // Your exact color palette
        primary: '#1C352D',      // Dark Green
        secondary: '#A6B28B',    // Sage Green  
        accent: '#F5C9B0',       // Peach
        background: '#F9F6F3',   // Off-white/Pink
        // Dark mode colors
        dark: {
          primary: '#F9F6F3',    // Light text
          secondary: '#2A3B2E',  // Dark sage for cards
          accent: '#E8B896',     // Darker peach
          background: '#0A0F0D', // Dark background
        }
      },
      animation: {
        'float': 'float 6s ease-in-out infinite',
        'glow': 'glow 2s ease-in-out infinite alternate',
      }
    },
  },
  plugins: [],
}
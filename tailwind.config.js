module.exports = {
  content: ["./src/**/*.{js,jsx,ts,tsx}", "./public/index.html"],
  theme: {
    extend: {
      colors: {
        'nasa-red': '#fc3d21',
        'nasa-blue': '#0b3d91',
      },
      fontFamily: {
        sans: ['Space Grotesk', 'sans-serif'],
      },
      animation: {
        'pulse-slow': 'pulse 3s cubic-bezier(0.4, 0, 0.6, 1) infinite',
      },
      backgroundImage: {
        'space-gradient': 'linear-gradient(to bottom, #0f172a, #1e1b4b)',
      },
    },
  },
  plugins: [
    require('tailwindcss'),
    require('autoprefixer'),
  ],
};

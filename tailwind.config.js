module.exports = {
  content: [
    './pages/**/*.{js,ts,jsx,tsx}',
    './components/**/*.{js,ts,jsx,tsx}',
  ],
  theme: {
    fonts: {
      serif: "'New York', -apple-system-ui-serif, ui-serif, 'Georgia', serif",
    },
    extend: {
      fontSize: {
        xs: '12px',
        base: '18px',
      },
      colors: {
        moss: '#295123',
      },
    },
  },
  plugins: [],
};

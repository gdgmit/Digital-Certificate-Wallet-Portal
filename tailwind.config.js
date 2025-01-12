module.exports = {
  content: [
    './index.html',  // Ensure Tailwind scans the HTML file in the root directory
    './src/**/*.{js,jsx,ts,tsx}',  // Tailwind will look for classes inside all .js, .jsx, .ts, .tsx files in the src directory
  ],
  theme: {
    extend: {},
    screens: {
      sm: '640px',
      md: '768px',
      lg: '1024px',
      xl: '1280px',
    },  // Allows you to customize the default theme (e.g., colors, spacing, fonts, etc.)
  },
  plugins: [],  // You can add Tailwind CSS plugins here to extend its functionality
}

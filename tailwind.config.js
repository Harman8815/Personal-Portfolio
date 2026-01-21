/** @type {import('tailwindcss').Config} */
const config = {
  content: [
    "./src/**/*.{js,jsx,ts,tsx}",
    "./app/**/*.{js,jsx,ts,tsx}",
  ],
  theme: {
    extend: {
      screens: {
        tablet: "640px",
        laptop: "1280px",
        desktop: "1920px",
      },
      colors: {
        primary: "#03041f",
        secondary: "#282a36",
        accent: "#8be9fd",
      },
    },
  },
  plugins: [],
};

export default config;

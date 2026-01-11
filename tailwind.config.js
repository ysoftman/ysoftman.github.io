/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ["./src/**/*.{html,js}"],
  safelist: [
    {
      pattern:
        /bg-(blue|indigo|purple|pink|red|orange|yellow|green|teal|cyan|gray)-(200|300|500)/,
    },
  ],
  theme: {
    extend: {},
  },
  plugins: [],
};

/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ["./src/**/*.{html,js}"],
  safelist: [
    {
      pattern: /bg-(blue|indigo|purple|pink|red|orange|yellow|green|teal|cyan|gray)-(200|300|500)|text-orange-500|mb-4|text-gray-700|leading-relaxed|list-disc|ml-6|space-y-1|list-decimal|text-sm|text-gray-800|bg-gray-100|rounded|p-4|overflow-x-auto|px-2|py-1|font-mono|border-l-4|border-gray-300|pl-4|italic|text-gray-600|hover:text-orange-600|underline|min-w-full|table-auto|border-collapse|border|bg-gray-50|font-semibold|text-left|my-8|font-bold|text-gray-900/,
    },
  ],
  theme: {
    extend: {
      listStyleType: {
        'none': 'none',
      },
    },
  },
  plugins: [],
};

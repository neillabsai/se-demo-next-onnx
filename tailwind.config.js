/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./pages/**/*.{js,ts,jsx,tsx}",
    "./components/**/*.{js,ts,jsx,tsx}",
    "node_modules/daisyui/dist/**/*.js",
    "node_modules/react-daisyui/dist/**/*.js",
  ],
  plugins: [require("daisyui")],
  daisyui: {
    themes: [
      {
        night: {
          ...require("daisyui/src/colors/themes")["[data-theme=night]"],
          "base-content": "#eee",
        },
      },
      {
        light: {
          ...require("daisyui/src/colors/themes")["[data-theme=light]"],
        },
      },
    ],
  },
  plugins: [
    require("@tailwindcss/typography"),
    require("@tailwindcss/line-clamp"),
    require("daisyui"),
  ],
};

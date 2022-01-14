module.exports = {
  content: ["./ui-src/index.html", "./ui-src/**/*.tsx"],
  theme: {
    extend: {},
  },
  plugins: [require("@tailwindcss/forms")],
};

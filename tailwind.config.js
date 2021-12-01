module.exports = {
  mode: "jit",
  purge: ["./public/**/*.html", "./src/**/*.{js,jsx,ts,tsx,vue}"],
  darkMode: false, // or 'media' or 'class'
  theme: {
    extend: {
      backgroundImage: {
        'lbBg': "linear-gradient(90deg, #34D399 0%, #3B82F6 100%);",
      }
    },
  },
  variants: {},
  plugins: [],
}

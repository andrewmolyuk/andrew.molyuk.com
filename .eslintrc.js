module.exports = {
  extends: ["plugin:json/recommended", "eslint:recommended", "plugin:import/recommended"],
  parserOptions: {
    ecmaVersion: 2019,
    sourceType: "module",
  },
  env: {
    es6: true,
    browser: true,
    node: true,
  },
  plugins: ["svelte3"],
  overrides: [
    {
      files: ["**/*.svelte"],
      processor: "svelte3/svelte3",

      settings: {
        "svelte3/ignore-styles": (attrs) => attrs.lang === "scss",
      },
    },
  ],
  ignorePatterns: ["__sapper__", "node_modules/"],
  rules: {},
  settings: {},
};

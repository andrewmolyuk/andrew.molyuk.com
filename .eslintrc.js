const OFF = 0,
  WARN = 1,
  ERROR = 2;

module.exports = exports = {
  extends: ["eslint:recommended", "plugin:import/recommended"],
  parserOptions: {
    ecmaVersion: 2019,
    sourceType: "module"
  },
  env: {
    es6: true,
    browser: true,
    node: true
  },
  plugins: ["import", "svelte3"],
  overrides: [
    {
      files: ["**/*.svelte"],
      processor: "svelte3/svelte3",
      settings: {
        "svelte3/ignore-styles": () => true
      }
    }
  ],
  ignorePatterns: ["__sapper__", "node_modules/"],
  rules: {},
  settings: {}
};

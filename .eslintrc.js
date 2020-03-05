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
  plugins: ["import"],
  ignorePatterns: ["__sapper__", "node_modules/"],
  rules: {},
  settings: {}
};

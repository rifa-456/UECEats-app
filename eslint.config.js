const { defineConfig } = require('eslint/config');
const expoConfig = require("eslint-config-expo/flat");

module.exports = defineConfig([
  expoConfig,
  {
    ignores: ["dist/*"],
    rules: {
      "indent": ["error", 2],
      "camelcase": ["error", { properties: "always" }],
      "semi": ["error", "always"]
    }
  }
]);

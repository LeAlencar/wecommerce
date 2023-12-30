module.exports = {
  extends: ["@wecommerce/eslint-config/next.js", "plugin:relay/recommended"],
  plugins: ["relay"],
  rules: {
    "eslint-comments/require-description": "off",
    "tsdoc/syntax": "off",
    "@typescript-eslint/ban-tslint-comment": "off",
    "@typescript-eslint/no-unsafe-member-access": "off",
    "@typescript-eslint/no-unused-vars": "off",
    "@typescript-eslint/no-unsafe-return": "off",
    "@typescript-eslint/no-unsafe-assignment": "off",
    "@typescript-eslint/no-explicit-any": "off",
    "@typescript-eslint/no-non-null-assertion": "off",
    "@typescript-eslint/ban-ts-comment": "off",
    "@typescript-eslint/prefer-ts-expect-error": "off",
    "no-console": "off",
    "relay/generated-flow-types": "off",
  },
};

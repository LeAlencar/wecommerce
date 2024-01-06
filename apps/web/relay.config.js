module.exports = {
  src: ".",
  schema: "./src/relay/schema.graphql",
  exclude: ["**/node_modules/**", "**/__mocks__/**", "**/__generated__/**"],
  language: "typescript",
  artifactDirectory: "./__generated__",
};

module.exports = {
  presets: [
    ["@babel/preset-env", { targets: { node: "current" } }],
    "@babel/preset-typescript",
  ],
  plugins: [
    [
      "babel-plugin-root-import",
      {
        rootPathSuffix: "../Common",
        rootPathPrefix: "@openbook/common",
      },
    ],
  ],
};

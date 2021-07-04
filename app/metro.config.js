/* eslint-disable @typescript-eslint/no-var-requires */
const { getDefaultConfig } = require("metro-config");
const path = require("path");
const fs = require("fs");
const packageJson = require("./package.json");

const buildExtraNodeModules = () => {
  const extraNodeModules = {};
  for (const packageName in packageJson.dependencies) {
    const pkgPath = path.resolve(__dirname, "node_modules", packageName);
    if (fs.existsSync(pkgPath)) {
      extraNodeModules[packageName] = pkgPath;
    }
  }
  return extraNodeModules;
};

module.exports = (async () => {
  const {
    resolver: { sourceExts, assetExts },
  } = await getDefaultConfig();
  return {
    watchFolders: [path.resolve(__dirname, "..")],
    transformer: {
      experimentalImportSupport: true,
      babelTransformerPath: require.resolve("react-native-svg-transformer"),
    },
    resolver: {
      assetExts: assetExts.filter((ext) => ext !== "svg"),
      sourceExts: [...sourceExts, "svg"],
      extraNodeModules: {
        ...buildExtraNodeModules(),
      },
    },
  };
})();

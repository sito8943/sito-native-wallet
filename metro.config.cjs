// Learn more: https://docs.expo.dev/guides/customizing-metro/
// Uses the .cjs extension because package.json sets "type": "module", so a
// plain metro.config.js would be parsed as ESM and break on require().
const { getDefaultConfig } = require("expo/metro-config")

const config = getDefaultConfig(__dirname)

// Keep colocated test files out of the bundle. expo-router builds its routes
// from a require.context over `src/app`, which would otherwise pull in any
// `*.test`/`*.spec` file there — dragging in @testing-library/react-native,
// whose logger imports Node's "console" and breaks the native build.
const testFilePattern = /\.(test|spec)\.[jt]sx?$/
const existingBlockList = config.resolver.blockList
config.resolver.blockList = Array.isArray(existingBlockList)
  ? [...existingBlockList, testFilePattern]
  : existingBlockList != null
    ? [existingBlockList, testFilePattern]
    : [testFilePattern]

module.exports = config

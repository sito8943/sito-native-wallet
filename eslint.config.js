// eslint.config.js
import config from "@christopherjbaker/eslint-config/react-strict"
import { defineConfig, globalIgnores } from "eslint/config"

// eslint-disable-next-line @typescript-eslint/no-unsafe-argument
export default defineConfig(globalIgnores(["dist/", "web-build/"]), config, {
  settings: {
    "import/resolver": {
      typescript: {
        project: "./tsconfig.json",
      },
      node: {
        extensions: [".js", ".jsx", ".ts", ".tsx"],
      },
    },
  },
})

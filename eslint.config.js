// eslint.config.js
import config from "@christopherjbaker/eslint-config/react-strict"
import { defineConfig, globalIgnores } from "eslint/config"

export default defineConfig(globalIgnores(["dist/", "web-build/"]), config, {
  // Root config files aren't part of tsconfig's include, so the typed-lint
  // project service can't resolve them. Let them fall back to the default
  // project instead of erroring.
  languageOptions: {
    parserOptions: {
      projectService: {
        allowDefaultProject: ["eslint.config.js"],
      },
    },
  },
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

// knip.config.ts
import { type KnipConfiguration } from "knip"

const config: KnipConfiguration = {
  $schema: "https://unpkg.com/knip@6/schema.json",
  ignoreFiles: ["dist/**", "web-build/**"],
  ignoreDependencies: ["expo-updates", "expo-system-ui"],
}

export default config

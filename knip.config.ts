// knip.config.ts
import { type KnipConfiguration } from "knip"

const config: KnipConfiguration = {
  $schema: "https://unpkg.com/knip@6/schema.json",
  ignoreDependencies: ["expo-updates", "expo-system-ui"],
  ignoreBinaries: ["eas-cli"],
  // Each modlet's index.ts is its public API surface (ARCHITECTURE_RULES rule
  // 10 / black-box modlets). Treating barrels as entries stops knip flagging
  // re-exports that are only consumed inside the feature, while implementation
  // files (non-index) are still checked for genuinely dead exports.
  entry: ["src/shared/**/index.ts", "src/features/**/index.ts"],
}

export default config

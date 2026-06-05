import { type Currency } from "./types"

// Runtime guard for a Currency, shared by every client that persists or embeds
// one (currencies store, account snapshots). Lives in the model modlet so it
// pulls in no client/hook code — safe to import across modlets.
export const isCurrency = (value: unknown): value is Currency => {
  if (typeof value !== "object" || value === null) {
    return false
  }

  const candidate = value as Record<string, unknown>

  return (
    typeof candidate.id === "number" &&
    typeof candidate.name === "string" &&
    typeof candidate.symbol === "string"
  )
}

import { type SubscriptionProvider } from "../../SubscriptionProvider"

const isSubscriptionProvider = (
  value: unknown,
): value is SubscriptionProvider => {
  if (typeof value !== "object" || value === null) {
    return false
  }

  const candidate = value as Record<string, unknown>

  return typeof candidate.id === "number" && typeof candidate.name === "string"
}

export const parseStoredSubscriptionProviders = (
  value: unknown,
): SubscriptionProvider[] => {
  if (!Array.isArray(value)) {
    return []
  }

  return value.filter(isSubscriptionProvider)
}

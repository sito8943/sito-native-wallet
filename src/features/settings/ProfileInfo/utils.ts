import { type ProfileInfo } from "./types"

export const getDefaultProfileInfo = (): ProfileInfo => ({
  name: "",
  description: "",
})

export const parseProfileInfo = (value: unknown): ProfileInfo => {
  const fallback = getDefaultProfileInfo()

  if (typeof value !== "object" || value === null) {
    return fallback
  }

  const candidate = value as { name?: unknown; description?: unknown }

  return {
    name: typeof candidate.name === "string" ? candidate.name : fallback.name,
    description:
      typeof candidate.description === "string"
        ? candidate.description
        : fallback.description,
  }
}

// Up to two uppercase initials from the name, for the avatar placeholder.
export const profileInitials = (name: string): string => {
  const words = name.trim().split(/\s+/).filter(Boolean)

  if (words.length === 0) {
    return ""
  }

  return words
    .slice(0, 2)
    .map((word) => word[0]?.toUpperCase() ?? "")
    .join("")
}

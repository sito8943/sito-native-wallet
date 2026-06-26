import { LANGUAGE, type Language } from "#shared/i18n"

import { type ProfileInfo } from "./types"

// Map a backend IETF BCP 47 tag ("en", "es", "es-ES") to an app language.
// Tag-tolerant on purpose — i18n's parseLanguage demands an exact "es" and so
// maps regional tags like "es-ES" to EN, which is wrong for backend values.
export const parseLanguageTag = (tag: string): Language =>
  tag.toLowerCase().startsWith("es") ? LANGUAGE.ES : LANGUAGE.EN

export const getDefaultProfileInfo = (): ProfileInfo => ({
  name: "",
  description: "",
  photo: null,
})

export const parseProfileInfo = (value: unknown): ProfileInfo => {
  const fallback = getDefaultProfileInfo()

  if (typeof value !== "object" || value === null) {
    return fallback
  }

  const candidate = value as {
    name?: unknown
    description?: unknown
    photo?: unknown
  }

  return {
    name: typeof candidate.name === "string" ? candidate.name : fallback.name,
    description:
      typeof candidate.description === "string"
        ? candidate.description
        : fallback.description,
    photo: typeof candidate.photo === "string" ? candidate.photo : null,
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

import { type Language } from "#shared/i18n"

// Local-first user identity. The web wallet's ProfileDto carries name,
// description, photo and language; language already lives in ProfilePreferences,
// so this keeps the editable text identity plus the avatar photo.
export type ProfileInfo = {
  name: string
  description: string
  // Avatar image. Local-first: a picked local `file://` URI offline, or the
  // backend's (signed) photo URL once uploaded/pulled. null → show initials.
  photo: string | null
}

// What the orchestrator injects into profileSync. `language` lives in the i18n
// context (not the profile store), so the adapter receives it + its setter
// rather than reaching into a hook.
export type ProfileSyncDeps = {
  language: Language
  setLanguage: (language: Language) => void
}

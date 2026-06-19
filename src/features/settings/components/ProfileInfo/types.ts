import { type Language } from "#shared/i18n"

// Local-first user identity. The web wallet's ProfileDto carries name,
// description, photo and language; photo needs a native image picker (avoided
// here) and language already lives in ProfilePreferences, so this keeps just
// the editable text identity.
export type ProfileInfo = {
  name: string
  description: string
}

// What the orchestrator injects into profileSync. `language` lives in the i18n
// context (not the profile store), so the adapter receives it + its setter
// rather than reaching into a hook.
export type ProfileSyncDeps = {
  language: Language
  setLanguage: (language: Language) => void
}

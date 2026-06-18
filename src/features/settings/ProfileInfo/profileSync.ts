import { type SingletonSync } from "#features/sync"

import {
  fetchProfile,
  updateProfile,
  type ProfileUpdate,
} from "./profileClient"
import { profileStore } from "./profileStore"
import { type ProfileSyncDeps } from "./types"
import { parseLanguageTag } from "./utils"

// Profile id from the last pull — PATCH /profiles/{id} needs it. Module-level so
// it survives the orchestrator re-creating the adapter (e.g. on a language
// change) between pull and push.
let remoteId: number | null = null

// Forget the pulled profile state. Called on sign-out/sign-in alongside the
// entity stores' reset so a new user doesn't push under the previous account.
export const resetProfileSync = (): void => {
  remoteId = null
  profileStore.clear()
}

// Singleton sync adapter for the user profile. The synced record straddles two
// sources: the name (profileStore) and the language (i18n context, passed in by
// the orchestrator). AsyncStorage stays the source of truth — pull refreshes the
// local copy once per sign-in, push PATCHes name/language edits back.
export const profileSync = ({
  language,
  setLanguage,
}: ProfileSyncDeps): SingletonSync<ProfileUpdate> => ({
  label: "profile",
  pull: async () => {
    const remote = await fetchProfile()

    if (typeof remote.id === "number") {
      remoteId = remote.id
    }

    const localName = profileStore.getSnapshot().data.name
    const remoteName =
      typeof remote.name === "string" && remote.name !== ""
        ? remote.name
        : localName
    if (remoteName !== localName) {
      profileStore.setData((current) => ({ ...current, name: remoteName }))
    }

    if (typeof remote.language === "string" && remote.language !== "") {
      setLanguage(parseLanguageTag(remote.language))
    }
  },
  remoteId: () => remoteId,
  fields: () => ({
    name: profileStore.getSnapshot().data.name.trim(),
    language,
  }),
  toPayload: () => {
    // The backend rejects a blank name (it's required); skip until it's real.
    const name = profileStore.getSnapshot().data.name.trim()
    return name === "" ? null : { name, language }
  },
  update: updateProfile,
})

import { useEffect, useRef, type Dispatch, type SetStateAction } from "react"

import { USE_MOCK_AUTH, useSession } from "#features/auth"
import { LANGUAGE, type Language } from "#shared/i18n"

import { fetchProfile, updateProfile } from "./profileClient"
import { type ProfileInfo } from "./types"

// Wait this long after the last name/language edit before pushing, so typing a
// name doesn't fire a request per keystroke.
const PUSH_DEBOUNCE_MS = 800

// Map a backend IETF BCP 47 tag ("en", "es", "es-ES") to an app language.
const toLanguage = (tag: string): Language =>
  tag.toLowerCase().startsWith("es") ? LANGUAGE.ES : LANGUAGE.EN

type UseProfileSyncArgs = {
  name: string
  setProfile: Dispatch<SetStateAction<ProfileInfo>>
  language: Language
  setLanguage: Dispatch<SetStateAction<Language>>
}

// Two-way profile sync against the real backend (no-op as a guest or with the
// mock client). AsyncStorage stays the source of truth — we pull once per
// sign-in to refresh the local copy, then push name/language edits back with a
// debounce. Failures are swallowed so the local copy survives offline and the
// next edit retries.
export default function useProfileSync({
  name,
  setProfile,
  language,
  setLanguage,
}: UseProfileSyncArgs): void {
  const { isAuthenticated } = useSession()

  // Profile id from the last pull — the address PATCH /profiles/{id} needs.
  const profileIdRef = useRef<number | null>(null)
  // True once the initial pull lands, so we don't push the values we just
  // pulled back at the server.
  const hydratedRef = useRef(false)
  // Last values known to match the server, to skip redundant pushes.
  const lastSyncedRef = useRef<{ name: string; language: string } | null>(null)

  // Pull: refresh the local copy once per authenticated session.
  useEffect(() => {
    if (USE_MOCK_AUTH || !isAuthenticated) {
      return
    }

    let active = true

    void (async () => {
      try {
        const remote = await fetchProfile()
        if (!active) {
          return
        }

        if (typeof remote.id === "number") {
          profileIdRef.current = remote.id
        }

        const remoteName =
          typeof remote.name === "string" && remote.name !== ""
            ? remote.name
            : name
        if (remoteName !== name) {
          setProfile((current) => ({ ...current, name: remoteName }))
        }

        const remoteLanguage =
          typeof remote.language === "string" && remote.language !== ""
            ? toLanguage(remote.language)
            : language
        if (remoteLanguage !== language) {
          setLanguage(remoteLanguage)
        }

        lastSyncedRef.current = { name: remoteName, language: remoteLanguage }
        hydratedRef.current = true
      } catch {
        // Offline or unauthorized: keep the local profile untouched.
      }
    })()

    return () => {
      active = false
    }
    // Pull keys off the auth state only — name/language are intentionally
    // excluded so a local edit never re-triggers a pull.
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [isAuthenticated])

  // Push: debounce name/language edits back to the backend.
  useEffect(() => {
    if (USE_MOCK_AUTH || !isAuthenticated || !hydratedRef.current) {
      return
    }

    const id = profileIdRef.current
    if (id === null) {
      return
    }

    const trimmedName = name.trim()
    // The backend rejects a blank name (it's required); wait for a real value.
    if (trimmedName === "") {
      return
    }

    const last = lastSyncedRef.current
    if (
      last !== null &&
      last.name === trimmedName &&
      last.language === language
    ) {
      return
    }

    const handle = setTimeout(() => {
      void (async () => {
        try {
          await updateProfile(id, { name: trimmedName, language })
          lastSyncedRef.current = { name: trimmedName, language }
        } catch {
          // Leave lastSynced untouched so the next edit retries.
        }
      })()
    }, PUSH_DEBOUNCE_MS)

    return () => {
      clearTimeout(handle)
    }
  }, [name, language, isAuthenticated])
}

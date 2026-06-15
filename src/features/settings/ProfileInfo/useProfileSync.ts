import { useEffect, type Dispatch, type SetStateAction } from "react"

import { USE_MOCK_AUTH, useSession } from "#features/auth"

import { fetchProfile } from "./profileClient"
import { type ProfileInfo } from "./types"

// Load-only profile sync: when signed in against the real backend, pull the
// user's profile and refresh the local copy. AsyncStorage stays the source of
// truth (we just write into it); nothing is sent back. No-op as a guest or with
// the mock auth client, and failures are swallowed so the local copy survives
// offline.
export default function useProfileSync(
  setProfile: Dispatch<SetStateAction<ProfileInfo>>,
): void {
  const { isAuthenticated } = useSession()

  useEffect(() => {
    if (USE_MOCK_AUTH || !isAuthenticated) {
      return
    }

    let active = true

    void (async () => {
      try {
        const remote = await fetchProfile()
        const username = remote.user?.username

        if (active && typeof username === "string" && username !== "") {
          setProfile((current) => ({ ...current, name: username }))
        }
      } catch {
        // Offline or unauthorized: keep the local profile untouched.
      }
    })()

    return () => {
      active = false
    }
  }, [isAuthenticated, setProfile])
}

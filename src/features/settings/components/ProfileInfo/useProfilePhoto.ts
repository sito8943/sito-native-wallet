import * as ImagePicker from "expo-image-picker"
import { useState } from "react"

import { USE_MOCK_AUTH, useSession } from "#features/auth"

import { profileStore } from "./profileStore"
import { RemoteProfileClient } from "./RemoteProfileClient"

type UseProfilePhotoState = {
  // Pick from the library and set it as the avatar (local-first: stored locally
  // right away, then uploaded to the backend when signed in).
  pick: () => Promise<void>
  // Clear the avatar (and delete it server-side when signed in).
  remove: () => Promise<void>
  // True while a backend upload/delete is in flight.
  busy: boolean
}

// Avatar photo actions. Local-first: the picked image is shown/persisted
// immediately (works offline / as a guest); when authenticated against the real
// backend it's also uploaded (PATCH /profiles/{id}/photo) and the returned URL
// replaces the local URI. Backend failures keep the local image (non-blocking).
export default function useProfilePhoto(): UseProfilePhotoState {
  const { isAuthenticated } = useSession()
  const [busy, setBusy] = useState(false)

  const syncs = isAuthenticated && !USE_MOCK_AUTH

  const pick = async (): Promise<void> => {
    const permission = await ImagePicker.requestMediaLibraryPermissionsAsync()
    if (!permission.granted) {
      return
    }

    const result = await ImagePicker.launchImageLibraryAsync({
      mediaTypes: ["images"],
      allowsEditing: true,
      aspect: [1, 1],
      quality: 0.7,
    })
    const asset = result.canceled ? undefined : result.assets[0]
    if (asset === undefined) {
      return
    }

    // Optimistic: show the picked image immediately.
    profileStore.setData((current) => ({ ...current, photo: asset.uri }))

    if (!syncs) {
      return
    }

    setBusy(true)
    try {
      const profile = await RemoteProfileClient.fetch()
      if (typeof profile.id === "number") {
        const url = await RemoteProfileClient.uploadPhoto(profile.id, {
          uri: asset.uri,
          name: asset.fileName ?? "profile-photo.jpg",
          type: asset.mimeType ?? "image/jpeg",
        })
        profileStore.setData((current) => ({ ...current, photo: url }))
      }
    } catch {
      // Keep the local image; the user can retry. Offline stays usable.
    } finally {
      setBusy(false)
    }
  }

  const remove = async (): Promise<void> => {
    profileStore.setData((current) => ({ ...current, photo: null }))

    if (!syncs) {
      return
    }

    setBusy(true)
    try {
      const profile = await RemoteProfileClient.fetch()
      if (typeof profile.id === "number") {
        await RemoteProfileClient.deletePhoto(profile.id)
      }
    } catch {
      // Best-effort; the local avatar is already cleared.
    } finally {
      setBusy(false)
    }
  }

  return { pick, remove, busy }
}

import { API_BASE_URL, authRequest } from "#features/auth"

import { PROFILES_ENDPOINT } from "./constants"
import { type ProfileUpdate, type RemoteProfile } from "./types"

// The backend's photo value may be an absolute (signed) URL or a relative path;
// local picks are `file://` URIs. Make it an absolute URL the <Image> can load.
const resolvePhotoUrl = (photo: string | null | undefined): string | null => {
  if (photo === null || photo === undefined || photo === "") {
    return null
  }
  if (/^https?:\/\//.test(photo) || photo.startsWith("file:")) {
    return photo
  }
  return `${API_BASE_URL}${photo.startsWith("/") ? "" : "/"}${photo}`
}

// Remote (REST) profile backend — the counterpart to the local profile record
// (profileStore). The local store is what the app reads; this talks to the
// server (pulled on sign-in, edits/photo pushed back). Object client to mirror
// the entity features' Remote*Client.
export const RemoteProfileClient = {
  fetch: (): Promise<RemoteProfile> =>
    authRequest<RemoteProfile>(`${PROFILES_ENDPOINT}/me`, { auth: true }),

  update: (id: number, body: ProfileUpdate): Promise<number> =>
    authRequest<number>(`${PROFILES_ENDPOINT}/${id}`, {
      method: "PATCH",
      body,
      auth: true,
    }),

  // Multipart photo upload. The backend returns the new photo URL as a bare
  // string (not JSON), so `expectText`. The file part is React Native's
  // `{ uri, name, type }` shape, which FormData accepts on RN.
  uploadPhoto: (
    id: number,
    file: { uri: string; name: string; type: string },
  ): Promise<string> => {
    const form = new FormData()
    form.append("file", file as unknown as Blob)
    return authRequest<string>(`${PROFILES_ENDPOINT}/${id}/photo`, {
      method: "PATCH",
      body: form,
      auth: true,
      expectText: true,
    }).then((url) => resolvePhotoUrl(url) ?? url)
  },

  deletePhoto: (id: number): Promise<void> =>
    authRequest(`${PROFILES_ENDPOINT}/${id}/photo`, {
      method: "DELETE",
      auth: true,
    }),

  resolvePhotoUrl,
}

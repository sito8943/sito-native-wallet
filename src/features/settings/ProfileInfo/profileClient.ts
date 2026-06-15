import { authRequest } from "#features/auth"

// Subset of the backend's ProfileDTO (GET /profiles/me) we read. The editable
// display name is the top-level `name` (what PATCH writes via profile.setName),
// NOT user.username. `id` is the profile id needed to address the PATCH.
// `description` has no backend field, so it stays a purely local value.
export type RemoteProfile = {
  id?: number
  name?: string
  language?: string
  user?: { id?: number; username?: string }
}

// PATCH /profiles/{id} body. `name` is REQUIRED by the backend (it rejects a
// null/blank name with 400), so callers always send it. `language` is an IETF
// BCP 47 tag ("en", "es") applied only when present.
export type ProfileUpdate = {
  name: string
  language?: string
}

const PROFILES_ENDPOINT = "/profiles"

export const fetchProfile = (): Promise<RemoteProfile> =>
  authRequest<RemoteProfile>(`${PROFILES_ENDPOINT}/me`, { auth: true })

export const updateProfile = (
  id: number,
  body: ProfileUpdate,
): Promise<number> =>
  authRequest<number>(`${PROFILES_ENDPOINT}/${id}`, {
    method: "PATCH",
    body,
    auth: true,
  })

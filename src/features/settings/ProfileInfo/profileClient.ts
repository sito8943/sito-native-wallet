import { authRequest } from "#features/auth"

// Subset of the backend's ProfileDTO (GET /profiles/me) we currently read. The
// display name lives on the nested user; `description` has no backend field, so
// it stays a purely local value.
export type RemoteProfile = {
  user?: { id?: number; username?: string }
  language?: string
}

const PROFILE_ME_ENDPOINT = "/profiles/me"

export const fetchProfile = (): Promise<RemoteProfile> =>
  authRequest<RemoteProfile>(PROFILE_ME_ENDPOINT, { auth: true })

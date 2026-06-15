import { authRequest } from "#features/auth"

import { PROFILES_ENDPOINT } from "./constants"
import { type ProfileUpdate, type RemoteProfile } from "./types"

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

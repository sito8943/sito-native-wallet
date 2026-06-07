import { useStoredState, type UseStoredStateResult } from "#shared/data/storage"

import {
  PROFILE_INFO_ERROR_MESSAGE,
  PROFILE_INFO_STORAGE_KEY,
} from "./constants"
import { type ProfileInfo } from "./types"
import { getDefaultProfileInfo, parseProfileInfo } from "./utils"

export default function useProfileInfo(): UseStoredStateResult<ProfileInfo> {
  return useStoredState<ProfileInfo>({
    errorMessage: PROFILE_INFO_ERROR_MESSAGE,
    initialValue: getDefaultProfileInfo(),
    parseStoredValue: parseProfileInfo,
    storageKey: PROFILE_INFO_STORAGE_KEY,
  })
}

import { useStoredState, type UseStoredStateResult } from "#shared/data/storage"

import {
  PROFILE_PREFERENCES_ERROR_MESSAGE,
  PROFILE_PREFERENCES_STORAGE_KEY,
} from "./constants"
import { type ProfilePreferences } from "./types"
import { getDefaultProfilePreferences, parseProfilePreferences } from "./utils"

export default function useProfilePreferences(): UseStoredStateResult<ProfilePreferences> {
  return useStoredState<ProfilePreferences>({
    errorMessage: PROFILE_PREFERENCES_ERROR_MESSAGE,
    initialValue: getDefaultProfilePreferences(),
    parseStoredValue: parseProfilePreferences,
    storageKey: PROFILE_PREFERENCES_STORAGE_KEY,
  })
}

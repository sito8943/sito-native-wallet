// Deep path on purpose: the #shared/data barrel pulls in the Manager (+ every
// entity client and AsyncStorage), which must stay lazy at boot. The storage
// folder has no such dependency.
import { RecordStore } from "#shared/data/storage"

import {
  PROFILE_INFO_ERROR_MESSAGE,
  PROFILE_INFO_STORAGE_KEY,
} from "./constants"
import { type ProfileInfo } from "./types"
import { getDefaultProfileInfo, parseProfileInfo } from "./utils"

// Singleton profile record, shared across every consumer (the profile screen,
// the tab-bar avatar, the sync orchestrator) so an edit is reflected everywhere
// and the orchestrator can read/push it from outside the profile screen.
export const profileStore = new RecordStore<ProfileInfo>({
  errorMessage: PROFILE_INFO_ERROR_MESSAGE,
  initialValue: getDefaultProfileInfo(),
  parse: parseProfileInfo,
  storageKey: PROFILE_INFO_STORAGE_KEY,
})

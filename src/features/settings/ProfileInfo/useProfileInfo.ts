import {
  useRecordStore,
  type UseStoredStateResult,
} from "#shared/data/storage"

import { profileStore } from "./profileStore"
import { type ProfileInfo } from "./types"

// Subscribe to the shared profile record. Same shape as before (data, setData,
// isLoading, error), but backed by a singleton store so every consumer — the
// profile screen, the tab-bar avatar, the sync orchestrator — sees one value.
export default function useProfileInfo(): UseStoredStateResult<ProfileInfo> {
  const state = useRecordStore(profileStore)

  return { ...state, setData: profileStore.setData }
}

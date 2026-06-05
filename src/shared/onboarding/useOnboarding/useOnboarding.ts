import { useCallback } from "react"

import { useStoredState } from "#shared/data/storage"
import { useI18n } from "#shared/i18n"

import { ONBOARDING_STORAGE_KEY } from "../constants"
import { parseOnboardingCompleted } from "../utils"

import { type UseOnboardingResult } from "./types"

// AsyncStorage-backed gate for first-run onboarding. `completed` is the
// persisted flag (false until the user finishes or skips); `complete` marks it
// done so the redirect lets the app through on the next launch.
export default function useOnboarding(): UseOnboardingResult {
  const { t } = useI18n()

  const { data, isLoading, setData } = useStoredState<boolean>({
    errorMessage: t("onboarding.error.persist"),
    initialValue: false,
    parseStoredValue: parseOnboardingCompleted,
    storageKey: ONBOARDING_STORAGE_KEY,
  })

  const complete = useCallback(() => {
    setData(true)
  }, [setData])

  return { completed: data, isLoading, complete }
}

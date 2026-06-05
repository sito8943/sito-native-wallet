import { Redirect } from "expo-router"
import { type ReactElement } from "react"

import { useOnboarding } from "#shared/onboarding"

// Entry gate: first run sends the user through onboarding; once completed (or
// skipped) every later launch goes straight to the app. Render nothing while
// the persisted flag hydrates so we never flash the wrong destination.
export default function Index(): ReactElement | null {
  const { completed, isLoading } = useOnboarding()

  if (isLoading) {
    return null
  }

  return <Redirect href={completed ? "/home" : "/onboarding"} />
}

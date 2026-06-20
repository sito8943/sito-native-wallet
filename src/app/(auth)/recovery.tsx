import { useRouter } from "expo-router"
import { useState, type ReactElement } from "react"

import Page from "#design/templates/Page"
import { authClient, getAuthErrorKey, RecoveryView } from "#features/auth"
import { useI18n } from "#shared/i18n"

// "Forgot password" request: ask the backend to email a reset link. The link
// itself completes on the web wallet (token-based), so here we only fire the
// request and confirm it was sent.
export default function Recovery(): ReactElement {
  const router = useRouter()
  const { t } = useI18n()
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState<string | undefined>(undefined)
  const [sent, setSent] = useState(false)

  const onSubmit = async (email: string): Promise<void> => {
    setLoading(true)
    setError(undefined)
    try {
      await authClient.forgotPassword(email)
      setSent(true)
    } catch (caught) {
      setError(t(getAuthErrorKey(caught)))
    } finally {
      setLoading(false)
    }
  }

  return (
    <Page scroll>
      <RecoveryView
        loading={loading}
        error={error}
        sent={sent}
        onSubmit={(email) => {
          void onSubmit(email)
        }}
        onBackToSignIn={() => router.replace("/sign-in")}
      />
    </Page>
  )
}

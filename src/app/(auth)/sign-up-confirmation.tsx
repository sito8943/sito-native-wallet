import { useLocalSearchParams, useRouter } from "expo-router"
import { useState, type ReactElement } from "react"

import Page from "#design/templates/Page"
import { SignUpConfirmationView } from "#features/auth"

// "Check your email" screen. The confirmation link itself is handled by the web
// wallet (deep links come later); here we only let the user resend it.
export default function SignUpConfirmation(): ReactElement {
  const router = useRouter()
  const { email } = useLocalSearchParams<{ email: string }>()
  const [resending, setResending] = useState(false)

  const onResend = async (): Promise<void> => {
    setResending(true)
    try {
      // Stub: the real version calls the backend's resend-confirm-email endpoint.
      await new Promise((resolve) => {
        setTimeout(resolve, 400)
      })
    } finally {
      setResending(false)
    }
  }

  return (
    <Page scroll centered>
      <SignUpConfirmationView
        email={email ?? ""}
        resending={resending}
        onResend={() => {
          void onResend()
        }}
        onBackToSignIn={() => router.replace("/sign-in")}
      />
    </Page>
  )
}

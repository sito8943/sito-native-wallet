import { useLocalSearchParams, useRouter } from "expo-router"
import { useState, type ReactElement } from "react"

import Page from "#design/templates/Page"
import { authClient, SignUpConfirmationView } from "#features/auth"

// "Check your email" screen. The confirmation link itself completes on the web
// wallet (token-based); here we let the user resend the confirmation email.
export default function SignUpConfirmation(): ReactElement {
  const router = useRouter()
  const { email } = useLocalSearchParams<{ email: string }>()
  const [resending, setResending] = useState(false)

  const onResend = async (): Promise<void> => {
    if (email === undefined || email === "") {
      return
    }
    setResending(true)
    try {
      await authClient.resendConfirmation(email)
    } catch {
      // Best-effort: resend failures are non-blocking; the user can retry.
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

import { useRouter } from "expo-router"
import { useState, type ReactElement } from "react"
import { Linking } from "react-native"

import { useDialog } from "#design/interactions"
import { ConfirmationDialog } from "#design/patterns/Dialog"
import Page from "#design/templates/Page"
import {
  authClient,
  SignInView,
  useSession,
  WEB_RECOVERY_URL,
  type SignInFormValues,
} from "#features/auth"
import { useI18n } from "#shared/i18n"

// Signing in replaces the device's local (guest) data with the account's
// server data, so we gate the actual login behind a confirmation dialog.
export default function SignIn(): ReactElement {
  const router = useRouter()
  const { t } = useI18n()
  const { logUser } = useSession()
  const dialog = useDialog()
  const [pending, setPending] = useState<SignInFormValues | null>(null)
  const [loading, setLoading] = useState(false)

  const requestLogin = (values: SignInFormValues): void => {
    setPending(values)
    dialog.handleOpen()
  }

  const confirmLogin = async (): Promise<void> => {
    if (pending === null) {
      return
    }

    setLoading(true)
    try {
      // Real local-data wipe/replace happens in a later phase; for now logging
      // in just persists the session (tokens + account snapshot).
      const session = await authClient.login(pending)
      await logUser(session)
      dialog.handleClose()
      router.replace("/home")
    } finally {
      setLoading(false)
    }
  }

  return (
    <Page scroll>
      <SignInView
        loading={loading}
        onSubmit={requestLogin}
        onSignUp={() => router.push("/sign-up")}
        onRecovery={() => {
          void Linking.openURL(WEB_RECOVERY_URL)
        }}
      />

      <ConfirmationDialog
        open={dialog.open}
        title={t("auth.signIn.warnTitle")}
        message={t("auth.signIn.warnMessage")}
        confirmLabel={t("auth.signIn.warnConfirm")}
        isLoading={loading}
        handleSubmit={() => {
          void confirmLogin()
        }}
        handleClose={dialog.handleClose}
      />
    </Page>
  )
}

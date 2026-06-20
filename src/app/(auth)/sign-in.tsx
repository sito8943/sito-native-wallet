import { useRouter } from "expo-router"
import { useState, type ReactElement } from "react"

import { useDialog } from "#design/interactions"
import { ConfirmationDialog } from "#design/patterns/Dialog"
import Page from "#design/templates/Page"
import {
  authClient,
  getAuthErrorKey,
  SignInView,
  useSession,
  type SignInFormValues,
} from "#features/auth"
import { resetProfileSync } from "#features/settings/components/ProfileInfo"
import { resetEntitySync } from "#features/sync"
import { useManager } from "#shared/data"
import { useI18n } from "#shared/i18n"

// Signing in replaces the device's local (guest) data with the account's
// server data, so we gate the actual login behind a confirmation dialog.
export default function SignIn(): ReactElement {
  const router = useRouter()
  const { t } = useI18n()
  const { logUser } = useSession()
  const manager = useManager()
  const dialog = useDialog()
  const [pending, setPending] = useState<SignInFormValues | null>(null)
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState<string | undefined>(undefined)

  const requestLogin = (values: SignInFormValues): void => {
    setError(undefined)
    setPending(values)
    dialog.handleOpen()
  }

  const confirmLogin = async (): Promise<void> => {
    if (pending === null) {
      return
    }

    setLoading(true)
    try {
      const session = await authClient.login(pending)
      // Forget the sync session FIRST: re-signing in while still authenticated
      // would otherwise leave a full push baseline against the stores we're about
      // to clear, and the next flush would DELETE the account's rows on the
      // backend. Resetting gates the push off until the fresh pull rebuilds it.
      resetEntitySync()
      // The dialog warned the user: drop the device's local (guest) data so the
      // account's server data replaces it. Each entity's sync re-pulls its rows
      // from the backend once signed in. (Sign-up does NOT wipe — it uploads the
      // local data instead.)
      manager.clearLocalData()
      resetProfileSync()
      await logUser(session)
      dialog.handleClose()
      router.replace("/home")
    } catch (caught) {
      // Backend down/unreachable or bad credentials — surface it, don't enter.
      dialog.handleClose()
      setError(t(getAuthErrorKey(caught)))
    } finally {
      setLoading(false)
    }
  }

  return (
    <Page scroll>
      <SignInView
        loading={loading}
        error={error}
        onSubmit={requestLogin}
        onSignUp={() => router.push("/sign-up")}
        onRecovery={() => router.push("/recovery")}
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

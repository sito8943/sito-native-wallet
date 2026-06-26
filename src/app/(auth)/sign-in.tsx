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
  const { logUser, expiredEmail } = useSession()
  const manager = useManager()
  const dialog = useDialog()
  const [pending, setPending] = useState<SignInFormValues | null>(null)
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState<string | undefined>(undefined)

  // True when the entered email matches the account whose session just expired:
  // it's the same user reclaiming their session, so the local data is already
  // theirs — no wipe, no confirmation.
  const isSameExpiredUser = (values: SignInFormValues): boolean =>
    expiredEmail !== null &&
    values.email.trim().toLowerCase() === expiredEmail.toLowerCase()

  // Run the actual sign-in. `wipe` drops the device's local (guest) data so the
  // account's server data replaces it — skipped for a same-user re-login, whose
  // local data is already the account's.
  const performLogin = async (
    values: SignInFormValues,
    wipe: boolean,
  ): Promise<void> => {
    setLoading(true)
    try {
      const session = await authClient.login(values)
      if (wipe) {
        // Forget the sync session FIRST: re-signing in while still authenticated
        // would otherwise leave a full push baseline against the stores we're
        // about to clear, and the next flush would DELETE the account's rows on
        // the backend. Resetting gates the push off until the fresh pull
        // rebuilds it.
        resetEntitySync()
        // Each entity's sync re-pulls its rows from the backend once signed in.
        // (Sign-up does NOT wipe — it uploads the local data instead.)
        manager.clearLocalData()
        resetProfileSync()
      }
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

  const requestLogin = (values: SignInFormValues): void => {
    setError(undefined)
    // Same user reclaiming an expired session: keep their data, skip the dialog.
    if (isSameExpiredUser(values)) {
      void performLogin(values, false)
      return
    }
    setPending(values)
    dialog.handleOpen()
  }

  const confirmLogin = async (): Promise<void> => {
    if (pending === null) {
      return
    }
    await performLogin(pending, true)
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

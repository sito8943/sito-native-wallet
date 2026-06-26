import { useRouter } from "expo-router"
import { useState, type ReactElement } from "react"

import Page from "#design/templates/Page"
import {
  authClient,
  ChangePasswordView,
  getAuthErrorKey,
  useSession,
} from "#features/auth"
import { useI18n } from "#shared/i18n"

// Change the signed-in user's password. Guarded by the session: a guest is
// redirected to sign-in (the entry only shows when authenticated anyway).
export default function ChangePassword(): ReactElement {
  const router = useRouter()
  const { t } = useI18n()
  const { isAuthenticated } = useSession()
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState<string | undefined>(undefined)
  const [done, setDone] = useState(false)

  const onSubmit = async (values: {
    currentPassword: string
    newPassword: string
  }): Promise<void> => {
    setLoading(true)
    setError(undefined)
    try {
      await authClient.changePassword(values)
      setDone(true)
    } catch (caught) {
      setError(t(getAuthErrorKey(caught)))
    } finally {
      setLoading(false)
    }
  }

  if (!isAuthenticated) {
    router.replace("/sign-in")
    return <></>
  }

  return (
    <Page scroll>
      <ChangePasswordView
        loading={loading}
        error={error}
        done={done}
        onSubmit={(values) => {
          void onSubmit(values)
        }}
        onDone={() => router.back()}
      />
    </Page>
  )
}

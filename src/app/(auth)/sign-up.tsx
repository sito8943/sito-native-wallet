import { useRouter } from "expo-router"
import { useState, type ReactElement } from "react"

import Page from "#design/templates/Page"
import {
  authClient,
  getAuthErrorKey,
  SignUpView,
  useLocalDataUpload,
  type SignUpFormValues,
} from "#features/auth"
import { useI18n } from "#shared/i18n"

// Registering keeps the guest's local data: after the account is created we
// upload it so the backend persists it under the new user (no data loss, unlike
// sign-in). Then we route to the "check your email" confirmation screen.
export default function SignUp(): ReactElement {
  const router = useRouter()
  const { t } = useI18n()
  const { upload, uploading } = useLocalDataUpload()
  const [submitting, setSubmitting] = useState(false)
  const [error, setError] = useState<string | undefined>(undefined)

  const onSubmit = async (values: SignUpFormValues): Promise<void> => {
    setSubmitting(true)
    setError(undefined)
    try {
      await authClient.register({
        email: values.email,
        password: values.password,
        rPassword: values.confirmPassword,
      })
      await upload()
      router.replace({
        pathname: "/sign-up-confirmation",
        params: { email: values.email },
      })
    } catch (caught) {
      setError(t(getAuthErrorKey(caught)))
    } finally {
      setSubmitting(false)
    }
  }

  return (
    <Page scroll>
      <SignUpView
        loading={submitting || uploading}
        error={error}
        onSubmit={(values) => {
          void onSubmit(values)
        }}
        onSignIn={() => router.replace("/sign-in")}
      />
    </Page>
  )
}

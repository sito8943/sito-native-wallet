import { useRouter } from "expo-router"
import { useState, type ReactElement } from "react"

import Page from "#design/templates/Page"
import {
  authClient,
  SignUpView,
  useLocalDataUpload,
  type SignUpFormValues,
} from "#features/auth"

// Registering keeps the guest's local data: after the account is created we
// upload it so the backend persists it under the new user (no data loss, unlike
// sign-in). Then we route to the "check your email" confirmation screen.
export default function SignUp(): ReactElement {
  const router = useRouter()
  const { upload, uploading } = useLocalDataUpload()
  const [submitting, setSubmitting] = useState(false)

  const onSubmit = async (values: SignUpFormValues): Promise<void> => {
    setSubmitting(true)
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
    } finally {
      setSubmitting(false)
    }
  }

  return (
    <Page scroll>
      <SignUpView
        loading={submitting || uploading}
        onSubmit={(values) => {
          void onSubmit(values)
        }}
        onSignIn={() => router.replace("/sign-in")}
      />
    </Page>
  )
}

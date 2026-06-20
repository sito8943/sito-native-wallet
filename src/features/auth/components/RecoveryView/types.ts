export type RecoveryFormValues = {
  email: string
}

export type RecoveryViewProps = {
  onSubmit: (email: string) => void
  onBackToSignIn: () => void
  loading?: boolean
  // Submit-level error (e.g. server unreachable).
  error?: string
  // Once the request succeeded, swap the form for a "check your email" message.
  sent?: boolean
}

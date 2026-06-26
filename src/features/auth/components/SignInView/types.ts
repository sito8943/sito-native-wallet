export type SignInFormValues = {
  email: string
  password: string
}

export type SignInViewProps = {
  onSubmit: (values: SignInFormValues) => void
  onSignUp: () => void
  onRecovery: () => void
  loading?: boolean
  // Submit-level error (e.g. wrong credentials, server unreachable).
  error?: string
}

export type SignUpFormValues = {
  email: string
  password: string
  confirmPassword: string
}

export type SignUpViewProps = {
  // Called only once the passwords match; receives the validated values.
  onSubmit: (values: SignUpFormValues) => void
  onSignIn: () => void
  loading?: boolean
}

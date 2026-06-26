export type ChangePasswordFormValues = {
  currentPassword: string
  newPassword: string
  confirmPassword: string
}

export type ChangePasswordViewProps = {
  onSubmit: (values: { currentPassword: string; newPassword: string }) => void
  loading?: boolean
  // Submit-level error (e.g. wrong current password, server unreachable).
  error?: string
  // Once the change succeeded, swap the form for a confirmation message.
  done?: boolean
  onDone?: () => void
}

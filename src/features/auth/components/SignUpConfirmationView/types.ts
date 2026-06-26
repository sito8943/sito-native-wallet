export type SignUpConfirmationViewProps = {
  email: string
  onResend: () => void
  onBackToSignIn: () => void
  resending?: boolean
}

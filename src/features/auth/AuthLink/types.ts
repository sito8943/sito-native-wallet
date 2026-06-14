export type AuthLinkProps = {
  // Optional leading muted text, e.g. "Don't have an account?".
  question?: string
  // The tappable, emphasized label, e.g. "Create one".
  action: string
  onPress: () => void
}

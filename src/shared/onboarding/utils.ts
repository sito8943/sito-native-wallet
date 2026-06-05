// Only a literal `true` counts as completed; anything else (legacy/corrupt
// values) falls back to "not onboarded" so the wizard runs again.
export const parseOnboardingCompleted = (value: unknown): boolean =>
  value === true

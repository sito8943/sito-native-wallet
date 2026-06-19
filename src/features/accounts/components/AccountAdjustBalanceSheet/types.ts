import { type Account } from "../../Account"

export type AccountAdjustBalanceSheetProps = {
  // The account being adjusted; null when the sheet is closed.
  account: Account | null
  open: boolean
  onClose: () => void
  // Receives the chosen target balance and an optional note. The screen turns
  // this into an adjustment transaction (kept out of here to avoid an
  // accounts → transactions import cycle).
  onSubmit: (newBalance: number, description?: string) => void
}

// Form-local string fields for the adjust form.
export type AdjustFormValues = {
  newBalance: string
  description: string
}

// Reviewed values held while the sheet shows the confirm step.
export type AdjustPending = {
  target: number
  description?: string
}

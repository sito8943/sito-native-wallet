import { type ReactNode } from "react"

export type FormProps = {
  // The form fields.
  children: ReactNode
  submitLabel: string
  onSubmit: () => void
  submitLoading?: boolean
  submitDisabled?: boolean
  // Extra full-width actions rendered below the submit button (e.g. a
  // DeleteButton). Keeps the Form agnostic of what those actions do.
  extraActions?: ReactNode
}

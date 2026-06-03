import { type AddTransactionDto } from "../dtos"

export type TransactionFormProps = {
  defaultValues?: AddTransactionDto
  submitLabel: string
  onSubmit: (values: AddTransactionDto) => void
  onDelete?: () => void
  // Auto (system-generated) transactions, e.g. balance adjustments. Still
  // editable so a mistake can be corrected, but their system category is shown
  // and locked — it can't be reassigned.
  auto?: boolean
}

// Form state keeps amount as text for friendlier numeric input; it is parsed to
// a number on submit.
export type TransactionFormValues = {
  description: string
  amount: string
  date: string
  accountId: string
  categoryIds: string[]
}

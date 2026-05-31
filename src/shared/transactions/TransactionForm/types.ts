import { type AddTransactionDto } from "../dtos"

export type TransactionFormProps = {
  defaultValues?: AddTransactionDto
  submitLabel: string
  onSubmit: (values: AddTransactionDto) => void
  onDelete?: () => void
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

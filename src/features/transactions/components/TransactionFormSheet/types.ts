import { type AddTransactionDto } from "../dtos"

export type TransactionFormSheetProps = {
  open: boolean
  onClose: () => void
  // Pre-selects the owning account on the fresh form.
  defaultAccountId?: number
  onSubmit: (values: AddTransactionDto) => void
}

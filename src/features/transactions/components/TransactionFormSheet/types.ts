import { type AddTransactionDto } from "../../dtos"

export type TransactionFormSheetProps = {
  open: boolean
  onClose: () => void
  // Pre-selects the owning account on the fresh form.
  defaultAccountId?: number
  // Pre-selects categories on the fresh form (e.g. a filtered dashboard card
  // whose single category seeds the new transaction).
  defaultCategoryIds?: number[]
  onSubmit: (values: AddTransactionDto) => void
}

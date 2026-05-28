import { TransactionType } from "#shared/categories"

export const TRANSACTION_TYPE_LABELS: Record<TransactionType, string> = {
  [TransactionType.In]: "income",
  [TransactionType.Out]: "expense",
}

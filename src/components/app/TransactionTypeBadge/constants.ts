import { TransactionType } from "../../../lib/models/Wallet"

export const TRANSACTION_TYPE_COLORS: Record<TransactionType, string> = {
  [TransactionType.In]: "#2e7d32",
  [TransactionType.Out]: "#c62828",
}

export const TRANSACTION_TYPE_LABELS: Record<TransactionType, string> = {
  [TransactionType.In]: "income",
  [TransactionType.Out]: "expense",
}

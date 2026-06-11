import { type Account } from "../Account"

export type AccountTransferSheetProps = {
  account: Account | null
  open: boolean
  onClose: () => void
  onSubmit: (
    toAccountId: number,
    amount: number,
    date: string,
    description?: string,
  ) => void
}

export type TransferFormValues = {
  toAccountId: number
  amount: string
  date: string
  description: string
}

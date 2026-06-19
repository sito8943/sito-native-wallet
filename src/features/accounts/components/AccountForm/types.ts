import { type AccountType } from "../../Account"
import { type AddAccountDto } from "../../dtos"

// Form-local shape: text inputs are strings and the currency is held by id
// until submit maps it back to the full Currency on the DTO.
export type AccountFormValues = {
  name: string
  description: string
  bankName: string
  balance: string
  type: AccountType
  currencyId: number
}

export type AccountFormProps = {
  defaultValues?: AddAccountDto
  submitLabel: string
  onSubmit: (values: AddAccountDto) => void
  onDelete?: () => void
  // Hides the balance field (editing): the balance is the ledger total and only
  // moves through transactions / the Adjust balance action, never a direct edit.
  // On create it stays editable as the opening balance.
  lockBalance?: boolean
}

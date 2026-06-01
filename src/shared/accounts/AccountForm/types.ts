import { type AccountType } from "../Account"
import { type AddAccountDto } from "../dtos"

// Form-local shape: text inputs are strings and the currency is held by id
// until submit maps it back to the full Currency on the DTO.
export type AccountFormValues = {
  name: string
  balance: string
  type: AccountType
  currencyId: string
}

export type AccountFormProps = {
  defaultValues?: AddAccountDto
  submitLabel: string
  onSubmit: (values: AddAccountDto) => void
  onDelete?: () => void
}

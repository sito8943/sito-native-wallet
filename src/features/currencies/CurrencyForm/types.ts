import { type AddCurrencyDto } from "../dtos"

export type CurrencyFormProps = {
  defaultValues?: AddCurrencyDto
  submitLabel: string
  onSubmit: (values: AddCurrencyDto) => void
  onDelete?: () => void
}

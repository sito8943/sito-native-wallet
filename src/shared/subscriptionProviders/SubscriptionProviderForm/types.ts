import { type AddSubscriptionProviderDto } from "../dtos"

export type SubscriptionProviderFormProps = {
  defaultValues?: AddSubscriptionProviderDto
  submitLabel: string
  onSubmit: (values: AddSubscriptionProviderDto) => void
  onDelete?: () => void
}

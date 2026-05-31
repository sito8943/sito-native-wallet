import { type AddSubscriptionProviderDto } from "../dtos"

export const EMPTY_SUBSCRIPTION_PROVIDER: AddSubscriptionProviderDto = {
  name: "",
  description: "",
  website: "",
}

export const SUBSCRIPTION_PROVIDER_FIELD_LIMITS = {
  NAME: 40,
  WEBSITE: 120,
  DESCRIPTION: 120,
} as const

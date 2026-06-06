import { getDeviceLanguage, translate } from "#shared/i18n"

export const SUBSCRIPTION_PROVIDERS_STORAGE_KEY = "subscriptionProviders"
export const SUBSCRIPTION_PROVIDERS_ERROR_MESSAGE = translate(
  getDeviceLanguage(),
  "subscriptionProviders.error.load",
)

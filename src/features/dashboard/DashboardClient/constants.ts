import { getDeviceLanguage, translate } from "#shared-i18n/utils"

export const DASHBOARD_STORAGE_KEY = "dashboard"
export const DASHBOARD_ERROR_MESSAGE = translate(
  getDeviceLanguage(),
  "dashboard.error.load",
)

import { getDeviceLanguage, translate } from "../../../shared/i18n/utils"

import { type CommonAccountDto } from "../dtos"

// Relation snapshot used when an account was deleted but transactions remain.
export const getMissingAccount = (): CommonAccountDto => ({
  id: 0,
  name: translate(getDeviceLanguage(), "transactions.unknownAccount"),
  currencySymbol: "",
})

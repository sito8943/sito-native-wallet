import { type TranslationKey } from "#shared-i18n/types"

type Translate = (
  key: TranslationKey,
  params?: Record<string, number | string>,
) => string

export function renewalLabel(days: number, t: Translate): string {
  if (days < 0) {
    return t("subscriptions.renewal.overdue", { days: Math.abs(days) })
  }
  if (days === 0) return t("subscriptions.renewal.today")
  if (days === 1) return t("subscriptions.renewal.tomorrow")
  return t("subscriptions.renewal.inDays", { days })
}

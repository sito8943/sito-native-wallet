import { getDeviceLanguage, translate } from "../../shared/i18n/utils"
import { createNotification } from "#shared/notifications"

import {
  daysUntilRenewal,
  SUBSCRIPTION_STATUS,
  type Subscription,
} from "./Subscription"
import { renewalLabel } from "./SubscriptionCard/utils"

export async function notifyUpcomingRenewal(
  subscriptions: Subscription[],
): Promise<void> {
  const language = getDeviceLanguage()
  const t = (
    key: Parameters<typeof translate>[1],
    params?: Record<string, number | string>,
  ): string => translate(language, key, params)

  const candidates = subscriptions
    .filter((sub) => sub.status === SUBSCRIPTION_STATUS.ACTIVE)
    .map((sub) => ({ sub, days: daysUntilRenewal(sub) }))
    .filter(({ sub, days }) => days >= 0 && days <= sub.notificationDaysBefore)
    .sort((a, b) => a.days - b.days)

  const next = candidates[0]
  if (!next) return

  const { sub, days } = next
  await createNotification({
    title: `${sub.name} ${renewalLabel(days, t)}`,
    short: sub.provider.name,
    body: t("subscriptions.notifications.body", {
      amount: sub.amount.toFixed(2),
      symbol: sub.currency.symbol,
      account: sub.account.name,
    }),
  })
}

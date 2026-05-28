import { createNotification } from "#shared/notifications"

import {
  daysUntilRenewal,
  SUBSCRIPTION_STATUS,
  type Subscription,
} from "./Subscription"

function renewalCopy(days: number): string {
  if (days <= 0) return "renews today"
  if (days === 1) return "renews tomorrow"
  return `renews in ${days} days`
}

export async function notifyUpcomingRenewal(
  subscriptions: Subscription[],
): Promise<void> {
  const candidates = subscriptions
    .filter((sub) => sub.status === SUBSCRIPTION_STATUS.ACTIVE)
    .map((sub) => ({ sub, days: daysUntilRenewal(sub) }))
    .filter(({ sub, days }) => days >= 0 && days <= sub.notificationDaysBefore)
    .sort((a, b) => a.days - b.days)

  const next = candidates[0]
  if (!next) return

  const { sub, days } = next
  await createNotification({
    title: `${sub.name} ${renewalCopy(days)}`,
    short: sub.provider.name,
    body: `${sub.amount.toFixed(2)} ${sub.currency.symbol} on ${sub.account.name}`,
  })
}

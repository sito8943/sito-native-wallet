import { MS_PER_DAY } from "./constants"
import { type Subscription } from "./types"

export function daysUntilRenewal(subscription: Subscription): number {
  const renewal = new Date(subscription.nextRenewalAt).getTime()
  const now = Date.now()
  return Math.ceil((renewal - now) / MS_PER_DAY)
}

export function sortByNextRenewal(
  subscriptions: Subscription[],
): Subscription[] {
  return [...subscriptions].sort(
    (a, b) =>
      new Date(a.nextRenewalAt).getTime() - new Date(b.nextRenewalAt).getTime(),
  )
}

export function formatBillingCycle(subscription: Subscription): string {
  const { billingFrequency, billingUnit } = subscription
  const unit = billingUnit.toLowerCase()
  if (billingFrequency === 1) return `every ${unit}`
  return `every ${billingFrequency} ${unit}s`
}

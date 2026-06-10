import { type TranslationKey } from "#shared-i18n/types"

import { MS_PER_DAY, SUBSCRIPTION_BILLING_UNIT } from "./constants"
import { type Subscription } from "./types"

type Translate = (
  key: TranslationKey,
  params?: Record<string, number | string>,
) => string

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

export function formatBillingCycle(
  subscription: Subscription,
  t: Translate,
): string {
  const { billingFrequency, billingUnit } = subscription
  const units = {
    [SUBSCRIPTION_BILLING_UNIT.DAY]: {
      singular: "subscriptions.billing.unit.day",
      plural: "subscriptions.billing.unit.days",
    },
    [SUBSCRIPTION_BILLING_UNIT.MONTH]: {
      singular: "subscriptions.billing.unit.month",
      plural: "subscriptions.billing.unit.months",
    },
    [SUBSCRIPTION_BILLING_UNIT.YEAR]: {
      singular: "subscriptions.billing.unit.year",
      plural: "subscriptions.billing.unit.years",
    },
  } as const
  const unitKeys = units[billingUnit]

  if (billingFrequency === 1) {
    return t("subscriptions.billing.everyOne", {
      unit: t(unitKeys.singular),
    })
  }

  return t("subscriptions.billing.everyMany", {
    count: billingFrequency,
    unit: t(unitKeys.plural),
  })
}

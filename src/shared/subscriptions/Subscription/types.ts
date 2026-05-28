import { type Account } from "#shared/accounts"
import { type Currency } from "#shared/currencies"
import { type SubscriptionProvider } from "#shared/subscriptionProviders"

import {
  type SUBSCRIPTION_BILLING_UNIT,
  type SUBSCRIPTION_STATUS,
} from "./constants"

export type SubscriptionStatus =
  (typeof SUBSCRIPTION_STATUS)[keyof typeof SUBSCRIPTION_STATUS]

export type SubscriptionBillingUnit =
  (typeof SUBSCRIPTION_BILLING_UNIT)[keyof typeof SUBSCRIPTION_BILLING_UNIT]

export type Subscription = {
  id: string
  name: string
  amount: number
  currency: Currency
  provider: SubscriptionProvider
  account: Account
  billingFrequency: number
  billingUnit: SubscriptionBillingUnit
  nextRenewalAt: string
  status: SubscriptionStatus
  notificationDaysBefore: number
}

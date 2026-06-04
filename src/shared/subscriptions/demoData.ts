import { INITIAL_ACCOUNTS } from "#shared/accounts"
import { INITIAL_CURRENCIES } from "#shared/currencies"
import { INITIAL_SUBSCRIPTION_PROVIDERS } from "#shared/subscriptionProviders"

import {
  SUBSCRIPTION_BILLING_UNIT,
  SUBSCRIPTION_STATUS,
  type Subscription,
} from "./Subscription"

const [euro, dollar] = INITIAL_CURRENCIES
const [main, travel] = INITIAL_ACCOUNTS
const [netflix, spotify, icloud, github] = INITIAL_SUBSCRIPTION_PROVIDERS

const daysFromNow = (n: number): string => {
  const date = new Date()
  date.setDate(date.getDate() + n)
  date.setHours(12, 0, 0, 0)
  return date.toISOString()
}

export const INITIAL_SUBSCRIPTIONS: Subscription[] = [
  {
    id: 1,
    name: "Netflix Premium",
    amount: 17.99,
    currency: euro,
    provider: netflix,
    account: main,
    billingFrequency: 1,
    billingUnit: SUBSCRIPTION_BILLING_UNIT.MONTH,
    nextRenewalAt: daysFromNow(2),
    status: SUBSCRIPTION_STATUS.ACTIVE,
    notificationDaysBefore: 3,
  },
  {
    id: 2,
    name: "Spotify Family",
    amount: 16.99,
    currency: euro,
    provider: spotify,
    account: main,
    billingFrequency: 1,
    billingUnit: SUBSCRIPTION_BILLING_UNIT.MONTH,
    nextRenewalAt: daysFromNow(18),
    status: SUBSCRIPTION_STATUS.ACTIVE,
    notificationDaysBefore: 3,
  },
  {
    id: 3,
    name: "iCloud+ 200GB",
    amount: 2.99,
    currency: euro,
    provider: icloud,
    account: travel,
    billingFrequency: 1,
    billingUnit: SUBSCRIPTION_BILLING_UNIT.MONTH,
    nextRenewalAt: daysFromNow(1),
    status: SUBSCRIPTION_STATUS.ACTIVE,
    notificationDaysBefore: 5,
  },
  {
    id: 4,
    name: "GitHub Pro",
    amount: 4,
    currency: dollar,
    provider: github,
    account: main,
    billingFrequency: 1,
    billingUnit: SUBSCRIPTION_BILLING_UNIT.YEAR,
    nextRenewalAt: daysFromNow(45),
    status: SUBSCRIPTION_STATUS.ACTIVE,
    notificationDaysBefore: 7,
  },
]

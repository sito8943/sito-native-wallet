import { APP_ICONS } from "#design/elements/Icon"

import { type OnboardingStepDefinition } from "../OnboardingStep"

// Mirrors the web wallet onboarding order: a welcome, one slide per core
// entity, then the closing call to action.
export const ONBOARDING_STEPS: OnboardingStepDefinition[] = [
  {
    key: "welcome",
    icon: APP_ICONS.home,
    titleKey: "onboarding.welcome.title",
    bodyKey: "onboarding.welcome.body",
  },
  {
    key: "currencies",
    icon: APP_ICONS.currencies,
    titleKey: "onboarding.currencies.title",
    bodyKey: "onboarding.currencies.body",
  },
  {
    key: "accounts",
    icon: APP_ICONS.accounts,
    titleKey: "onboarding.accounts.title",
    bodyKey: "onboarding.accounts.body",
  },
  {
    key: "transactions",
    icon: APP_ICONS.transactions,
    titleKey: "onboarding.transactions.title",
    bodyKey: "onboarding.transactions.body",
  },
  {
    key: "subscriptions",
    icon: APP_ICONS.subscriptions,
    titleKey: "onboarding.subscriptions.title",
    bodyKey: "onboarding.subscriptions.body",
  },
  {
    key: "getStarted",
    icon: APP_ICONS.check,
    titleKey: "onboarding.getStarted.title",
    bodyKey: "onboarding.getStarted.body",
  },
]

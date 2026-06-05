import { type AppIcon } from "#design/elements/Icon"
import { type TranslationKey } from "#shared/i18n"

export type OnboardingStepDefinition = {
  key: string
  icon: AppIcon
  titleKey: TranslationKey
  bodyKey: TranslationKey
}

export type OnboardingStepProps = {
  step: OnboardingStepDefinition
  // Sized by the carousel so each page fills the pager exactly and centers its
  // content — a horizontal FlatList won't stretch items on its own.
  width: number
  height: number
}

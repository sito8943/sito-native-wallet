import { render } from "@testing-library/react-native"

import { APP_ICONS } from "#design/elements/Icon"
import { LANGUAGE, translate } from "#shared/i18n"

import OnboardingStep from "./OnboardingStep"
import { type OnboardingStepDefinition } from "./types"

const step: OnboardingStepDefinition = {
  key: "welcome",
  icon: APP_ICONS.home,
  titleKey: "onboarding.welcome.title",
  bodyKey: "onboarding.welcome.body",
}

describe("Onboarding > OnboardingStep", () => {
  it("renders the translated title and body", () => {
    const { getByText } = render(
      <OnboardingStep step={step} width={320} height={480} />,
    )

    expect(
      getByText(translate(LANGUAGE.EN, "onboarding.welcome.title")),
    ).toBeTruthy()
    expect(
      getByText(translate(LANGUAGE.EN, "onboarding.welcome.body")),
    ).toBeTruthy()
  })
})

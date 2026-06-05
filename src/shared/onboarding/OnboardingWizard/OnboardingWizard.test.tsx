import AsyncStorage from "@react-native-async-storage/async-storage"
import { render, userEvent, waitFor } from "@testing-library/react-native"

import { ONBOARDING_STORAGE_KEY } from "../constants"

import { ONBOARDING_STEPS } from "./constants"

import OnboardingWizard from "./OnboardingWizard"

// The global expo-router mock only exposes Link; the wizard needs a router with
// replace(), so override the module for this file.
const mockReplace = jest.fn()
jest.mock("expo-router", () => ({
  useRouter: () => ({ replace: mockReplace }),
}))

const lastIndex = ONBOARDING_STEPS.length - 1

describe("Onboarding > OnboardingWizard", () => {
  beforeEach(async () => {
    await AsyncStorage.clear()
    jest.clearAllMocks()
  })

  it("renders the first step and progress", async () => {
    const { findByText, getByText } = render(<OnboardingWizard />)

    expect(await findByText("Welcome to SitoWallet")).toBeTruthy()
    expect(getByText(`1 of ${ONBOARDING_STEPS.length}`)).toBeTruthy()
  })

  it("advances and goes back through steps", async () => {
    const { findByText, getByText } = render(<OnboardingWizard />)

    await userEvent.press(await findByText("Next"))
    expect(getByText(`2 of ${ONBOARDING_STEPS.length}`)).toBeTruthy()

    await userEvent.press(getByText("Back"))
    expect(getByText(`1 of ${ONBOARDING_STEPS.length}`)).toBeTruthy()
  })

  it("skips from the first step and completes onboarding", async () => {
    const { findByText } = render(<OnboardingWizard />)

    await userEvent.press(await findByText("Skip"))

    expect(mockReplace).toHaveBeenCalledWith("/home")
    await waitFor(() => {
      expect(AsyncStorage.setItem).toHaveBeenCalledWith(
        ONBOARDING_STORAGE_KEY,
        JSON.stringify(true),
      )
    })
  })

  it("finishes from the last step with Get started", async () => {
    const { findByText, getByText } = render(<OnboardingWizard />)

    // Walk to the final step via the Next button.
    await findByText("Next")
    for (let step = 0; step < lastIndex; step += 1) {
      await userEvent.press(getByText("Next"))
    }

    await userEvent.press(getByText("Get started"))

    expect(mockReplace).toHaveBeenCalledWith("/home")
  })
})

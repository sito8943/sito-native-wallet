import AsyncStorage from "@react-native-async-storage/async-storage"
import { render, userEvent, waitFor } from "@testing-library/react-native"
import { type ReactElement } from "react"
import { Pressable, Text } from "react-native"

import { ONBOARDING_STORAGE_KEY } from "../constants"

import useOnboarding from "./useOnboarding"

// Reads the hook through a small consumer and exposes complete() as a pressable,
// so tests drive it as a real interaction (mirrors ThemeProvider's probe).
function OnboardingProbe(): ReactElement {
  const { completed, complete } = useOnboarding()

  return (
    <Pressable onPress={complete}>
      <Text>{completed ? "completed" : "pending"}</Text>
    </Pressable>
  )
}

describe("Onboarding > useOnboarding", () => {
  beforeEach(async () => {
    // Wipe the persisted flag so one test's completion can't leak into the next.
    await AsyncStorage.clear()
    jest.clearAllMocks()
  })

  it("starts pending on first run", async () => {
    const { findByText } = render(<OnboardingProbe />)

    expect(await findByText("pending")).toBeTruthy()
  })

  it("persists completion when complete() runs", async () => {
    const { findByText } = render(<OnboardingProbe />)

    await userEvent.press(await findByText("pending"))

    expect(await findByText("completed")).toBeTruthy()
    await waitFor(() => {
      expect(AsyncStorage.setItem).toHaveBeenCalledWith(
        ONBOARDING_STORAGE_KEY,
        JSON.stringify(true),
      )
    })
  })

  it("reads a previously stored completed flag", async () => {
    await AsyncStorage.setItem(ONBOARDING_STORAGE_KEY, JSON.stringify(true))

    const { findByText } = render(<OnboardingProbe />)

    expect(await findByText("completed")).toBeTruthy()
  })
})

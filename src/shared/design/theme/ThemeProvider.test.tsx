import AsyncStorage from "@react-native-async-storage/async-storage"
import { fireEvent, render, waitFor } from "@testing-library/react-native"
import { type ReactElement, useContext } from "react"
import { Pressable, Text } from "react-native"

import { THEME_PREFERENCE, THEME_PREFERENCE_STORAGE_KEY } from "./constants"
import { ThemeContext } from "./ThemeContext"
import { ThemeProvider } from "./ThemeProvider"

// Reads the live context and exposes the toggle as a pressable, so the test can
// drive a real user interaction through the provider.
function PreferenceProbe(): ReactElement {
  const { preference, togglePreference } = useContext(ThemeContext)

  return (
    <Pressable onPress={togglePreference}>
      <Text>{preference}</Text>
    </Pressable>
  )
}

describe("Design > Theme > ThemeProvider", () => {
  beforeEach(async () => {
    // Wipe the persisted store so a prior test's saved preference can't bleed
    // into this one's initial load.
    await AsyncStorage.clear()
    jest.clearAllMocks()
  })

  // Smoke: provider mounts and renders whatever it wraps.
  it("renders its children", () => {
    const { getByText } = render(
      <ThemeProvider>
        <Text>Wrapped content</Text>
      </ThemeProvider>,
    )

    expect(getByText("Wrapped content")).toBeTruthy()
  })

  // Integration: ThemeProvider + useStoredState + ThemeContext + a consumer +
  // the AsyncStorage layer. Toggling cycles the preference (system -> light)
  // and persists it through storage.
  it("cycles and persists the preference when toggled", async () => {
    const { getByText, findByText } = render(
      <ThemeProvider>
        <PreferenceProbe />
      </ThemeProvider>,
    )

    expect(getByText(THEME_PREFERENCE.SYSTEM)).toBeTruthy()

    fireEvent.press(getByText(THEME_PREFERENCE.SYSTEM))

    expect(await findByText(THEME_PREFERENCE.LIGHT)).toBeTruthy()
    await waitFor(() => {
      expect(AsyncStorage.setItem).toHaveBeenCalledWith(
        THEME_PREFERENCE_STORAGE_KEY,
        JSON.stringify(THEME_PREFERENCE.LIGHT),
      )
    })
  })
})

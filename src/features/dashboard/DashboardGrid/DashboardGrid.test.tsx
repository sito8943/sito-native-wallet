import AsyncStorage from "@react-native-async-storage/async-storage"
import { render } from "@testing-library/react-native"

import DashboardGrid from "./DashboardGrid"

// Renders the seeded dashboard (one card per type). The seeded current-balance
// card points at the demo "Main account" (balance 2487.48 €), so its headline
// proves the grid mounted the right card by type.
describe("Dashboard > DashboardGrid", () => {
  beforeEach(async () => {
    await AsyncStorage.clear()
    jest.clearAllMocks()
  })

  it("renders the seeded cards", async () => {
    const { findByText } = render(<DashboardGrid />)

    expect(await findByText("2487.48 €")).toBeTruthy()
  })
})

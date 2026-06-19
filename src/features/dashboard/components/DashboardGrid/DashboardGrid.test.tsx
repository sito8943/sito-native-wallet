import AsyncStorage from "@react-native-async-storage/async-storage"
import { render } from "@testing-library/react-native"

import { DASHBOARD_CARD_TYPE } from "../cards/DashboardCard"

import DashboardGrid from "./DashboardGrid"

// The global expo-router mock only exposes Link; the grid's empty state needs a
// router with push(), so override the module for this file.
jest.mock("expo-router", () => ({
  useRouter: () => ({ push: jest.fn() }),
}))

// There is no demo seed anymore, so the test seeds the dashboard store with one
// current-balance card and the accounts store with the account it points at
// (balance 2487.48 €). Its headline proves the grid mounted the right card.
const MAIN_ACCOUNT = {
  id: 1,
  name: "Main account",
  bankName: "Caixa",
  balance: 2487.48,
  type: "digital",
  currency: { id: 1, name: "Euro", symbol: "€", description: "Euro" },
}

const SEEDED_CARDS = [
  {
    id: 1,
    type: DASHBOARD_CARD_TYPE.CURRENT_BALANCE,
    title: null,
    config: JSON.stringify({
      account: { id: 1, name: "Main account", currencySymbol: "€" },
    }),
    position: 0,
  },
]

describe("Dashboard > DashboardGrid", () => {
  beforeEach(async () => {
    await AsyncStorage.clear()
    // "dashboard" / "accounts" are the respective client storage keys.
    await AsyncStorage.setItem("dashboard", JSON.stringify(SEEDED_CARDS))
    await AsyncStorage.setItem("accounts", JSON.stringify([MAIN_ACCOUNT]))
    jest.clearAllMocks()
  })

  it("renders the seeded cards", async () => {
    const { findByText } = render(<DashboardGrid />)

    expect(await findByText("2487.48 €")).toBeTruthy()
  })
})

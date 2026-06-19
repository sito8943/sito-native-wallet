import AsyncStorage from "@react-native-async-storage/async-storage"
import { render } from "@testing-library/react-native"

import { DASHBOARD_CARD_TYPE, type DashboardCard } from "../DashboardCard"

import BalanceHistoryCard from "./BalanceHistoryCard"

const noop = (): void => undefined

// Seed one account (id 1, balance 1000 €) and no transactions, so every point
// in the series equals the current balance — a flat line whose latest value is
// the known headline. (The SVG chart needs a measured width, which never fires
// in the test renderer, so it draws nothing; the headline still renders.)
const MAIN_ACCOUNT = {
  id: 1,
  name: "Main account",
  bankName: "Caixa",
  balance: 1000,
  type: "digital",
  currency: { id: 1, name: "Euro", symbol: "€", description: "Euro" },
}

const card: DashboardCard = {
  id: 1,
  type: DASHBOARD_CARD_TYPE.BALANCE_HISTORY,
  title: null,
  config: JSON.stringify({
    account: { id: 1, name: "Main account", currencySymbol: "€" },
    preset: "last7Days",
  }),
  position: 0,
}

describe("Dashboard > BalanceHistoryCard", () => {
  beforeEach(async () => {
    await AsyncStorage.clear()
    await AsyncStorage.setItem("accounts", JSON.stringify([MAIN_ACCOUNT]))
    jest.clearAllMocks()
  })

  it("renders the latest balance of the selected account", async () => {
    const { findByText } = render(
      <BalanceHistoryCard card={card} onDelete={noop} />,
    )

    expect(await findByText("1000.00 €")).toBeTruthy()
  })

  it("prompts to pick an account when none is selected", async () => {
    const { findAllByText } = render(
      <BalanceHistoryCard
        card={{ ...card, config: JSON.stringify({ account: null }) }}
        onDelete={noop}
      />,
    )

    // Shown both as the card headline and the in-sheet selector's "all" label.
    expect((await findAllByText("Select an account")).length).toBeGreaterThan(0)
  })
})

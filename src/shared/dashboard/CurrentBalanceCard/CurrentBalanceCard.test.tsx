import AsyncStorage from "@react-native-async-storage/async-storage"
import { render } from "@testing-library/react-native"

import { DASHBOARD_CARD_TYPE, type DashboardCard } from "../DashboardCard"

import CurrentBalanceCard from "./CurrentBalanceCard"

const noop = (): void => undefined

// Points at the seeded "Main account" (id 1, balance 2487.48 €) from the
// accounts demo data, so the card computes a known headline value.
const card: DashboardCard = {
  id: 1,
  type: DASHBOARD_CARD_TYPE.CURRENT_BALANCE,
  title: null,
  config: JSON.stringify({
    account: { id: 1, name: "Main account", currencySymbol: "€" },
  }),
  position: 0,
}

describe("Dashboard > CurrentBalanceCard", () => {
  beforeEach(async () => {
    await AsyncStorage.clear()
    jest.clearAllMocks()
  })

  it("renders the selected account's balance", async () => {
    const { findByText } = render(
      <CurrentBalanceCard card={card} onDelete={noop} />,
    )

    expect(await findByText("2487.48 €")).toBeTruthy()
  })
})

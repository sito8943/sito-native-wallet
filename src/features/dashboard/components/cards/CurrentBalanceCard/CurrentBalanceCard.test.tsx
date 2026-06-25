import AsyncStorage from "@react-native-async-storage/async-storage"
import { render } from "@testing-library/react-native"

import { DASHBOARD_CARD_TYPE, type DashboardCard } from "../DashboardCard"

import CurrentBalanceCard from "./CurrentBalanceCard"

// The global expo-router mock only exposes Link; this card calls useRouter()
// (add-transaction action), so override the module for this file.
jest.mock("expo-router", () => ({
  useRouter: () => ({ push: jest.fn() }),
}))

const noop = (): void => undefined

// There is no demo seed anymore, so the test seeds one account (id 1, balance
// 2487.48 €) into the accounts store. The card resolves the live balance by id,
// giving a known headline value.
const MAIN_ACCOUNT = {
  id: 1,
  name: "Main account",
  bankName: "Caixa",
  balance: 2487.48,
  type: "digital",
  currency: { id: 1, name: "Euro", symbol: "€", description: "Euro" },
}

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
    // "accounts" is the AccountClient storage key.
    await AsyncStorage.setItem("accounts", JSON.stringify([MAIN_ACCOUNT]))
    jest.clearAllMocks()
  })

  it("renders the selected account's balance", async () => {
    const { findByText } = render(
      <CurrentBalanceCard card={card} onDelete={noop} />,
    )

    expect(await findByText("2487.48 €")).toBeTruthy()
  })

  it("defaults to the only account when none is configured", async () => {
    const unconfigured: DashboardCard = {
      ...card,
      config: JSON.stringify({ account: null }),
    }

    const { findByText } = render(
      <CurrentBalanceCard card={unconfigured} onDelete={noop} />,
    )

    // With a single account it auto-selects it, so the balance shows instead of
    // the "no account" prompt.
    expect(await findByText("2487.48 €")).toBeTruthy()
  })
})

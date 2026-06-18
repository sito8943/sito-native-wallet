import AsyncStorage from "@react-native-async-storage/async-storage"
import { render } from "@testing-library/react-native"

import { LANGUAGE, translate } from "#shared/i18n"

import { DASHBOARD_CARD_TYPE, TYPE_RESUME_TIME } from "../DashboardCard"
import { type DashboardCard } from "../DashboardCard"

import TypeResumeCard from "./TypeResumeCard"

// The card mounts TransactionFormSheet (add-transaction action), which calls
// useRouter; the global expo-router mock only exposes Link, so override here.
jest.mock("expo-router", () => ({
  useRouter: () => ({ push: jest.fn() }),
}))

const noop = (): void => undefined

const makeCard = (config: object): DashboardCard => ({
  id: 1,
  type: DASHBOARD_CARD_TYPE.TYPE_RESUME,
  title: null,
  config: JSON.stringify({
    account: null,
    type: 0, // income
    time: TYPE_RESUME_TIME.CURRENT_MONTH,
    ...config,
  }),
  position: 0,
})

describe("Dashboard > TypeResumeCard", () => {
  beforeEach(async () => {
    await AsyncStorage.clear()
    jest.clearAllMocks()
  })

  it("renders its active filter chips when showFiltersAsBadge is on", async () => {
    const { findByText } = render(
      <TypeResumeCard
        card={makeCard({ showFiltersAsBadge: true })}
        onDelete={noop}
      />,
    )

    expect(
      await findByText(translate(LANGUAGE.EN, "dashboard.time.currentMonth")),
    ).toBeTruthy()
  })

  it("hides the chips by default (showFiltersAsBadge off)", () => {
    const { queryByText } = render(
      <TypeResumeCard card={makeCard({})} onDelete={noop} />,
    )

    expect(
      queryByText(translate(LANGUAGE.EN, "dashboard.time.currentMonth")),
    ).toBeNull()
  })

  it("exposes the add and recent-transactions actions", () => {
    const { getByLabelText } = render(
      <TypeResumeCard card={makeCard({})} onDelete={noop} />,
    )

    expect(
      getByLabelText(translate(LANGUAGE.EN, "transactions.add")),
    ).toBeTruthy()
    expect(
      getByLabelText(
        translate(LANGUAGE.EN, "dashboard.recentTransactions.action"),
      ),
    ).toBeTruthy()
    expect(
      getByLabelText(
        translate(LANGUAGE.EN, "dashboard.categoryBreakdown.action"),
      ),
    ).toBeTruthy()
  })

  it("renders a second total when showOppositeType is on", async () => {
    const { findAllByText } = render(
      <TypeResumeCard
        card={makeCard({ showOppositeType: true })}
        onDelete={noop}
      />,
    )

    // No transactions seeded → both the primary and opposite totals read 0.00.
    expect((await findAllByText("0.00")).length).toBe(2)
  })
})

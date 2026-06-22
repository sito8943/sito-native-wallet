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

  it("shows the filter count and hides chips in badge mode", async () => {
    const { findByText, queryByText } = render(
      <TypeResumeCard
        card={
          makeCard({
            account: { id: 1, name: "Account", currencySymbol: "€" },
            excludedCategoryIds: [10],
            showOppositeType: true,
            oppositeExcludedCategoryIds: [20],
            showFiltersAsBadge: true,
          })
        }
        onDelete={noop}
      />,
    )

    expect(await findByText("5")).toBeTruthy()
    expect(
      queryByText(translate(LANGUAGE.EN, "dashboard.time.currentMonth")),
    ).toBeNull()
  })

  it("shows filter chips by default (badge mode off)", async () => {
    const { findByText } = render(
      <TypeResumeCard card={makeCard({})} onDelete={noop} />,
    )

    expect(
      await findByText(translate(LANGUAGE.EN, "dashboard.time.currentMonth")),
    ).toBeTruthy()
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
